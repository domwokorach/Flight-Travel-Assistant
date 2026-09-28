'use client'

import { useCallback } from 'react'
import { useLivePolling } from './useLivePolling'
import type { DelayedFlightSummary } from '@/types/reference'

/** Airport-wide delay digest (spec §7/§23) — low-priority reference data, so a 5min cadence. */
export function useDelays(minimumMinutes = 60, type: 'departures' | 'arrivals' = 'departures') {
  const fetcher = useCallback(async () => {
    const res = await fetch(`/api/flights/delays?minimum=${minimumMinutes}&type=${type}`)
    if (!res.ok) throw new Error('Delays unavailable')
    return res.json() as Promise<{ flights: DelayedFlightSummary[]; isLive: boolean }>
  }, [minimumMinutes, type])

  const { data, ...rest } = useLivePolling(fetcher, { intervalMs: 5 * 60_000, staleAfterMs: 15 * 60_000 })
  return { flights: data?.flights ?? [], isLive: data?.isLive ?? false, ...rest }
}
