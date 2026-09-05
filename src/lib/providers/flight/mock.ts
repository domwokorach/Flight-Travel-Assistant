import type { Flight, FlightDirection, FlightStatus } from '@/types/flight'
import type { FlightProvider } from './types'

interface MockSeed {
  flightNumber: string
  airline: string
  direction: FlightDirection
  originIata: string
  destinationIata: string
  originTerminal: string
  destinationTerminal: string
  gate: string
  status: FlightStatus
  departureOffsetMin: number
  durationMin: number
  delayMin?: number
}

const SEEDS: MockSeed[] = [
  { flightNumber: 'BA117', airline: 'British Airways', direction: 'departure', originIata: 'LHR', destinationIata: 'JFK', originTerminal: '5', destinationTerminal: '8', gate: 'B42', status: 'boarding', departureOffsetMin: 45, durationMin: 475 },
  { flightNumber: 'SK500', airline: 'Scandinavian Airlines', direction: 'departure', originIata: 'LHR', destinationIata: 'CPH', originTerminal: '2', destinationTerminal: '3', gate: 'A18', status: 'on_time', departureOffsetMin: 100, durationMin: 115 },
  { flightNumber: 'AA106', airline: 'American Airlines', direction: 'departure', originIata: 'LHR', destinationIata: 'JFK', originTerminal: '3', destinationTerminal: '8', gate: '31', status: 'delayed', departureOffsetMin: 130, durationMin: 465, delayMin: 45 },
  { flightNumber: 'AF1281', airline: 'Air France', direction: 'departure', originIata: 'LHR', destinationIata: 'CDG', originTerminal: '4', destinationTerminal: '2E', gate: '22', status: 'gate_open', departureOffsetMin: 160, durationMin: 80 },
  { flightNumber: 'LH921', airline: 'Lufthansa', direction: 'departure', originIata: 'LHR', destinationIata: 'FRA', originTerminal: '2', destinationTerminal: '1', gate: '—', status: 'cancelled', departureOffsetMin: 220, durationMin: 95 },
  { flightNumber: 'VS103', airline: 'Virgin Atlantic', direction: 'departure', originIata: 'LHR', destinationIata: 'JFK', originTerminal: '3', destinationTerminal: '4', gate: '17', status: 'on_time', departureOffsetMin: 250, durationMin: 470 },
  { flightNumber: 'EK007', airline: 'Emirates', direction: 'departure', originIata: 'LHR', destinationIata: 'DXB', originTerminal: '3', destinationTerminal: '3', gate: '9', status: 'on_time', departureOffsetMin: 330, durationMin: 415 },
  { flightNumber: 'BA178', airline: 'British Airways', direction: 'arrival', originIata: 'JFK', destinationIata: 'LHR', originTerminal: '8', destinationTerminal: '5', gate: 'C61', status: 'arrived', departureOffsetMin: -30, durationMin: 464 },
  { flightNumber: 'KL1008', airline: 'KLM', direction: 'arrival', originIata: 'AMS', destinationIata: 'LHR', originTerminal: '1', destinationTerminal: '4', gate: '14', status: 'arrived', departureOffsetMin: -60, durationMin: 80 },
  { flightNumber: 'TK1979', airline: 'Turkish Airlines', direction: 'arrival', originIata: 'IST', destinationIata: 'LHR', originTerminal: '1', destinationTerminal: '2', gate: '9', status: 'delayed', departureOffsetMin: 20, durationMin: 260, delayMin: 42 },
  { flightNumber: 'KL1002', airline: 'KLM', direction: 'arrival', originIata: 'LHR', destinationIata: 'AMS', originTerminal: '2', destinationTerminal: '2', gate: 'D7', status: 'on_time', departureOffsetMin: -45, durationMin: 85 },
  { flightNumber: 'KL641', airline: 'KLM', direction: 'departure', originIata: 'AMS', destinationIata: 'JFK', originTerminal: '2', destinationTerminal: '4', gate: 'E22', status: 'gate_open', departureOffsetMin: 40, durationMin: 545 },
]

function iso(minutesFromNow: number): string {
  return new Date(Date.now() + minutesFromNow * 60_000).toISOString()
}

