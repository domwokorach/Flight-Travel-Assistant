import type { DirectionsRoute } from '@/types/transport'
import type { DirectionsProvider } from './types'
import { fetchJson } from '@/lib/http'

interface OsrmResponse {
  routes?: { distance: number; duration: number; legs?: { summary?: string }[] }[]
}

function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function googleMapsUrl(from: { lat: number; lon: number }, to: { lat: number; lon: number }, mode: DirectionsRoute['mode']): string {
  const travelmode = mode === 'transit' ? 'transit' : mode === 'walking' ? 'walking' : mode === 'cycling' ? 'bicycling' : 'driving'
  return `https://www.google.com/maps/dir/?api=1&origin=${from.lat},${from.lon}&destination=${to.lat},${to.lon}&travelmode=${travelmode}`
}

/**
 * Keyless fallback: OSRM's public demo router (router.project-osrm.org) only serves the
 * "driving" profile, so driving routes come from a real routing engine while walking/cycling
 * fall back to a great-circle distance estimate at typical speeds. Both link out to Google
 * Maps for turn-by-turn "Get Directions", which needs no API key for a plain deep link.
 */
export class EstimateDirectionsProvider implements DirectionsProvider {
  async getDirections(
    from: { lat: number; lon: number },
    to: { lat: number; lon: number },
    mode: DirectionsRoute['mode']
  ): Promise<DirectionsRoute> {
    const mapUrl = googleMapsUrl(from, to, mode)

    if (mode === 'driving') {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=false`
        const data = await fetchJson<OsrmResponse>(url, { timeoutMs: 6000, revalidate: 300 })
        const route = data.routes?.[0]
        if (route) {
          return {
            mode,
            distanceMeters: Math.round(route.distance),
            durationMinutes: Math.round(route.duration / 60),
            summary: 'Fastest driving route',
            mapUrl,
          }
        }
      } catch {
        // fall through to estimate
      }
    }

    const distanceMeters = haversineMeters(from.lat, from.lon, to.lat, to.lon)
    const speedKph = mode === 'walking' ? 5 : mode === 'cycling' ? 16 : mode === 'transit' ? 30 : 45
    const durationMinutes = Math.round((distanceMeters / 1000 / speedKph) * 60)

    return {
      mode,
      distanceMeters: Math.round(distanceMeters),
      durationMinutes,
      summary: 'Estimated straight-line route',
      mapUrl,
    }
  }
}
