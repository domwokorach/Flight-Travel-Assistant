import React from 'react'
import { Clock3 } from 'lucide-react'
import { useLocalTime } from '../../hooks/useLocalTime'

export default function LocalTimeCard({ offsetHours, offsetLabel }) {
  const time = useLocalTime(offsetHours)
  return (
    <div className="rounded-2xl bg-foreground p-4 text-background">
      <div className="flex items-center gap-2 opacity-70"><Clock3 className="h-4 w-4"/><span className="text-xs font-bold uppercase tracking-wide">Local time</span></div>
      <div className="mt-2 text-3xl font-black tracking-tight tabular-nums">{time}</div>
      <div className="mt-1 text-xs font-semibold opacity-70">{offsetLabel}</div>
    </div>
  )
}
