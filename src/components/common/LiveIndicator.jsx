import React, { useEffect, useState } from 'react'

const CONFIG = {
  live: { label: 'Live', dotClassName: 'bg-emerald-500', textClassName: 'text-emerald-600 dark:text-emerald-400', solid: true },
  reconnecting: { label: 'Reconnecting', dotClassName: 'bg-amber-500 animate-pulse', textClassName: 'text-amber-600 dark:text-amber-400', solid: true },
  stale: { label: 'Delayed Data', dotClassName: 'bg-amber-500', textClassName: 'text-amber-600 dark:text-amber-400', solid: true },
  offline: { label: 'Offline', dotClassName: 'bg-muted-foreground/50', textClassName: 'text-muted-foreground', solid: false },
}

function formatAgo(date) {
  if (!date) return null
  const seconds = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000))
  if (seconds < 5) return 'just now'
  if (seconds < 60) return `${seconds} sec ago`
  const minutes = Math.round(seconds / 60)
  return `${minutes} min ago`
}

/**
 * Compact live-status pill per spec §4. Never claims "Live" for cached data — the
 * `state` prop must reflect actual connection health, not just "we have some data".
 */
export function LiveIndicator({ state = 'offline', lastUpdated = null, className = '' }) {
  const [, forceTick] = useState(0)
  const cfg = CONFIG[state] ?? CONFIG.offline

  useEffect(() => {
    const timer = setInterval(() => forceTick((n) => n + 1), 5000)
    return () => clearInterval(timer)
  }, [])

  const ago = formatAgo(lastUpdated)

  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${cfg.textClassName} ${className}`}>
      <span className={`size-1.5 rounded-full ${cfg.solid ? cfg.dotClassName : `border border-current`}`} aria-hidden />
      {cfg.label}
      {ago && <span className="font-semibold text-muted-foreground">· Updated {ago}</span>}
    </span>
  )
}
