'use client'

import { useCallback, useState } from 'react'
import { useLivePolling } from './useLivePolling'
import type { ConnectionJourney, Flight } from '@/types/flight'
import { minutesUntil } from '@/lib/flightMath'

interface BoardResponse {
  flights: Flight[]
  isLive: boolean
  fetchedAt: string
}

async function fetchBoard(path: string, airport: string): Promise<BoardResponse> {
  const res = await fetch(`${path}?airport=${encodeURIComponent(airport)}`)
  if (!res.ok) throw new Error(`Failed to load ${path}`)
  return res.json()
}

/** Active boards refresh every 30s per spec §5; adjust with `intervalMs` for a followed flight closer to departure. */
export function useDepartures(airport: string, intervalMs = 30_000) {
  const fetcher = useCallback(() => fetchBoard('/api/flights/departures', airport), [airport])
  const { data, ...rest } = useLivePolling(fetcher, { intervalMs, staleAfterMs: intervalMs * 3 })
  return { flights: data?.flights ?? [], isLive: data?.isLive ?? false, ...rest }
}

export function useArrivals(airport: string, intervalMs = 30_000) {
  const fetcher = useCallback(() => fetchBoard('/api/flights/arrivals', airport), [airport])
  const { data, ...rest } = useLivePolling(fetcher, { intervalMs, staleAfterMs: intervalMs * 3 })
  return { flights: data?.flights ?? [], isLive: data?.isLive ?? false, ...rest }
}

/**
 * Tracks a single flight by number, with the refresh cadence spec §5 recommends:
 * 15–30s once boarding/near-departure, 1–5min while still hours away.
 */
export function useFlightTracking(flightNumber: string | null, enabled = true) {
  const fetcher = useCallback(async () => {
    const res = await fetch(`/api/flights/${encodeURIComponent(flightNumber ?? '')}`)
    if (!res.ok) throw new Error('Flight not found')
    return res.json() as Promise<{ flight: Flight; isLive: boolean; fetchedAt: string }>
  }, [flightNumber])

  const [intervalMs, setIntervalMs] = useState(20_000)

  const wrappedFetcher = useCallback(async () => {
    const result = await fetcher()
    const departureTarget = result.flight.departure.estimated ?? result.flight.departure.scheduled
    const minutesAway = minutesUntil(departureTarget)
    const isActive = result.flight.status === 'boarding' || result.flight.status === 'gate_open' || (minutesAway !== null && minutesAway <= 90)
    setIntervalMs(isActive ? 20_000 : 120_000)
    return result
  }, [fetcher])

  const { data, ...rest } = useLivePolling(wrappedFetcher, {
    intervalMs,
    enabled: Boolean(flightNumber) && enabled,
    staleAfterMs: intervalMs * 4,
    persistKey: flightNumber ? `flight-journey:${flightNumber}` : undefined,
  })

  return { flight: data?.flight ?? null, isLive: data?.isLive ?? false, ...rest }
}

export function useConnectionJourney(arrivalFlightNumber: string, departureFlightNumber: string, intervalMs = 30_000) {
  const fetcher = useCallback(async () => {
    const res = await fetch(`/api/flights/connection?arrival=${encodeURIComponent(arrivalFlightNumber)}&departure=${encodeURIComponent(departureFlightNumber)}`)
    if (!res.ok) throw new Error('Connection unavailable')
    return res.json() as Promise<{ journey: ConnectionJourney; isLive: boolean; fetchedAt: string }>
  }, [arrivalFlightNumber, departureFlightNumber])

  const { data, ...rest } = useLivePolling(fetcher, { intervalMs, staleAfterMs: intervalMs * 3 })
  return { journey: data?.journey ?? null, isLive: data?.isLive ?? false, ...rest }
}
