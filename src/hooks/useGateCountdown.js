import { useEffect, useMemo, useState } from 'react'
import { formatCountdown, minutesRemaining } from '../lib/date'

function alertState(seconds) {
  const minutes = seconds / 60
  if (minutes <= 0) return { label: 'Gate closed', message: 'The gate closing time has passed.', tone: 'rose' }
  if (minutes <= 5) return { label: 'Urgent: proceed immediately', message: 'Go directly to the gate now.', tone: 'rose' }
  if (minutes <= 15) return { label: 'Gate Closing Soon', message: 'You have limited time to reach the gate.', tone: 'orange' }
  if (minutes <= 20) return { label: 'Boarding', message: 'Boarding is in progress.', tone: 'sky' }
  return { label: 'Gate announced', message: 'Your gate is confirmed.', tone: 'slate' }
}

export function useGateCountdown(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    const timer = setInterval(() => setSeconds(value => Math.max(0, value - 1)), 1000)
    return () => clearInterval(timer)
  }, [])

  const state = useMemo(() => alertState(seconds), [seconds])

  return {
    seconds,
    minutes: minutesRemaining(seconds),
    formatted: formatCountdown(seconds),
    ...state,
  }
}
