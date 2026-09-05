'use client'

import { useCallback } from 'react'
import { useLivePolling } from './useLivePolling'
import type { AirportService } from '@/types/airport'

export function useAirportServices(iata: string) {
  const fetcher = useCallback(async () => {
    const res = await fetch(`/api/airports?services=${encodeURIComponent(iata)}`)
    if (!res.ok) throw new Error('Airport services unavailable')
    return res.json() as Promise<{ services: AirportService[] }>
  }, [iata])

  const { data, ...rest } = useLivePolling(fetcher, { intervalMs: 30 * 60_000, staleAfterMs: 60 * 60_000 })
  return { services: data?.services ?? [], ...rest }
}
