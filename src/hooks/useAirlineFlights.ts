'use client'

import { useCallback, useEffect, useState } from 'react'
import type { AirlineSearchFlight } from '@/types/airlineSearch'

interface AirlineFlightsState {
  flights: AirlineSearchFlight[]
  loading: boolean
  error: boolean
  fetched: boolean
}

/** Lazy per-airline flight hydration for a search result that wasn't eagerly enriched
 *  (see airlineSearchService's quota note) — call `load()` on selection, not on render. */
export function useAirlineFlights(airlineIata: string | null) {
  const [state, setState] = useState<AirlineFlightsState>({ flights: [], loading: false, error: false, fetched: false })

  const load = useCallback(async () => {
    if (!airlineIata) return
    setState((s) => ({ ...s, loading: true, error: false }))
    try {
      const res = await fetch(`/api/airlines/${encodeURIComponent(airlineIata)}/flights`)
      if (!res.ok) throw new Error('Airline flights unavailable')
      const data: { flights: AirlineSearchFlight[] } = await res.json()
      setState({ flights: data.flights, loading: false, error: false, fetched: true })
    } catch {
      setState({ flights: [], loading: false, error: true, fetched: true })
    }
  }, [airlineIata])

  useEffect(() => {
    setState({ flights: [], loading: false, error: false, fetched: false })
  }, [airlineIata])

  return { ...state, load }
}
