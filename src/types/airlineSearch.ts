import type { FlightStatus } from './flight'

/** A single relevant flight attached to an airline search result — a lighter-weight
 *  projection of Flight, scoped to what the search result card actually displays. */
export interface AirlineSearchFlight {
  flightNumber: string
  originIata: string | null
  destinationIata: string | null
  scheduledDeparture: string | null
  estimatedDeparture: string | null
  actualDeparture: string | null
  scheduledArrival: string | null
  estimatedArrival: string | null
  actualArrival: string | null
  status: FlightStatus
  statusText: string
  terminal: string | null
  gate: string | null
  delayMinutes: number | null
  codeshareOf: string | null
  updatedAt: string
}

export type AirlineSearchMatchKind = 'flight_number' | 'airline_code' | 'airline_name' | 'route'

export interface AirlineSearchResult {
  matchKind: AirlineSearchMatchKind
  airline: {
    name: string
    iata: string | null
    icao: string | null
    country: string | null
    domain: string | null
  }
  /** Populated eagerly for the top/primary result; other airline-name matches start empty
   *  and hydrate lazily on selection via /api/airlines/[iata]/flights (see
   *  airlineSearchService's doc comment for why — the free AirLabs plan's request quota is
   *  too tight to enrich every result in a list up front). */
  flights: AirlineSearchFlight[]
}
