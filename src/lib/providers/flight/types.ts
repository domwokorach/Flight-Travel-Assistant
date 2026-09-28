import type { ConnectionJourney, Flight } from '@/types/flight'

/** Config key for FLIGHT_PROVIDER / provider selection. Distinct from FlightProvider#name
 *  (a human-readable label) — this is the stable identifier future call sites branch on. */
export type FlightProviderName = 'aerodatabox' | 'airlabs' | 'cirium' | 'flightaware'

export interface FlightProvider {
  readonly name: string
  readonly isLive: boolean
  getDepartures(airportIata: string): Promise<Flight[]>
  getArrivals(airportIata: string): Promise<Flight[]>
  getFlight(flightNumber: string, date?: string): Promise<Flight | null>
  searchFlights(query: string): Promise<Flight[]>
  /**
   * Native passenger-connection lookup (e.g. Cirium FlightStats' Connections API).
   * Optional — providers without one (AeroDataBox, FlightAware) omit this, and
   * flightService.getConnectionJourney falls back to composing two getFlight() calls.
   */
  getConnection?(arrivalFlightNumber: string, departureFlightNumber: string, walkMinutes: number): Promise<ConnectionJourney | null>
}
