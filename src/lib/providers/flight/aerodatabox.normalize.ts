import type { AirportRef, Flight, FlightDirection, FlightStatus, TimePoint } from '@/types/flight'
import { computeDelayMinutes } from '@/lib/flightMath'

// Minimal shape of the fields we actually read from AeroDataBox's flight objects.
// The provider returns more fields than this; everything else is ignored.
export interface AeroDataBoxTime {
  utc?: string | null
  local?: string | null
}

export interface AeroDataBoxAirport {
  icao?: string | null
  iata?: string | null
  name?: string | null
  municipalityName?: string | null
  countryCode?: string | null
}

export interface AeroDataBoxMovement {
  airport?: AeroDataBoxAirport
  scheduledTime?: AeroDataBoxTime
  revisedTime?: AeroDataBoxTime
  runwayTime?: AeroDataBoxTime
  terminal?: string | null
  gate?: string | null
  baggageBelt?: string | null
  quality?: string[]
}

export interface AeroDataBoxFlight {
  number?: string
  callSign?: string
  status?: string
  codeshareStatus?: string
  isCargo?: boolean
  aircraft?: { model?: string; reg?: string }
  airline?: { name?: string; iata?: string; icao?: string }
  departure?: AeroDataBoxMovement
  arrival?: AeroDataBoxMovement
}

function toTimePoint(scheduled?: AeroDataBoxTime, revised?: AeroDataBoxTime, actual?: AeroDataBoxTime): TimePoint {
  return {
    scheduled: scheduled?.utc ?? null,
    estimated: revised?.utc ?? null,
    actual: actual?.utc ?? null,
  }
}

function toAirportRef(a: AeroDataBoxAirport | undefined, move: AeroDataBoxMovement | undefined): AirportRef {
  return {
    iata: a?.iata ?? '—',
    icao: a?.icao ?? null,
    name: a?.name ?? null,
    city: a?.municipalityName ?? null,
    country: a?.countryCode ?? null,
    terminal: move?.terminal ?? null,
    gate: move?.gate ?? null,
    baggageBelt: move?.baggageBelt ?? null,
  }
}

const STATUS_MAP: Record<string, FlightStatus> = {
  Expected: 'scheduled',
  Scheduled: 'scheduled',
  CheckIn: 'scheduled',
  Boarding: 'boarding',
  GateOpen: 'gate_open',
  GateClosing: 'gate_closing',
  GateClosed: 'gate_closing',
  Delayed: 'delayed',
  Departed: 'departed',
  EnRoute: 'in_air',
  Approaching: 'in_air',
  Landed: 'landed',
  Arrived: 'arrived',
  Canceled: 'cancelled',
  Cancelled: 'cancelled',
  Diverted: 'diverted',
  Unknown: 'unknown',
}

function deriveStatus(raw: AeroDataBoxFlight, direction: FlightDirection, departureDelay: number | null, arrivalDelay: number | null): FlightStatus {
  const mapped = raw.status ? STATUS_MAP[raw.status] : undefined
  if (mapped === 'cancelled' || mapped === 'diverted') return mapped
  if (mapped) {
    if (mapped === 'scheduled' && (direction === 'departure' ? departureDelay : arrivalDelay)) return 'delayed'
    return mapped
  }
  if (direction === 'departure' && departureDelay) return 'delayed'
  if (direction === 'arrival' && arrivalDelay) return 'delayed'
  return 'unknown'
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

export function normalizeAeroDataBoxFlight(raw: AeroDataBoxFlight, direction: FlightDirection): Flight {
  const dep = raw.departure
  const arr = raw.arrival

  const departure = toTimePoint(dep?.scheduledTime, dep?.revisedTime, dep?.runwayTime)
  const arrival = toTimePoint(arr?.scheduledTime, arr?.revisedTime, arr?.runwayTime)

  const departureDelay = computeDelayMinutes(departure)
  const arrivalDelay = computeDelayMinutes(arrival)
  const delayMinutes = direction === 'departure' ? departureDelay : arrivalDelay

  const status = deriveStatus(raw, direction, departureDelay, arrivalDelay)

  const flightNumber = raw.number ?? raw.callSign ?? 'UNKNOWN'

  const durationMinutes =
    departure.scheduled && arrival.scheduled
      ? Math.round((new Date(arrival.scheduled).getTime() - new Date(departure.scheduled).getTime()) / 60000)
      : null

  return {
    id: `${flightNumber}-${departure.scheduled ?? 'unknown'}`.toLowerCase().replace(/\s+/g, ''),
    direction,
    flightNumber,
    airline: {
      name: raw.airline?.name ?? (flightNumber.replace(/[0-9]/g, '').trim() || 'Unknown Airline'),
      iata: raw.airline?.iata ?? null,
      icao: raw.airline?.icao ?? null,
    },
    aircraft: raw.aircraft?.model ?? null,
    origin: toAirportRef(dep?.airport, dep),
    destination: toAirportRef(arr?.airport, arr),
    departure,
    arrival,
    boardingTime: null,
    gateClosingTime: null,
    status,
    statusText: statusText(status, delayMinutes),
    delayMinutes,
    durationMinutes,
    codeshareOf: raw.codeshareStatus === 'IsCodeshare' ? raw.callSign ?? null : null,
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
