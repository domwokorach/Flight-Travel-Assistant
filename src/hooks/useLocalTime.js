import { useEffect, useState } from 'react'
import { formatClockFromOffset } from '../lib/date'

export function useLocalTime(offsetHours) {
  const [time, setTime] = useState(() => formatClockFromOffset(offsetHours))

  useEffect(() => {
    const timer = setInterval(() => setTime(formatClockFromOffset(offsetHours)), 1000)
    return () => clearInterval(timer)
  }, [offsetHours])

  return time
}
