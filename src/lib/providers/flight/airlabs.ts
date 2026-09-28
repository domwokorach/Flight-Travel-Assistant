import type { Flight } from '@/types/flight'
import { ProviderError } from '@/lib/http'
import { withServerCache } from '@/lib/serverCache'
import { airlabsRequest } from '@/lib/airlabs/client'
import type { FlightProvider } from './types'
import { normalizeAirLabsFlight, type AirLabsFlight } from './airlabs.normalize'

/**
 * AirLabs (https://airlabs.co) — free-tier flight schedules provider, via the shared
 * airlabsRequest client (src/lib/airlabs/client.ts). The free plan has no webhook/push tier,
 * so this is poll-only like AeroDataBox; and /schedules only exposes coarse statuses
 * (see airlabs.normalize.ts).
 */
export class AirLabsProvider implements FlightProvider {
  readonly name = 'AirLabs'
  readonly isLive = true

  async getDepartures(airportIata: string): Promise<Flight[]> {
    const flights = await withServerCache(`airlabs:dep:${airportIata}`, 30_000, () =>
      airlabsRequest<AirLabsFlight[]>('schedules', { dep_iata: airportIata })
    )
    return (flights ?? []).map((f) => normalizeAirLabsFlight(f, 'departure'))
  }

  async getArrivals(airportIata: string): Promise<Flight[]> {
    const flights = await withServerCache(`airlabs:arr:${airportIata}`, 30_000, () =>
      airlabsRequest<AirLabsFlight[]>('schedules', { arr_iata: airportIata })
    )
    return (flights ?? []).map((f) => normalizeAirLabsFlight(f, 'arrival'))
  }

  async getFlight(flightNumber: string): Promise<Flight | null> {
    return withServerCache(`airlabs:flight:${flightNumber}`, 20_000, async () => {
      try {
        const flights = await airlabsRequest<AirLabsFlight[]>('schedules', { flight_iata: flightNumber.toUpperCase() })
        const first = flights?.[0]
        if (!first) return null
        return normalizeAirLabsFlight(first, first.dep_time_utc ? 'departure' : 'arrival')
      } catch (err) {
        if (err instanceof ProviderError && err.kind === 'not_found') return null
        throw err
      }
    })
  }

  async searchFlights(query: string): Promise<Flight[]> {
    const flight = await this.getFlight(query.trim().toUpperCase())
    return flight ? [flight] : []
  }
}
