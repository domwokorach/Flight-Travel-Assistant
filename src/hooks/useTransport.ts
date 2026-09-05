'use client'

import { useCallback } from 'react'
import { useLivePolling } from './useLivePolling'

export function useTransportOptions(airport: string, direction: 'to' | 'from') {
  const fetcher = useCallback(async () => {
    const res = await fetch(`/api/transport?airport=${encodeURIComponent(airport)}&direction=${direction}`)
    if (!res.ok) throw new Error('Transport options unavailable')
    return res.json()
  }, [airport, direction])

  const { data, ...rest } = useLivePolling(fetcher, { intervalMs: 60_000, staleAfterMs: 3 * 60_000 })
  return { options: data?.options ?? [], ...rest }
}
