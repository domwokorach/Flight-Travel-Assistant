import type { Flight } from '@/types/flight'

export interface FlightProvider {
  readonly name: string
  readonly isLive: boolean
  getDepartures(airportIata: string): Promise<Flight[]>
  getArrivals(airportIata: string): Promise<Flight[]>
  getFlight(flightNumber: string, date?: string): Promise<Flight | null>
  searchFlights(query: string): Promise<Flight[]>
}
