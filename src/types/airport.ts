export interface AirportMeta {
  iata: string
  icao: string
  name: string
  city: string
  country: string
  latitude: number
  longitude: number
  timezone: string
  terminals?: string[]
  website?: string | null
}

export interface AirportService {
  title: string
  detail: string
  icon: string
}

/** A single autocomplete result from AirLabs' /suggest — airport, city, or airline. */
export interface AirportSuggestion {
  kind: 'airport' | 'city' | 'airline'
  iata: string | null
  icao: string | null
  name: string
  city: string | null
  country: string | null
}

export interface NearbyAirport extends AirportMeta {
  distanceKm: number
}
