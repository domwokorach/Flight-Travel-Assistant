import type { FlightProvider } from './types'
import { AeroDataBoxProvider } from './aerodatabox'
import { MockFlightProvider } from './mock'
import { serverEnv } from '@/config/env'

let cached: FlightProvider | null = null

/**
 * Set AERODATABOX_API_KEY in .env.local (RapidAPI key, subscribed to the AeroDataBox API)
 * to switch from demo data to live departures/arrivals/status. Set
 * ENABLE_MOCK_DATA=true to force demo data even when a key is present.
 */
export function getFlightProvider(): FlightProvider {
  if (cached) return cached
  const apiKey = serverEnv.AERODATABOX_API_KEY
  cached = apiKey && !serverEnv.ENABLE_MOCK_DATA ? new AeroDataBoxProvider(apiKey) : new MockFlightProvider()
  return cached
}

export type { FlightProvider } from './types'
