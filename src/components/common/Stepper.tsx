import React, { type ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export type StepStatus = 'upcoming' | 'current' | 'done' | 'attention'

/**
 * Small shared visual primitives for the two flow-diagram components
 * (JourneyTimeline, ConnectionCard) that used MUI's Stepper for very
 * different content shapes. Kept minimal on purpose: a status-aware
 * marker circle and a connecting line, each orientation-responsive.
 */
export interface StepDotProps {
  status?: StepStatus
  children?: ReactNode
  className?: string
}

export function StepDot({ status = 'upcoming', children, className }: StepDotProps) {
  return (
    <motion.div
      key={status}
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'grid size-8 shrink-0 place-items-center rounded-full border-2 text-xs font-extrabold transition-colors duration-300',
        status === 'done' && 'border-success bg-success text-white',
        status === 'current' &&
          'border-primary bg-primary text-white motion-safe:animate-[journey-pulse_1.8s_ease-out_infinite]',
        status === 'upcoming' && 'border-border bg-card text-muted-foreground',
        status === 'attention' && 'border-warning bg-warning text-white',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export interface StepLineProps {
  status?: StepStatus
  orientation?: 'horizontal' | 'vertical'
}

export function StepLine({ status = 'upcoming', orientation = 'horizontal' }: StepLineProps) {
  return (
    <div
      className={cn(
        'shrink-0 transition-colors duration-300',
        orientation === 'horizontal' ? 'h-0.5 flex-1' : 'w-0.5 flex-1 min-h-6',
        status === 'done' ? 'bg-success' : 'bg-border'
      )}
    />
  )
}
