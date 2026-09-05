import React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle, PlaneTakeoff, DoorOpen, TriangleAlert, Clock, PlaneLanding, XCircle, ArrowLeftRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const styles = {
  'On Time': { bg: 'bg-emerald-400/10', fg: 'text-emerald-300', icon: CheckCircle },
  Boarding: { bg: 'bg-primary/15', fg: 'text-primary-light', icon: PlaneTakeoff },
  'Gate Open': { bg: 'bg-cyan-400/10', fg: 'text-cyan-300', icon: DoorOpen },
  'Gate Closing': { bg: 'bg-warning-light', fg: 'text-warning-dark', icon: TriangleAlert },
  Delayed: { bg: 'bg-orange-400/10', fg: 'text-orange-300', icon: Clock },
  Departed: { bg: 'bg-indigo-400/10', fg: 'text-indigo-300', icon: PlaneTakeoff },
  Arrived: { bg: 'bg-emerald-400/10', fg: 'text-emerald-300', icon: PlaneLanding },
  Cancelled: { bg: 'bg-error-light', fg: 'text-error-dark', icon: XCircle },
  'Gate Change': { bg: 'bg-violet-400/10', fg: 'text-violet-300', icon: ArrowLeftRight },
}

export default function FlightStatusBadge({ status, pulse = false }) {
  const style = styles[status] || { bg: 'bg-accent', fg: 'text-muted-foreground', icon: Clock }
  const Icon = style.icon
  return (
    <span className={cn('inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-bold', style.bg, style.fg)}>
      {pulse ? (
        <span className={cn('size-2 rounded-full motion-safe:animate-[status-pulse_1.6s_ease-in-out_infinite]', style.fg.replace('text-', 'bg-'))} />
      ) : (
        <Icon className="size-4" />
      )}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={status}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
        >
          {status}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
