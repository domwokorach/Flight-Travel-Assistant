'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type ConnectionState = 'live' | 'reconnecting' | 'stale' | 'offline'

interface UseLivePollingOptions {
  intervalMs: number
  enabled?: boolean
  staleAfterMs?: number
}

interface UseLivePollingResult<T> {
  data: T | null
  error: Error | null
  connectionState: ConnectionState
  lastUpdated: Date | null
  refresh: () => void
}

/**
 * Generic polling hook implementing the product's live-data rules:
 * - pauses while the tab is hidden, resumes (and refreshes immediately) when visible again
 * - pauses when `enabled` is false (flight cancelled / journey complete / user stopped following)
 * - reports connection health (live / reconnecting / stale / offline) instead of pretending
 *   cached data is live
 */
export function useLivePolling<T>(fetcher: () => Promise<T>, { intervalMs, enabled = true, staleAfterMs }: UseLivePollingOptions): UseLivePollingResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [connectionState, setConnectionState] = useState<ConnectionState>('reconnecting')
  const consecutiveFailures = useRef(0)
  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  const load = useCallback(async () => {
    try {
      const result = await fetcherRef.current()
      setData(result)
      setError(null)
      setLastUpdated(new Date())
      consecutiveFailures.current = 0
      setConnectionState('live')
    } catch (err) {
      consecutiveFailures.current += 1
      setError(err instanceof Error ? err : new Error('Unknown error'))
      setConnectionState(consecutiveFailures.current >= 3 ? 'offline' : 'reconnecting')
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    load()
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') load()
    }, intervalMs)

    const onVisibility = () => {
      if (document.visibilityState === 'visible') load()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [enabled, intervalMs, load])

  useEffect(() => {
    if (!staleAfterMs || !lastUpdated) return
    const timer = setInterval(() => {
      if (Date.now() - lastUpdated.getTime() > staleAfterMs) {
        setConnectionState((prev) => (prev === 'live' ? 'stale' : prev))
      }
    }, 5000)
    return () => clearInterval(timer)
  }, [lastUpdated, staleAfterMs])

  return { data, error, connectionState: enabled ? connectionState : 'offline', lastUpdated, refresh: load }
}
