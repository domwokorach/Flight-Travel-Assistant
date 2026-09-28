'use client'

import { useCallback, useEffect, useState } from 'react'
import type { NearbyAirport } from '@/types/airport'
import { useGeolocation } from './useGeolocation'

interface NearbyState {
  airports: NearbyAirport[]
  isLive: boolean
  loading: boolean
  error: string | null
}

/**
 * "Nearest airport from my location" (spec §10) — built on the existing opt-in
 * useGeolocation hook; nothing fetches until `request()` is called from a user action.
 */
export function useNearbyAirports() {
  const geo = useGeolocation()
  const [state, setState] = useState<NearbyState>({ airports: [], isLive: false, loading: false, error: null })

  const fetchNearby = useCallback(async (lat: number, lon: number) => {
    setState((s) => ({ ...s, loading: true, error: null }))
    try {
      const res = await fetch(`/api/airports/nearby?lat=${lat}&lng=${lon}`)
      if (!res.ok) throw new Error('Nearby airports unavailable')
      const data: { airports: NearbyAirport[]; isLive: boolean } = await res.json()
      setState({ airports: data.airports, isLive: data.isLive, loading: false, error: null })
    } catch {
      setState({ airports: [], isLive: false, loading: false, error: 'Nearby airports unavailable' })
    }
  }, [])

  useEffect(() => {
    if (geo.status === 'granted' && geo.coords) {
      fetchNearby(geo.coords.lat, geo.coords.lon)
    }
  }, [geo.status, geo.coords, fetchNearby])

  return { ...state, geoStatus: geo.status, requestLocation: geo.request }
}
