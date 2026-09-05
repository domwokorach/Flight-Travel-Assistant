import React from 'react'
import { cn } from '@/lib/utils'

interface SplitFlapCharProps {
  value: string
  className?: string
}

/**
 * A single split-flap cell. Keying the inner span by `value` triggers a short
 * CSS fade/slide when the character changes; unchanged characters never
 * re-animate. Respects prefers-reduced-motion via the global CSS rule that
 * collapses animation/transition durations to ~0.
 */
export default function SplitFlapChar({ value, className }: SplitFlapCharProps) {
  const char = value === ' ' ? ' ' : value
  return (
    <span className={cn('relative inline-block w-[1ch] overflow-hidden text-center font-mono', className)}>
      <span key={char} className="block motion-safe:animate-[split-flap-in_0.2s_cubic-bezier(0.4,0,0.2,1)]">
        {char}
      </span>
    </span>
  )
}
