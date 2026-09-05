import type { Flight } from '@/types/flight'
import { fetchJson, ProviderError } from '@/lib/http'
import { withServerCache } from '@/lib/serverCache'
import type { FlightProvider } from './types'
import { normalizeAeroDataBoxFlight, type AeroDataBoxFlight } from './aerodatabox.normalize'

const BASE_URL = 'https://aerodatabox.p.rapidapi.com'

interface FidsResponse {
  departures?: AeroDataBoxFlight[]
  arrivals?: AeroDataBoxFlight[]
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

/** AeroDataBox windows are max 12h; we split "now" into two adjacent 6h windows to cover a 12h board. */
function timeWindow(hoursBack: number, hoursForward: number) {
  const now = new Date()
  const from = new Date(now.getTime() - hoursBack * 3600_000)
  const to = new Date(now.getTime() + hoursForward * 3600_000)
  const fmt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
  return { from: fmt(from), to: fmt(to) }
}

export class AeroDataBoxProvider implements FlightProvider {
  readonly name = 'AeroDataBox'
  readonly isLive = true

  constructor(private readonly apiKey: string) {}

  private headers() {
    return {
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com',
    }
  }

  private async fetchBoard(airportIata: string): Promise<FidsResponse> {
    return withServerCache(`adb:fids:${airportIata}`, 30_000, async () => {
      const { from, to } = timeWindow(1, 5)
      const url = `${BASE_URL}/flights/airports/iata/${airportIata}/${from}/${to}?withLeg=true&direction=Both&withCancelled=true&withCodeshared=true&withCargo=false&withPrivate=false`
      return fetchJson<FidsResponse>(url, { headers: this.headers(), timeoutMs: 9000 })
    })
  }

  async getDepartures(airportIata: string): Promise<Flight[]> {
    const board = await this.fetchBoard(airportIata)
    return (board.departures ?? []).map((f) => normalizeAeroDataBoxFlight(f, 'departure'))
  }

  async getArrivals(airportIata: string): Promise<Flight[]> {
    const board = await this.fetchBoard(airportIata)
    return (board.arrivals ?? []).map((f) => normalizeAeroDataBoxFlight(f, 'arrival'))
  }

  async getFlight(flightNumber: string, date?: string): Promise<Flight | null> {
    const day = date ?? new Date().toISOString().slice(0, 10)
    return withServerCache(`adb:flight:${flightNumber}:${day}`, 20_000, async () => {
      try {
        const url = `${BASE_URL}/flights/number/${encodeURIComponent(flightNumber)}/${day}`
        const results = await fetchJson<AeroDataBoxFlight[]>(url, { headers: this.headers(), timeoutMs: 9000 })
        const first = results?.[0]
        if (!first) return null
        return normalizeAeroDataBoxFlight(first, first.departure ? 'departure' : 'arrival')
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
