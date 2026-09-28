import type { NearbyAirport } from '@/types/airport'
import { airlabsRequest } from '@/lib/airlabs/client'
import { withServerCache } from '@/lib/serverCache'
import { serverEnv } from '@/config/env'

interface AirLabsNearbyAirport {
  iata_code?: string | null
  icao_code?: string | null
  name?: string
  city?: string | null
  country_code?: string | null
  lat?: number
  lng?: number
  timezone?: string | null
  distance?: number
}

interface AirLabsNearbyResponse {
  airports?: AirLabsNearbyAirport[]
}

/**
 * Nearby-airport discovery via AirLabs' /nearby (spec §10), for a "nearest airport from my
 * location" affordance. Requires AIRLABS_API_KEY — there's no free/static fallback for
 * arbitrary coordinates (unlike airportSearchService, which can fall back to the curated
 * directory for text search).
 */
export async function getNearbyAirports(lat: number, lon: number, distanceKm = 100): Promise<{ airports: NearbyAirport[]; isLive: boolean }> {
  if (!serverEnv.AIRLABS_API_KEY) return { airports: [], isLive: false }

  const cacheKey = `airlabs:nearby:${lat.toFixed(2)}:${lon.toFixed(2)}:${distanceKm}`
  const data = await withServerCache(cacheKey, 5 * 60_000, () =>
    airlabsRequest<AirLabsNearbyResponse>('nearby', { lat, lng: lon, distance: distanceKm })
  )

  const airports: NearbyAirport[] = (data.airports ?? [])
    .filter((a) => a.iata_code && a.lat != null && a.lng != null)
    .map((a) => ({
      iata: a.iata_code!,
      icao: a.icao_code ?? '',
      name: a.name ?? a.iata_code!,
      city: a.city ?? '',
      country: a.country_code ?? '',
      latitude: a.lat!,
      longitude: a.lng!,
      timezone: a.timezone ?? '',
      distanceKm: a.distance ?? 0,
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)

  return { airports, isLive: true }
}