function buildFlight(seed: MockSeed): Flight {
  const scheduledDeparture = iso(seed.departureOffsetMin)
  const estimatedDeparture = seed.delayMin ? iso(seed.departureOffsetMin + seed.delayMin) : null
  const scheduledArrival = iso(seed.departureOffsetMin + seed.durationMin)
  const estimatedArrival = seed.delayMin ? iso(seed.departureOffsetMin + seed.durationMin + seed.delayMin) : null

  const relevantScheduled = seed.direction === 'departure' ? seed.departureOffsetMin : seed.departureOffsetMin + seed.durationMin
  const boardingTime = seed.status === 'boarding' || seed.status === 'gate_open' ? iso(Math.max(relevantScheduled - 40, 1)) : null
  const gateClosingTime = seed.status === 'boarding' || seed.status === 'gate_open' ? iso(Math.max(relevantScheduled - 15, 1)) : null

  const statusTextMap: Record<FlightStatus, string> = {
    scheduled: 'Scheduled', on_time: 'On Time', gate_open: 'Gate Open', boarding: 'Boarding',
    gate_closing: 'Gate Closing', delayed: seed.delayMin ? `Delayed ${seed.delayMin} min` : 'Delayed',
    departed: 'Departed', in_air: 'In Flight', landed: 'Landed', arrived: 'Arrived',
    cancelled: 'Cancelled', diverted: 'Diverted', unknown: 'Status pending',
  }

  return {
    id: seed.flightNumber.toLowerCase(),
    direction: seed.direction,
    flightNumber: seed.flightNumber,
    airline: { name: seed.airline, iata: seed.flightNumber.replace(/[0-9]/g, ''), icao: null },
    aircraft: null,
    origin: { iata: seed.originIata, terminal: seed.originTerminal, gate: seed.direction === 'departure' ? seed.gate : null },
    destination: { iata: seed.destinationIata, terminal: seed.destinationTerminal, gate: seed.direction === 'arrival' ? seed.gate : null, baggageBelt: seed.status === 'arrived' ? '6' : null },
    departure: { scheduled: scheduledDeparture, estimated: estimatedDeparture, actual: seed.status === 'departed' || seed.status === 'in_air' || seed.status === 'landed' || seed.status === 'arrived' ? scheduledDeparture : null },
    arrival: { scheduled: scheduledArrival, estimated: estimatedArrival, actual: seed.status === 'arrived' ? (estimatedArrival ?? scheduledArrival) : null },
    boardingTime,
    gateClosingTime,
    status: seed.status,
    statusText: statusTextMap[seed.status],
    delayMinutes: seed.delayMin ?? null,
    durationMinutes: seed.durationMin,
    lastUpdated: new Date().toISOString(),
    isLive: false,
    disruption:
      seed.status === 'cancelled'
        ? {
            reason: 'Inbound aircraft unavailable',
            rebookingInfo: 'Rebook free of charge on the next available flight, or request a refund.',
            customerServiceUrl: null,
            alternativeFlights: ['LH923 · 21:10', 'LH925 · 06:30 (+1 day)'],
          }
        : null,
  }
}

export class MockFlightProvider implements FlightProvider {
  readonly name = 'Mock'
  readonly isLive = false

  async getDepartures(airportIata: string): Promise<Flight[]> {
    return SEEDS.filter((s) => s.direction === 'departure' && s.originIata === airportIata.toUpperCase()).map(buildFlight)
  }

  async getArrivals(airportIata: string): Promise<Flight[]> {
    return SEEDS.filter((s) => s.direction === 'arrival' && s.destinationIata === airportIata.toUpperCase()).map(buildFlight)
  }

  async getFlight(flightNumber: string): Promise<Flight | null> {
    const seed = SEEDS.find((s) => s.flightNumber.toLowerCase() === flightNumber.trim().toLowerCase())
    return seed ? buildFlight(seed) : null
  }

  async searchFlights(query: string): Promise<Flight[]> {
    const q = query.trim().toLowerCase()
    return SEEDS.filter(
      (s) => s.flightNumber.toLowerCase().includes(q) || s.airline.toLowerCase().includes(q) || s.originIata.toLowerCase() === q || s.destinationIata.toLowerCase() === q
    ).map(buildFlight)
  }
}
