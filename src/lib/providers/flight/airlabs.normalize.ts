import type { AirportRef, Flight, FlightDirection, FlightStatus, TimePoint } from '@/types/flight'
import { computeDelayMinutes } from '@/lib/flightMath'
import { getAirline, getAirlineDomain } from '@/data/airlines'

// Minimal shape of AirLabs' /schedules response items we actually read.
// https://airlabs.co/docs/schedules — UTC timestamps come back as "YYYY-MM-DD HH:mm" (no `T`/`Z`).
export interface AirLabsFlight {
  airline_iata?: string | null
  airline_icao?: string | null
  flight_iata?: string | null
  flight_icao?: string | null
  flight_number?: string | null
  aircraft_icao?: string | null

  dep_iata?: string | null
  dep_icao?: string | null
  dep_terminal?: string | null
  dep_gate?: string | null
  dep_time_utc?: string | null
  dep_estimated_utc?: string | null
  dep_actual_utc?: string | null

  arr_iata?: string | null
  arr_icao?: string | null
  arr_terminal?: string | null
  arr_gate?: string | null
  arr_baggage?: string | null
  arr_time_utc?: string | null
  arr_estimated_utc?: string | null
  arr_actual_utc?: string | null

  cs_flight_iata?: string | null
  status?: string | null
  duration?: number | null
  delayed?: number | null
}

function toIso(utc?: string | null): string | null {
  if (!utc) return null
  // "2024-01-01 10:00" -> "2024-01-01T10:00:00Z"
  return `${utc.replace(' ', 'T')}${utc.length <= 16 ? ':00' : ''}Z`
}

function toTimePoint(scheduled?: string | null, estimated?: string | null, actual?: string | null): TimePoint {
  return {
    scheduled: toIso(scheduled),
    estimated: toIso(estimated),
    actual: toIso(actual),
  }
}

function toAirportRef(iata?: string | null, icao?: string | null, terminal?: string | null, gate?: string | null, baggageBelt?: string | null): AirportRef {
  return {
    iata: iata ?? '—',
    icao: icao ?? null,
    name: null,
    city: null,
    country: null,
    terminal: terminal ?? null,
    gate: gate ?? null,
    baggageBelt: baggageBelt ?? null,
  }
}

// AirLabs only exposes coarse statuses (no gate/boarding granularity like AeroDataBox) —
// `active` covers everything from pushback to touchdown, so we lean on `direction` and the
// arrival/departure timestamps already resolved by the caller to make a reasonable call.
function deriveStatus(raw: AirLabsFlight, direction: FlightDirection, delayMinutes: number | null): FlightStatus {
  const status = raw.status?.toLowerCase()
  if (status === 'cancelled') return 'cancelled'
  if (status === 'diverted') return 'diverted'
  if (status === 'incident') return 'unknown'
  if (status === 'landed') return direction === 'arrival' ? 'arrived' : 'departed'
  if (status === 'active') return direction === 'arrival' ? 'in_air' : 'departed'
  if (delayMinutes) return 'delayed'
  return 'scheduled'
}

function statusText(status: FlightStatus, delayMinutes: number | null): string {
  switch (status) {
    case 'scheduled': return 'Scheduled'
    case 'on_time': return 'On Time'
    case 'gate_open': return 'Gate Open'
    case 'boarding': return 'Boarding'
    case 'gate_closing': return 'Gate Closing'
    case 'delayed': return delayMinutes ? `Delayed ${delayMinutes} min` : 'Delayed'
    case 'departed': return 'Departed'
    case 'in_air': return 'In Flight'
    case 'landed': return 'Landed'
    case 'arrived': return 'Arrived'
    case 'cancelled': return 'Cancelled'
    case 'diverted': return 'Diverted'
    default: return 'Status pending'
  }
}

export function normalizeAirLabsFlight(raw: AirLabsFlight, direction: FlightDirection): Flight {
  const departure = toTimePoint(raw.dep_time_utc, raw.dep_estimated_utc, raw.dep_actual_utc)
  const arrival = toTimePoint(raw.arr_time_utc, raw.arr_estimated_utc, raw.arr_actual_utc)

  const departureDelay = computeDelayMinutes(departure)
  const arrivalDelay = computeDelayMinutes(arrival)
  const delayMinutes = (direction === 'departure' ? departureDelay : arrivalDelay) ?? (raw.delayed ? raw.delayed : null)

  const status = deriveStatus(raw, direction, delayMinutes)

  const flightNumber = raw.flight_iata ?? raw.flight_icao ?? raw.cs_flight_iata ?? 'UNKNOWN'
  const airlineCode = raw.airline_iata ?? undefined
  const airline = airlineCode ? getAirline(airlineCode) : undefined

  const durationMinutes = raw.duration ?? (
    departure.scheduled && arrival.scheduled
      ? Math.round((new Date(arrival.scheduled).getTime() - new Date(departure.scheduled).getTime()) / 60000)
      : null
  )

  return {
    id: `${flightNumber}-${departure.scheduled ?? 'unknown'}`.toLowerCase().replace(/\s+/g, ''),
    direction,
    flightNumber,
    airline: {
      name: airline?.name ?? (flightNumber.replace(/[0-9]/g, '').trim() || 'Unknown Airline'),
      iata: raw.airline_iata ?? null,
      icao: raw.airline_icao ?? null,
      domain: getAirlineDomain(airlineCode) ?? null,
    },
    aircraft: raw.aircraft_icao ?? null,
    origin: toAirportRef(raw.dep_iata, raw.dep_icao, raw.dep_terminal, raw.dep_gate, null),
    destination: toAirportRef(raw.arr_iata, raw.arr_icao, raw.arr_terminal, raw.arr_gate, raw.arr_baggage),
    departure,
    arrival,
    boardingTime: null,
    gateClosingTime: null,
    status,
    statusText: statusText(status, delayMinutes),
    delayMinutes,
    durationMinutes,
    codeshareOf: raw.cs_flight_iata ?? null,
    lastUpdated: new Date().toISOString(),
    isLive: true,
    disruption:
      status === 'cancelled'
        ? {
            reason: 'Cancelled by operating airline',
            rebookingInfo: 'Contact the operating airline for rebooking options.',
            customerServiceUrl: null,
            alternativeFlights: [],
          }
        : null,
  }
}
