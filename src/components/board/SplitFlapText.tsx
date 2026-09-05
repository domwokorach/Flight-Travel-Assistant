import React from 'react'
import { cn } from '@/lib/utils'
import SplitFlapChar from './SplitFlapChar'

interface SplitFlapTextProps {
  value: string | number | null | undefined
  className?: string
  charClassName?: string
  style?: React.CSSProperties
}

/**
 * Airport split-flap display text. Uppercase, monospaced, tabular — reserved
 * for board moments (flight numbers, airport codes, times, gates, status),
 * never for body copy.
 */
export default function SplitFlapText({ value, className, charClassName, style }: SplitFlapTextProps) {
  const chars = String(value ?? '').toUpperCase().split('')
  return (
    <span role="text" aria-label={String(value ?? '')} style={style} className={cn('inline-flex font-mono tabular-nums', className)}>
      <span aria-hidden="true" className="inline-flex">
        {chars.map((ch, i) => (
          <SplitFlapChar key={i} value={ch} className={charClassName} />
        ))}
      </span>
    </span>
  )
}
