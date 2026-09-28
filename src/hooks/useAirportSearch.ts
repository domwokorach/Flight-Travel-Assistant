'use client'

import { useEffect, useState } from 'react'
import type { AirportSuggestion } from '@/types/airport'

const DEBOUNCE_MS = 300

/** Debounced live airport/city/airline autocomplete (spec §11) against /api/search/suggest. */
export function useAirportSearch(query: string) {
  const [results, setResults] = useState<AirportSuggestion[]>([])
  const [isLive, setIsLive] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const q = query.trim()
    if (!q) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search/suggest?q=${encodeURIComponent(q)}`, { signal: controller.signal })
        if (!res.ok) throw new Error('Search failed')
        const data: { results: AirportSuggestion[]; isLive: boolean } = await res.json()
        setResults(data.results)
        setIsLive(data.isLive)
      } catch {
        if (!controller.signal.aborted) setResults([])
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }, DEBOUNCE_MS)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  return { results, isLive, loading }
}
