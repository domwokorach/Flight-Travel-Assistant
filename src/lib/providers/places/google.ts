import { fetchJson, ProviderError } from '@/lib/http'
import { serverEnv } from '@/config/env'
import type { ResolvedPlace } from '@/types/directions'

interface GooglePlace {
  id: string
  displayName?: { text?: string }
  formattedAddress?: string
  location?: { latitude?: number; longitude?: number }
}

interface SearchTextResponse {
  places?: GooglePlace[]
}

function toResolvedPlace(place: GooglePlace): ResolvedPlace {
  return {
    placeId: place.id,
    name: place.displayName?.text ?? place.formattedAddress ?? place.id,
    formattedAddress: place.formattedAddress ?? '',
    latitude: place.location?.latitude ?? 0,
    longitude: place.location?.longitude ?? 0,
  }
}

/**
 * Server-only — must never be imported from a 'use client' module. Free-text place
 * resolution (e.g. a traveller's typed final destination) via Places API (New).
 * Airport/terminal coordinates never go through this — findAirport() already has them.
 */
export async function searchPlaceText(query: string, locationBias?: { lat: number; lon: number }): Promise<ResolvedPlace[]> {
  if (!serverEnv.GOOGLE_MAPS_API_KEY) {
    throw new ProviderError('Google Maps API key is not configured', 'invalid')
  }

  const body: Record<string, unknown> = { textQuery: query }
  if (locationBias) {
    body.locationBias = {
      circle: { center: { latitude: locationBias.lat, longitude: locationBias.lon }, radius: 20_000 },
    }
  }

  const data = await fetchJson<SearchTextResponse>('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': serverEnv.GOOGLE_MAPS_API_KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location',
    },
    body: JSON.stringify(body),
    timeoutMs: 6000,
  })

  return (data.places ?? []).slice(0, 5).map(toResolvedPlace)
}

/** Used when a Place ID is already known (e.g. a prior autocomplete/search selection) and only fresh details are needed. */
export async function getPlaceDetails(placeId: string): Promise<ResolvedPlace> {
  if (!serverEnv.GOOGLE_MAPS_API_KEY) {
    throw new ProviderError('Google Maps API key is not configured', 'invalid')
  }

  const data = await fetchJson<GooglePlace>(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
    headers: {
      'X-Goog-Api-Key': serverEnv.GOOGLE_MAPS_API_KEY,
      'X-Goog-FieldMask': 'id,displayName,formattedAddress,location',
    },
    timeoutMs: 6000,
  })

  return toResolvedPlace(data)
}
