'use client'

import { useEffect, useState } from 'react'
import { formatLocalTime } from '@/lib/timezone'

/** Ticks a real IANA-timezone clock — never a fixed UTC offset, so DST resolves correctly. */
export function useLocalTime(timezone: string) {
  const [time, setTime] = useState(() => formatLocalTime(timezone))

  useEffect(() => {
    setTime(formatLocalTime(timezone))
    const timer = setInterval(() => setTime(formatLocalTime(timezone)), 1000)
    return () => clearInterval(timer)
  }, [timezone])

  return time
}
