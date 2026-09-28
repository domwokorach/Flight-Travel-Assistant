/** Reference data from AirLabs' database endpoints (/airlines, /cities, /countries, /fleets,
 *  /routes, /delays). None of these back a specific screen yet — they exist as a ready data
 *  layer (service + API route + types) for future features to draw on. */

export interface AirlineInfo {
  name: string
  iata: string | null
  icao: string | null
  country: string | null
}

export interface CityInfo {
  name: string
  cityCode: string | null
  country: string | null
  latitude: number | null
  longitude: number | null
}

export interface CountryInfo {
  name: string
  code: string | null
  continent: string | null
}

export interface FleetAircraft {
  registration: string | null
  aircraftIcao: string | null
  airlineIata: string | null
  manufacturer: string | null
  model: string | null
}

export interface AirlineRoute {
  airlineIata: string | null
  departureIata: string | null
  arrivalIata: string | null
}

export interface DelayedFlightSummary {
  flightNumber: string
  airportIata: string | null
  delayMinutes: number | null
  status: string | null
}
