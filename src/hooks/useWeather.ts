'use client'

import { useCallback } from 'react'
import { useLivePolling } from './useLivePolling'
import type { WeatherSnapshot } from '@/types/weather'

/** Weather refreshes every 10 minutes — never at flight-status frequency (spec §15). */
export function useWeather(airportIatas: string[]) {
  const key = airportIatas.join(',')
  const fetcher = useCallback(async () => {
    const res = await fetch(`/api/weather?airports=${encodeURIComponent(key)}`)
    if (!res.ok) throw new Error('Weather unavailable')
    return res.json() as Promise<{ cities: WeatherSnapshot[]; fetchedAt: string }>
  }, [key])

  const { data, ...rest } = useLivePolling(fetcher, { intervalMs: 10 * 60_000, enabled: airportIatas.length > 0, staleAfterMs: 30 * 60_000 })
  return { cities: data?.cities ?? [], ...rest }
}
