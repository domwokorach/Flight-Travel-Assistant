import React from 'react'
import { cn } from '@/lib/utils'
import SplitFlapFlipChar from './SplitFlapFlipChar'

interface SplitFlapTextFlipProps {
  value: string | number | null | undefined
  className?: string
  charClassName?: string
  style?: React.CSSProperties
}

/**
 * Airport split-flap text rendered as individually tiled, mechanically
 * flipping cells (see SplitFlapFlipChar) — the bordered, boxed-letter look
 * of real departure-board hardware. Reserved for board moments where the
 * flip itself should read as a physical event (row values that change
 * live), as opposed to SplitFlapText's lighter fade for static labels.
 */
export default function SplitFlapTextFlip({ value, className, charClassName, style }: SplitFlapTextFlipProps) {
  const chars = String(value ?? '').toUpperCase().split('')
  return (
    <span
      role="text"
      aria-label={String(value ?? '')}
      style={style}
      className={cn('inline-flex gap-[2px] font-mono tabular-nums', className)}
    >
      <span aria-hidden="true" className="inline-flex gap-[2px]">
        {chars.map((ch, i) => (
          <SplitFlapFlipChar key={i} char={ch} className={charClassName} />
        ))}
      </span>
    </span>
  )
}
