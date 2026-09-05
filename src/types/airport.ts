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
