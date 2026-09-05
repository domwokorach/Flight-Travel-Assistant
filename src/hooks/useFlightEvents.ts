'use client'

import { useEffect, useRef } from 'react'
import type { Flight } from '@/types/flight'
import { diffFlightTransitions, type FlightTransition } from '@/lib/flightDiff'

export type FlightEvent = FlightTransition

/** Diffs successive snapshots of a followed flight and reports only meaningful, notification-worthy events. */
export function useFlightEvents(flight: Flight | null, onEvent: (event: FlightEvent) => void) {
  const previous = useRef<Flight | null>(null)

  useEffect(() => {
    if (!flight) return
    for (const transition of diffFlightTransitions(previous.current, flight)) onEvent(transition)
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
