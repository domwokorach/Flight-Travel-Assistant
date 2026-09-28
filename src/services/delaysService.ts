import type { DelayedFlightSummary } from '@/types/reference'
import { airlabsRequest } from '@/lib/airlabs/client'
import { withServerCache } from '@/lib/serverCache'
import { serverEnv } from '@/config/env'

interface AirLabsDelayedFlight {
  flight_iata?: string | null
  flight_icao?: string | null
  dep_iata?: string | null
  arr_iata?: string | null
  delayed?: number | null
  dep_delayed?: number | null
  arr_delayed?: number | null
  status?: string | null
}

export type DelayType = 'departures' | 'arrivals'

/**
 * Airport-wide delay digest via AirLabs' /delays (spec §7). No screen consumes this yet —
 * this is the data layer (service + API route) ready for a future "disruption at LHR today"
 * summary or similar.
 */
export async function getDelays(minimumMinutes = 60, type: DelayType = 'departures'): Promise<{ flights: DelayedFlightSummary[]; isLive: boolean }> {
  if (!serverEnv.AIRLABS_API_KEY) return { flights: [], isLive: false }

  const cacheKey = `airlabs:delays:${type}:${minimumMinutes}`
  const data = await withServerCache(cacheKey, 60_000, () =>
    airlabsRequest<AirLabsDelayedFlight[]>('delays', { delay: minimumMinutes, type })
  )

  const flights: DelayedFlightSummary[] = (data ?? []).map((f) => ({
    flightNumber: f.flight_iata ?? f.flight_icao ?? 'UNKNOWN',
    airportIata: (type === 'departures' ? f.dep_iata : f.arr_iata) ?? null,
    delayMinutes: (type === 'departures' ? f.dep_delayed : f.arr_delayed) ?? f.delayed ?? null,
    status: f.status ?? null,
  }))

  return { flights, isLive: true }
}
