import { fetchJson, ProviderError } from '@/lib/http'
import { serverEnv } from '@/config/env'
import { buildGoogleMapsUrl } from '@/lib/directions/googleMapsUrl'
import type { GoogleTravelMode, GroundRoute } from '@/types/directions'

export { buildGoogleMapsUrl }

type LatLon = { lat: number; lon: number }
type PlaceRef = { placeId: string }
type RoutePoint = LatLon | PlaceRef

export interface ComputeGroundRouteInput {
  origin: RoutePoint
  destination: RoutePoint
  travelMode: GoogleTravelMode
  /** ISO timestamp; omitted means "now". */
  departureTime?: string
}

interface GoogleRoutesResponse {
  routes?: {
    duration?: string
    staticDuration?: string
    distanceMeters?: number
    polyline?: { encodedPolyline?: string }
  }[]
}

function toWaypoint(point: RoutePoint) {
  if ('placeId' in point) return { placeId: point.placeId }
  return { location: { latLng: { latitude: point.lat, longitude: point.lon } } }
}

/** Google returns durations as e.g. "1234s" — strip the trailing unit. */
function parseDurationSeconds(value: string | undefined): number {
  if (!value) return 0
  return Number(value.replace(/s$/, '')) || 0
}

/**
 * Server-only — must never be imported from a 'use client' module. Calls Google's
 * Routes API (POST, field-masked) for a single ground leg of the Flight Directions
 * journey. Throws ProviderError (matching every other provider in this codebase) so
 * callers can rely on apiErrorResponse for consistent HTTP mapping.
 */
export async function computeGroundRoute(input: ComputeGroundRouteInput): Promise<GroundRoute> {
  if (!serverEnv.GOOGLE_MAPS_API_KEY) {
    throw new ProviderError('Google Maps API key is not configured', 'invalid')
  }

  const body: Record<string, unknown> = {
    origin: toWaypoint(input.origin),
    destination: toWaypoint(input.destination),
    travelMode: input.travelMode,
  }
  // routingPreference (traffic-aware routing) is only valid for DRIVE — Google rejects the
  // request if it's sent alongside WALK or TRANSIT.
  if (input.travelMode === 'DRIVE') body.routingPreference = 'TRAFFIC_AWARE'
  if (input.departureTime) body.departureTime = input.departureTime

  const data = await fetchJson<GoogleRoutesResponse>('https://routes.googleapis.com/directions/v2:computeRoutes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': serverEnv.GOOGLE_MAPS_API_KEY,
      'X-Goog-FieldMask': 'routes.duration,routes.staticDuration,routes.distanceMeters,routes.polyline.encodedPolyline',
    },
    body: JSON.stringify(body),
    timeoutMs: 8000,
  })

  const route = data.routes?.[0]
  if (!route) throw new ProviderError('No route found', 'not_found')

  return {
    travelMode: input.travelMode,
    distanceMeters: route.distanceMeters ?? 0,
    durationSeconds: parseDurationSeconds(route.duration),
    staticDurationSeconds: parseDurationSeconds(route.staticDuration ?? route.duration),
    encodedPolyline: route.polyline?.encodedPolyline,
    computedAt: new Date().toISOString(),
  }
}

