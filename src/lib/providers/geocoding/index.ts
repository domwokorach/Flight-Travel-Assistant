import type { GeocodingProvider } from './types'
import { MapboxGeocodingProvider } from './mapbox'
import { publicEnv } from '@/config/env'

let cached: GeocodingProvider | null | undefined

/**
 * Address search has no keyless fallback (unlike directions/weather) — it needs
 * NEXT_PUBLIC_MAPBOX_TOKEN set. Returns null when unset so callers can degrade
 * gracefully (e.g. hide the address-search input), matching AirportMap's pattern.
 */
export function getGeocodingProvider(): GeocodingProvider | null {
  if (cached !== undefined) return cached
  const token = publicEnv.NEXT_PUBLIC_MAPBOX_TOKEN
  cached = token ? new MapboxGeocodingProvider(token) : null
  return cached
}

export type { GeocodingProvider } from './types'
