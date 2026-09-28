import type { GoogleTravelMode } from '@/types/directions'

const GOOGLE_TRAVEL_MODE_PARAM: Record<GoogleTravelMode, string> = {
  DRIVE: 'driving',
  TRANSIT: 'transit',
  WALK: 'walking',
}

/**
 * Client-safe (no env/server imports) — used both by the server-side Google provider and
 * directly by client components for the "Start directions"/"Open in Google Maps" buttons,
 * which need no API key or network call.
 */
export function buildGoogleMapsUrl(origin: { lat: number; lon: number }, destination: { lat: number; lon: number }, mode: GoogleTravelMode): string {
  const params = new URLSearchParams({
    api: '1',
    origin: `${origin.lat},${origin.lon}`,
    destination: `${destination.lat},${destination.lon}`,
    travelmode: GOOGLE_TRAVEL_MODE_PARAM[mode],
  })
  return `https://www.google.com/maps/dir/?${params.toString()}`
}
