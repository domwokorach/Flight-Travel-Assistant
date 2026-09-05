import type { GeocodingMatch } from '@/types/geocoding'
import type { GeocodingProvider } from './types'
import { fetchJson } from '@/lib/http'

interface MapboxGeocodingResponse {
  features?: { place_name: string; center: [number, number] }[]
}

/** Mapbox Geocoding API using the same public token as the airport map and Directions provider. */
export class MapboxGeocodingProvider implements GeocodingProvider {
  constructor(private token: string) {}

  async geocode(query: string): Promise<GeocodingMatch[]> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?limit=5&access_token=${this.token}`
    const data = await fetchJson<MapboxGeocodingResponse>(url, { timeoutMs: 6000 })
    return (data.features ?? []).map((f) => ({
      label: f.place_name,
      lon: f.center[0],
      lat: f.center[1],
    }))
  }
}
