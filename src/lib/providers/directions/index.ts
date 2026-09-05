import type { DirectionsProvider } from './types'
import { MapboxDirectionsProvider } from './mapbox'
import { EstimateDirectionsProvider } from './estimate'
import { publicEnv } from '@/config/env'

let cached: DirectionsProvider | null = null

/**
 * Set NEXT_PUBLIC_MAPBOX_TOKEN (see AirportMap) to get real routed walking/cycling/driving
 * directions instead of the keyless OSRM-driving-plus-estimate fallback.
 */
export function getDirectionsProvider(): DirectionsProvider {
  if (cached) return cached
  const token = publicEnv.NEXT_PUBLIC_MAPBOX_TOKEN
  cached = token ? new MapboxDirectionsProvider(token) : new EstimateDirectionsProvider()
  return cached
}

export type { DirectionsProvider } from './types'
