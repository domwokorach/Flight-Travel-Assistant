'use client'

import { useEffect, useState } from 'react'
import type { Flight } from '@/types/flight'
import { computeGateCountdown } from '@/lib/journey/gateCountdown'
import { formatCountdown, minutesRemaining } from '@/lib/date'

const TONE_MAP: Record<string, 'slate' | 'sky' | 'orange' | 'rose'> = {
  green: 'slate',
  blue: 'sky',
  orange: 'orange',
  rose: 'rose',
  neutral: 'slate',
}

const MESSAGE_MAP: Record<string, string> = {
  none: 'Your gate is confirmed.',
  announced: 'Your gate is confirmed.',
  boarding: 'Boarding is in progress.',
  closing_soon: 'You have limited time to reach the gate.',
  urgent: 'Go directly to the gate now.',
  closed: 'The gate closing time has passed.',
}

/** Drives the gate-closing countdown UI from a real flight's gate-closing/boarding timestamp, ticking every second. */
export function useLiveGateCountdown(flight: Flight | null) {
  const [, tick] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => tick((n) => n + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!flight) {
    return { seconds: 0, minutes: 0, formatted: '0:00', label: 'No flight followed', message: '', tone: 'slate' as const, escalation: 'none' }
  }
  const state = computeGateCountdown(flight)
  const deadline = flight.gateClosingTime ?? flight.boardingTime ?? flight.departure.estimated ?? flight.departure.scheduled
  const seconds = deadline ? Math.max(0, Math.round((new Date(deadline).getTime() - Date.now()) / 1000)) : 0
  return {
    seconds,
    minutes: minutesRemaining(seconds),
    formatted: formatCountdown(seconds),
    label: state.label,
    message: MESSAGE_MAP[state.escalation] ?? '',
    tone: TONE_MAP[state.tone] ?? 'slate',
    escalation: state.escalation,
  }
}
