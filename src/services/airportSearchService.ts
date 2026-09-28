import type { AirportSuggestion } from '@/types/airport'
import { airlabsRequest } from '@/lib/airlabs/client'
import { withServerCache } from '@/lib/serverCache'
import { serverEnv } from '@/config/env'
import { searchAirports } from '@/data/airportDirectory'

interface AirLabsSuggestItem {
  iata_code?: string | null
  icao_code?: string | null
  name?: string
  city?: string | null
  country_code?: string | null
}

interface AirLabsSuggestResponse {
  airports?: AirLabsSuggestItem[]
  cities?: AirLabsSuggestItem[]
  airlines?: AirLabsSuggestItem[]
}

function toSuggestion(kind: AirportSuggestion['kind'], item: AirLabsSuggestItem): AirportSuggestion {
  return {
    kind,
    iata: item.iata_code ?? null,
    icao: item.icao_code ?? null,
    name: item.name ?? item.iata_code ?? 'Unknown',
    city: item.city ?? null,
    country: item.country_code ?? null,
  }
}

/**
 * Live airport/city/airline autocomplete via AirLabs' /suggest (spec §11). Falls back to the
 * static curated directory when AIRLABS_API_KEY isn't configured, so search still works —
 * just scoped to the handful of airports bundled in src/data/airportDirectory.ts — on demo data.
 */
export async function suggestAirports(query: string): Promise<{ results: AirportSuggestion[]; isLive: boolean }> {
  const q = query.trim()
  if (!q) return { results: [], isLive: false }

  if (!serverEnv.AIRLABS_API_KEY) {
    const results = searchAirports(q).map((a) => ({
      kind: 'airport' as const,
      iata: a.iata,
      icao: a.icao,
      name: a.name,
      city: a.city,
      country: a.country,
    }))
    return { results, isLive: false }
  }

  const data = await withServerCache(`airlabs:suggest:${q.toLowerCase()}`, 60_000, () =>
    airlabsRequest<AirLabsSuggestResponse>('suggest', { q })
  )

  const results = [
    ...(data.airports ?? []).map((i) => toSuggestion('airport', i)),
    ...(data.cities ?? []).map((i) => toSuggestion('city', i)),
    ...(data.airlines ?? []).map((i) => toSuggestion('airline', i)),
  ]
  return { results, isLive: true }
}
