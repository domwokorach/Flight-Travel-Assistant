'use client'

import { useEffect, useState } from 'react'
import type { AirlineSearchResult } from '@/types/airlineSearch'

const DEBOUNCE_MS = 400
const MIN_QUERY_LENGTH = 2

export type AirlineSearchStatus = 'idle' | 'loading' | 'success' | 'error'

/**
 * Debounced real-time airline search. Tracks `status` distinctly from `results` so the UI
 * can tell "still searching" apart from "genuinely no matches" — never show the empty state
 * until a request has actually completed (spec's Loading/Empty state requirements).
 */
export function useAirlineSearch(query: string) {
  const [results, setResults] = useState<AirlineSearchResult[]>([])
  const [isLive, setIsLive] = useState(false)
  const [status, setStatus] = useState<AirlineSearchStatus>('idle')

  useEffect(() => {
    const q = query.trim()
    if (q.length < MIN_QUERY_LENGTH) {
      setResults([])
      setStatus('idle')
      return
    }

    setStatus('loading')
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/airlines/search?q=${encodeURIComponent(q)}`, { signal: controller.signal })
        if (!res.ok) throw new Error('Airline search failed')
        const data: { results: AirlineSearchResult[]; isLive: boolean } = await res.json()
        setResults(data.results)
        setIsLive(data.isLive)
        setStatus('success')
      } catch {
        if (!controller.signal.aborted) setStatus('error')
      }
    }, DEBOUNCE_MS)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  return { results, isLive, status }
}
