import type { LiveFlightPosition } from '@/types/liveFlight'
import { airlabsRequest } from '@/lib/airlabs/client'
import { withServerCache } from '@/lib/serverCache'
import { serverEnv } from '@/config/env'

interface AirLabsLiveFlight {
  flight_iata?: string | null
  flight_icao?: string | null
  lat?: number
  lng?: number
  alt?: number | null
  speed?: number | null
  dir?: number | null
  updated?: number | null
}

/**
 * Real-time position for a single in-air flight, via AirLabs' /flights tracker (spec §5).
 * Only meaningful once a flight's status is `in_air` — returns null before takeoff, after
 * landing, or when AIRLABS_API_KEY isn't configured (no fallback: there's no free live ADS-B
 * substitute worth wiring in for a single-flight lookup — see the earlier note on OpenSky).
 */
export async function getLiveFlightPosition(flightNumber: string): Promise<LiveFlightPosition | null> {
  if (!serverEnv.AIRLABS_API_KEY) return null

  const flights = await withServerCache(`airlabs:live:${flightNumber}`, 20_000, () =>
    airlabsRequest<AirLabsLiveFlight[]>('flights', { flight_iata: flightNumber.toUpperCase() })
  )

  const first = flights?.[0]
  if (!first || first.lat == null || first.lng == null) return null

  return {
    flightNumber: first.flight_iata ?? first.flight_icao ?? flightNumber,
    latitude: first.lat,
    longitude: first.lng,
    altitude: first.alt ?? null,
    speed: first.speed ?? null,
    direction: first.dir ?? null,
    updatedAt: first.updated ? new Date(first.updated * 1000).toISOString() : new Date().toISOString(),
  }
}
