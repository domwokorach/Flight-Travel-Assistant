import React from 'react'
import { Clock } from 'lucide-react'
import { useLocalTime } from '@/hooks/useLocalTime'

interface LocalTimeCardProps {
  timezone: string
  offsetLabel?: string
}

export default function LocalTimeCard({ timezone, offsetLabel }: LocalTimeCardProps) {
  const time = useLocalTime(timezone)
  return (
    <div className="rounded-2xl bg-board-bg p-4 text-board-text">
      <div className="flex items-center gap-1.5 opacity-70">
        <Clock className="size-4" />
        <p className="text-[11px] font-bold tracking-[0.06em] uppercase">Local time</p>
      </div>
      <p className="mt-1 font-mono text-2xl font-extrabold tabular-nums">{time}</p>
      <p className="mt-0.5 text-xs font-semibold opacity-70">{offsetLabel}</p>
    </div>
  )
}
