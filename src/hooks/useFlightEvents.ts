'use client'

import { useEffect, useRef } from 'react'
import type { Flight } from '@/types/flight'
import { isMeaningfulStatusChange } from '@/lib/flightMath'

export interface FlightEvent {
  type: 'status' | 'gate_change' | 'terminal_change' | 'delay' | 'cancelled'
  title: string
  description: string
}

/** Diffs successive snapshots of a followed flight and reports only meaningful, notification-worthy events. */
export function useFlightEvents(flight: Flight | null, onEvent: (event: FlightEvent) => void) {
  const previous = useRef<Flight | null>(null)

  useEffect(() => {
    if (!flight) return
    const prev = previous.current

    if (prev) {
      if (prev.origin.gate && flight.origin.gate && prev.origin.gate !== flight.origin.gate) {
        onEvent({
          type: 'gate_change',
          title: 'Gate Changed',
          description: `${flight.flightNumber}: ${prev.origin.gate} → ${flight.origin.gate}`,
        })
      }
      if (prev.origin.terminal && flight.origin.terminal && prev.origin.terminal !== flight.origin.terminal) {
        onEvent({
          type: 'terminal_change',
          title: 'Terminal Changed',
          description: `Terminal ${prev.origin.terminal} → Terminal ${flight.origin.terminal}`,
        })
      }
      if (flight.status === 'cancelled' && prev.status !== 'cancelled') {
        onEvent({ type: 'cancelled', title: 'Flight Cancelled', description: `${flight.flightNumber} · ${flight.origin.iata} → ${flight.destination.iata}` })
      } else if (isMeaningfulStatusChange(prev.status, flight.status)) {
        onEvent({ type: 'status', title: flight.statusText, description: `${flight.flightNumber} is now ${flight.statusText.toLowerCase()}` })
      }
      if ((flight.delayMinutes ?? 0) > (prev.delayMinutes ?? 0)) {
        onEvent({ type: 'delay', title: 'Delay Updated', description: `${flight.flightNumber}: ${flight.statusText}` })
      }
    }

    previous.current = flight
  }, [flight, onEvent])
}

export function useNotificationPermission() {
  const requestPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported' as const
    if (Notification.permission === 'granted') return 'granted' as const
    return Notification.requestPermission()
  }

  const notify = (title: string, body: string) => {
    if (typeof window === 'undefined' || !('Notification' in window)) return
    if (Notification.permission === 'granted') {
      new Notification(title, { body })
    }
  }

  return { requestPermission, notify }
}
