import type { Flight } from '@/types/flight'
import { findAirport } from '@/data/airportDirectory'
import { formatLocalTime } from '@/lib/timezone'

export interface LegacyPlace {
  city: string
  code: string
  terminal: string
  gate: string
}

export interface LegacyFlight {
  id: string
  type: 'departure' | 'arrival'
  airline: string
  airlineMark: string
  flightNumber: string
  from: LegacyPlace
  to: LegacyPlace
  scheduledDeparture: string
  actualDeparture: string
  scheduledArrival: string
  actualArrival: string
  boarding: string
  gateCloses: string
  duration: string
  status: Flight['status']
  statusLabel: string
  note: string
  isLive: boolean
  raw: Flight
}

function timezoneFor(iata: string): string {
  return findAirport(iata)?.timezone ?? 'UTC'
}

function timeAt(iso: string | null, tz: string): string {
  return iso ? formatLocalTime(tz, new Date(iso)) : '—'
}

function durationLabel(minutes: number | null): string {
  if (minutes === null) return '—'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

function cityFor(iata: string, fallback?: string | null): string {
  return fallback ?? findAirport(iata)?.city ?? iata
}

export function toLegacyFlight(flight: Flight): LegacyFlight {
  const originTz = timezoneFor(flight.origin.iata)
  const destTz = timezoneFor(flight.destination.iata)

  return {
    id: flight.id,
    type: flight.direction,
    airline: flight.airline.name,
    airlineMark: flight.airline.iata ?? flight.flightNumber.replace(/[0-9]/g, ''),
    flightNumber: flight.flightNumber,
    from: {
      city: cityFor(flight.origin.iata, flight.origin.city),
      code: flight.origin.iata,
      terminal: flight.origin.terminal ?? '—',
      gate: flight.origin.gate ?? '—',
    },
    to: {
      city: cityFor(flight.destination.iata, flight.destination.city),
      code: flight.destination.iata,
      terminal: flight.destination.terminal ?? '—',
      gate: flight.destination.gate ?? '—',
    },
    scheduledDeparture: timeAt(flight.departure.scheduled, originTz),
    actualDeparture: timeAt(flight.departure.estimated ?? flight.departure.actual ?? flight.departure.scheduled, originTz),
    scheduledArrival: timeAt(flight.arrival.scheduled, destTz),
    actualArrival: timeAt(flight.arrival.estimated ?? flight.arrival.actual ?? flight.arrival.scheduled, destTz),
    boarding: timeAt(flight.boardingTime, originTz),
    gateCloses: timeAt(flight.gateClosingTime, originTz),
    duration: durationLabel(flight.durationMinutes),
    status: flight.status,
    statusLabel: flight.statusText,
    note: noteFor(flight),
    isLive: flight.isLive,
    raw: flight,
  }
}

function noteFor(flight: Flight): string {
  if (flight.status === 'cancelled') return flight.disruption?.rebookingInfo ?? 'Contact airline for rebooking'
  if (flight.status === 'delayed' && flight.delayMinutes) return `${flight.delayMinutes} min delay`
  if (flight.status === 'boarding') return 'Boarding in progress'
  if (flight.status === 'arrived' && flight.destination.baggageBelt) return `Baggage reclaim belt ${flight.destination.baggageBelt}`
  return flight.statusText
}
