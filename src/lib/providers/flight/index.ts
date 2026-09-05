import type { FlightProvider } from './types'
import { AeroDataBoxProvider } from './aerodatabox'
import { MockFlightProvider } from './mock'

let cached: FlightProvider | null = null

/**
 * Set AERODATABOX_API_KEY in .env.local (RapidAPI key, subscribed to the AeroDataBox API)
 * to switch from demo data to live departures/arrivals/status.
 */
export function getFlightProvider(): FlightProvider {
  if (cached) return cached
  const apiKey = process.env.AERODATABOX_API_KEY
  cached = apiKey ? new AeroDataBoxProvider(apiKey) : new MockFlightProvider()
  return cached
}

export type { FlightProvider } from './types'
