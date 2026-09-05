'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type ConnectionState = 'live' | 'reconnecting' | 'stale' | 'offline'

interface UseLivePollingOptions {
  intervalMs: number
  enabled?: boolean
  staleAfterMs?: number
  /** When set, the last successful payload is cached in localStorage under this key and
   *  used to hydrate `data` immediately on mount, so a reload while offline still shows
   *  last-known state instead of a blank skeleton (spec §40). */
  persistKey?: string
}

interface UseLivePollingResult<T> {
  data: T | null
  error: Error | null
  connectionState: ConnectionState
  lastUpdated: Date | null
  refresh: () => void
}

function readPersisted<T>(key: string): { value: T; savedAt: number } | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writePersisted<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify({ value, savedAt: Date.now() }))
  } catch {
    // storage unavailable (private mode, quota) — offline hydration just won't have data
  }
}

/**
 * Generic polling hook implementing the product's live-data rules:
 * - pauses while the tab is hidden, resumes (and refreshes immediately) when visible again
 * - pauses when `enabled` is false (flight cancelled / journey complete / user stopped following)
 * - reports connection health (live / reconnecting / stale / offline) instead of pretending
 *   cached data is live
 */
export function useLivePolling<T>(
  fetcher: () => Promise<T>,
  { intervalMs, enabled = true, staleAfterMs, persistKey }: UseLivePollingOptions
): UseLivePollingResult<T> {
  const [data, setData] = useState<T | null>(() => (persistKey && typeof window !== 'undefined' ? (readPersisted<T>(persistKey)?.value ?? null) : null))
  const [error, setError] = useState<Error | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  // Always starts 'reconnecting' regardless of environment: Node 21+ exposes a global
  // `navigator` without `.onLine`, which would make the SSR pass compute 'offline' while
  // the browser's real `navigator.onLine` computes 'reconnecting', mismatching hydration.
  // Real connectivity is checked after mount instead (see effect below).
  const [connectionState, setConnectionState] = useState<ConnectionState>('reconnecting')
  const consecutiveFailures = useRef(0)
  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  const load = useCallback(async () => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setConnectionState('offline')
      return
    }
    try {
      const result = await fetcherRef.current()
      setData(result)
      setError(null)
      setLastUpdated(new Date())
      consecutiveFailures.current = 0
      setConnectionState('live')
      if (persistKey) writePersisted(persistKey, result)
    } catch (err) {
      consecutiveFailures.current += 1
      setError(err instanceof Error ? err : new Error('Unknown error'))
      setConnectionState(consecutiveFailures.current >= 3 ? 'offline' : 'reconnecting')
    }
  }, [persistKey])

  useEffect(() => {
    if (!enabled) return
    load()
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') load()
    }, intervalMs)

    const onVisibility = () => {
      if (document.visibilityState === 'visible') load()
    }
    const onOnline = () => load()
    const onOffline = () => setConnectionState('offline')

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)

    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
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
