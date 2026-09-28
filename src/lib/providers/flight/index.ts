import type { FlightProvider } from './types'
import { AeroDataBoxProvider } from './aerodatabox'
import { AirLabsProvider } from './airlabs'
import { MockFlightProvider } from './mock'
import { serverEnv } from '@/config/env'

let cached: FlightProvider | null = null

/**
 * FLIGHT_PROVIDER selects which FlightProvider to construct: "aerodatabox" (default) or
 * "airlabs" are implemented; "cirium"/"flightaware" are reserved for a future provider swap
 * (see FlightProviderName) and fail fast here rather than silently falling back to demo data.
 *
 * Each implemented provider falls back to demo data when its API key is missing, or when
 * ENABLE_MOCK_DATA=true forces it even with a key present.
 */
export function getFlightProvider(): FlightProvider {
  if (cached) return cached

  if (serverEnv.FLIGHT_PROVIDER === 'cirium' || serverEnv.FLIGHT_PROVIDER === 'flightaware') {
    throw new Error(
      `FLIGHT_PROVIDER=${serverEnv.FLIGHT_PROVIDER} is not implemented yet — set FLIGHT_PROVIDER=aerodatabox or airlabs.`
    )
  }

  if (serverEnv.FLIGHT_PROVIDER === 'airlabs') {
    cached = serverEnv.AIRLABS_API_KEY && !serverEnv.ENABLE_MOCK_DATA ? new AirLabsProvider() : new MockFlightProvider()
    return cached
  }

  const apiKey = serverEnv.AERODATABOX_API_KEY
  cached = apiKey && !serverEnv.ENABLE_MOCK_DATA ? new AeroDataBoxProvider(apiKey) : new MockFlightProvider()
  return cached
}

export type { FlightProvider } from './types'
