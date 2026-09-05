'use client'

import { useCallback } from 'react'
import { useLivePolling } from './useLivePolling'
import type { AirportMeta, AirportService } from '@/types/airport'

/** Airport metadata (coordinates, timezone, terminals) changes rarely — spec §5 "hours or longer". */
export function useAirportMeta(iata: string) {
  const fetcher = useCallback(async () => {
    const res = await fetch(`/api/airports/${encodeURIComponent(iata)}`)
    if (!res.ok) throw new Error('Airport metadata unavailable')
    return res.json() as Promise<{ airport: AirportMeta }>
  }, [iata])

  const { data, ...rest } = useLivePolling(fetcher, { intervalMs: 6 * 60 * 60_000, staleAfterMs: 24 * 60 * 60_000 })
  return { airport: data?.airport ?? null, ...rest }
}

export function useAirportServices(iata: string) {
  const fetcher = useCallback(async () => {
    const res = await fetch(`/api/airports?services=${encodeURIComponent(iata)}`)
    if (!res.ok) throw new Error('Airport services unavailable')
    return res.json() as Promise<{ services: AirportService[] }>
  }, [iata])

  const { data, ...rest } = useLivePolling(fetcher, { intervalMs: 30 * 60_000, staleAfterMs: 60 * 60_000 })
  return { services: data?.services ?? [], ...rest }
}
