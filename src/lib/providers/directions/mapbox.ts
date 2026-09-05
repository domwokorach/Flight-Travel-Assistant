import type { DirectionsRoute } from '@/types/transport'
import type { DirectionsProvider } from './types'
import { EstimateDirectionsProvider } from './estimate'
import { fetchJson } from '@/lib/http'

interface MapboxDirectionsResponse {
  routes?: { distance: number; duration: number }[]
}

function googleMapsUrl(from: { lat: number; lon: number }, to: { lat: number; lon: number }, mode: DirectionsRoute['mode']): string {
  const travelmode = mode === 'transit' ? 'transit' : mode === 'walking' ? 'walking' : mode === 'cycling' ? 'bicycling' : 'driving'
  return `https://www.google.com/maps/dir/?api=1&origin=${from.lat},${from.lon}&destination=${to.lat},${to.lon}&travelmode=${travelmode}`
}

const MAPBOX_PROFILE: Partial<Record<DirectionsRoute['mode'], string>> = {
  driving: 'driving-traffic',
  walking: 'walking',
  cycling: 'cycling',
}

/**
 * Mapbox Directions API — real routed distance/duration for driving, walking and cycling
 * using the same public token already used for the airport map (NEXT_PUBLIC_MAPBOX_TOKEN).
 * Mapbox has no transit profile, so transit requests fall back to the keyless estimate.
 */
export class MapboxDirectionsProvider implements DirectionsProvider {
  private fallback = new EstimateDirectionsProvider()

  constructor(private token: string) {}

  async getDirections(
    from: { lat: number; lon: number },
    to: { lat: number; lon: number },
    mode: DirectionsRoute['mode']
  ): Promise<DirectionsRoute> {
    const profile = MAPBOX_PROFILE[mode]
    if (!profile) return this.fallback.getDirections(from, to, mode)

    const mapUrl = googleMapsUrl(from, to, mode)
    try {
      const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${from.lon},${from.lat};${to.lon},${to.lat}?overview=false&access_token=${this.token}`
      const data = await fetchJson<MapboxDirectionsResponse>(url, { timeoutMs: 6000, revalidate: 300 })
      const route = data.routes?.[0]
      if (route) {
        return {
          mode,
          distanceMeters: Math.round(route.distance),
          durationMinutes: Math.round(route.duration / 60),
          summary: mode === 'driving' ? 'Fastest driving route' : mode === 'walking' ? 'Walking route' : 'Cycling route',
          mapUrl,
        }
      }
    } catch {
      // fall through to estimate
    }

    return this.fallback.getDirections(from, to, mode)
  }
}
