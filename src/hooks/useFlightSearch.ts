'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Flight, FlightSearchResult } from '@/types/flight'

export type FlightTab = 'departure' | 'arrival' | 'connection'

interface SearchCriteria {
  query: string
  filter?: string
}

/** Debounced universal search (spec §17) — never fires on every keystroke. */
export function useAutocomplete(query: string, debounceMs = 300) {
  const [results, setResults] = useState<FlightSearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const trimmed = query.trim()
    if (!trimmed) {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    const timer = setTimeout(async () => {
      controllerRef.current?.abort()
      const controller = new AbortController()
      controllerRef.current = controller
      try {
        const res = await fetch(`/api/flights/search?q=${encodeURIComponent(trimmed)}`, { signal: controller.signal })
        const data = await res.json()
        setResults(data.results ?? [])
      } catch {
        // aborted or failed — leave previous results in place
      } finally {
        setLoading(false)
      }
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [query, debounceMs])

  return { results, loading }
}

function matchesQuery(flight: Flight, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [flight.airline.name, flight.flightNumber, flight.origin.iata, flight.destination.iata].some((v) => v?.toLowerCase().includes(q))
}

export function useFlightSearch(allFlights: Flight[]) {
  const [tab, setTab] = useState<FlightTab>('departure')
  const [search, setSearch] = useState<SearchCriteria | null>(null)
  const [error, setError] = useState(false)

  const visibleFlights = useMemo(() => {
    const items = allFlights.filter((f) => f.direction === tab)
    if (!search?.query) return items
    return items.filter((f) => matchesQuery(f, search.query))
  }, [allFlights, tab, search])

  const changeTab = (next: FlightTab) => {
    setTab(next)
    setSearch(null)
    setError(false)
  }

  const doSearch = (criteria: SearchCriteria) => {
    setError(false)
    if (criteria.filter === 'Departures') setTab('departure')
    if (criteria.filter === 'Arrivals') setTab('arrival')
    if (criteria.filter === 'Connections') setTab('connection')
    setSearch(criteria)
  }

  const clearSearch = () => {
    setSearch(null)
    setError(false)
  }

  return { tab, changeTab, search, loading: false, error, setError, visibleFlights, doSearch, clearSearch }
}
