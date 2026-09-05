'use client'

import { useCallback, useState } from 'react'

export type GeolocationStatus = 'idle' | 'requesting' | 'granted' | 'denied' | 'unavailable' | 'timeout'

interface GeolocationState {
  status: GeolocationStatus
  coords: { lat: number; lon: number; accuracy: number } | null
  error: string | null
}

/**
 * Location is opt-in only (spec §21) — nothing here runs until `request()` is called
 * from a user action, and basic flight tracking never depends on it.
 */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({ status: 'idle', coords: null, error: null })

  const request = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setState({ status: 'unavailable', coords: null, error: 'Geolocation is not supported on this device' })
      return
    }
    setState((s) => ({ ...s, status: 'requesting' }))
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          status: 'granted',
          coords: { lat: position.coords.latitude, lon: position.coords.longitude, accuracy: position.coords.accuracy },
          error: null,
        })
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setState({ status: 'denied', coords: null, error: 'Location permission denied' })
        } else if (err.code === err.TIMEOUT) {
          setState({ status: 'timeout', coords: null, error: 'Location request timed out' })
        } else {
          setState({ status: 'unavailable', coords: null, error: 'Location unavailable' })
        }
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60_000 }
    )
  }, [])

  return { ...state, request }
}
