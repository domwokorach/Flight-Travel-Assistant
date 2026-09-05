import React from 'react'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'

const styles = {
  'On Time': 'border-transparent bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
  Boarding: 'border-transparent bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400',
  'Gate Open': 'border-transparent bg-cyan-50 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400',
  'Gate Closing': 'border-transparent bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400',
  Delayed: 'border-transparent bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400',
  Departed: 'border-transparent bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400',
  Arrived: 'border-transparent bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
  Cancelled: 'border-transparent bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400',
  'Gate Change': 'border-transparent bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400',
}

export default function FlightStatusBadge({ status, pulse = false }) {
  return (
    <Badge className={cn('h-auto rounded-full px-3 py-1.5 text-xs font-bold', styles[status] || 'border-border bg-muted text-muted-foreground')}>
      {pulse && <span className="h-1.5 w-1.5 rounded-full bg-current motion-safe:animate-pulse" />}
      {status}
    </Badge>
  )
}
