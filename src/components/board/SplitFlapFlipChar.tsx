'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

interface SplitFlapFlipCharProps {
  /** Target character to display. Uppercased automatically. */
  char: string
  className?: string
  /** Total flip duration in ms. Split evenly between the two half-rotations. */
  durationMs?: number
}

function HalfFace({ char, half, className }: { char: string; half: 'top' | 'bottom'; className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <span
        className={cn(
          'absolute inset-x-0 flex justify-center font-mono leading-none',
          half === 'top' ? 'top-0 items-start' : 'bottom-0 items-end'
        )}
        style={{ height: '200%' }}
      >
        {char === ' ' ? ' ' : char}
      </span>
    </div>
  )
}

/**
 * A single mechanical split-flap cell. Flips authentically in two phases —
 * the upper leaf rotates down away from the viewer, then the lower leaf
 * rotates up into place — mirroring real airport departure-board hardware.
 * Only flips when `char` actually changes; settled characters never re-animate.
 */
export default function SplitFlapFlipChar({ char, className, durationMs = 210 }: SplitFlapFlipCharProps) {
  const target = char === ' ' ? ' ' : char.toUpperCase()
  const [display, setDisplay] = useState(target)
  const [flip, setFlip] = useState<{ from: string; to: string } | null>(null)
  const prefersReduced = useReducedMotion()
  const endTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const current = flip ? flip.to : display
    if (target === current) return

    if (prefersReduced) {
      setDisplay(target)
      setFlip(null)
      return
    }

    setFlip({ from: current, to: target })
    if (endTimeout.current) clearTimeout(endTimeout.current)
    endTimeout.current = setTimeout(() => {
      setDisplay(target)
      setFlip(null)
    }, durationMs)

    return () => {
      if (endTimeout.current) clearTimeout(endTimeout.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, durationMs, prefersReduced])

  const half = durationMs / 2 / 1000
  const shown = flip ? flip.to : display
  const outgoing = flip ? flip.from : display

  return (
    <span
      className={cn(
        'relative inline-block h-[1.3em] w-[0.8em] shrink-0 overflow-hidden rounded-[3px] bg-board-alt text-board-text',
        'border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]',
        className
      )}
    >
      <HalfFace char={shown} half="top" />
      <HalfFace char={outgoing} half="bottom" />

      <span className="pointer-events-none absolute inset-x-0 top-1/2 z-20 h-px -translate-y-1/2 bg-black/50" />

      {flip && (
        <>
          <motion.div
            className="absolute inset-x-0 top-0 z-10 h-1/2 [backface-visibility:hidden]"
            style={{ transformOrigin: 'bottom', transformStyle: 'preserve-3d' }}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -90 }}
            transition={{ duration: half, ease: [0.4, 0, 1, 1] }}
          >
            <HalfFace char={flip.from} half="top" className="bg-board-alt" />
          </motion.div>
          <motion.div
            className="absolute inset-x-0 bottom-0 z-10 h-1/2 [backface-visibility:hidden]"
            style={{ transformOrigin: 'top', transformStyle: 'preserve-3d' }}
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: half, ease: [0, 0, 0.2, 1], delay: half }}
          >
            <HalfFace char={flip.to} half="bottom" className="bg-board-alt" />
          </motion.div>
        </>
      )}
    </span>
  )
}
