import { NextResponse } from 'next/server'
import { getFlightProvider } from '@/lib/providers/flight'
import { getWeatherForAirport } from '@/services/weatherService'
import { getAirport } from '@/services/airportService'
import { getDirectionsToAirport } from '@/services/directionsService'
import { getTransportToAirport } from '@/services/transportService'

type ServiceStatus = 'online' | 'degraded' | 'offline'

const PROBE_AIRPORT = 'LHR'

async function probe(fn: () => Promise<unknown>): Promise<ServiceStatus> {
  try {
    const result = await Promise.race([
      fn(),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('probe timeout')), 4000)),
    ])
    return result === null || result === undefined ? 'degraded' : 'online'
  } catch {
    return 'offline'
  }
}

/**
 * Never returns provider identities/keys — status strings only (spec §51).
 */
export async function GET() {
  const [flights, weather, airports, directions, transport] = await Promise.all([
    probe(async () => {
      const provider = getFlightProvider()
      return provider.getDepartures(PROBE_AIRPORT)
    }),
    probe(() => getWeatherForAirport(PROBE_AIRPORT)),
    probe(() => getAirport(PROBE_AIRPORT)),
    probe(() => getDirectionsToAirport({ lat: 51.5074, lon: -0.1278 }, PROBE_AIRPORT)),
    probe(() => getTransportToAirport(PROBE_AIRPORT)),
  ])

  const services: Record<string, ServiceStatus> = { flights, weather, airports, directions, transport }
  const overall = Object.values(services).every((s) => s === 'online')
    ? 'ok'
    : Object.values(services).some((s) => s === 'offline')
      ? 'degraded'
      : 'ok'

  return NextResponse.json({ status: overall, services })
}
