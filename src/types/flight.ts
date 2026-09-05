export type FlightStatus =
  | 'scheduled'
  | 'on_time'
  | 'gate_open'
  | 'boarding'
  | 'gate_closing'
  | 'delayed'
  | 'departed'
  | 'in_air'
  | 'landed'
  | 'arrived'
  | 'cancelled'
  | 'diverted'
  | 'unknown'

export type FlightDirection = 'departure' | 'arrival'

export interface TimePoint {
  /** ISO-8601 timestamp, timezone-aware */
  scheduled: string | null
  estimated: string | null
  actual: string | null
}

export interface AirportRef {
  iata: string
  icao?: string | null
  name?: string | null
  city?: string | null
  country?: string | null
  timezone?: string | null
  terminal?: string | null
  gate?: string | null
  baggageBelt?: string | null
}

export interface Flight {
  id: string
  direction: FlightDirection
  flightNumber: string
  airline: {
    name: string
    iata?: string | null
    icao?: string | null
  }
  aircraft?: string | null
  origin: AirportRef
  destination: AirportRef
  departure: TimePoint
  arrival: TimePoint
  boardingTime: string | null
  gateClosingTime: string | null
  status: FlightStatus
  statusText: string
  delayMinutes: number | null
  durationMinutes: number | null
  codeshareOf?: string | null
  lastUpdated: string
  isLive: boolean
  disruption?: {
    reason?: string | null
    rebookingInfo?: string | null
    customerServiceUrl?: string | null
    alternativeFlights?: string[]
  } | null
}

export interface FlightSearchResult {
  kind: 'flight' | 'airline' | 'airport' | 'city' | 'route'
  label: string
  sublabel?: string
  value: string
}

export interface ConnectionLeg {
  flight: Flight
  arrivalAirport?: AirportRef
  departureAirport?: AirportRef
}

export type ConnectionUrgency = 'plenty' | 'limited' | 'urgent' | 'missed' | 'unknown'

export interface ConnectionJourney {
  id: string
  legs: [Flight, Flight]
  effectiveConnectionMinutes: number | null
  scheduledConnectionMinutes: number | null
  walkMinutes: number | null
  urgency: ConnectionUrgency
  statusText: string
  terminalChanged: boolean
  gateChanged: boolean
}
