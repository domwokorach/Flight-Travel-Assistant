import React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CircleCheck, PlaneTakeoff, DoorOpen, Clock, ClockAlert, Timer, PlaneLanding, CircleX, Navigation2, CircleHelp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FlightStatus } from '@/types/flight'
import type { ComponentType } from 'react'

const styles: Record<FlightStatus, { bg: string; fg: string; icon: ComponentType<{ className?: string }> }> = {
  scheduled: { bg: 'bg-accent', fg: 'text-muted-foreground', icon: Clock },
  on_time: { bg: 'bg-emerald-400/10', fg: 'text-emerald-300', icon: CircleCheck },
  gate_open: { bg: 'bg-cyan-400/10', fg: 'text-cyan-300', icon: DoorOpen },
  boarding: { bg: 'bg-primary/15', fg: 'text-primary-light', icon: PlaneTakeoff },
  gate_closing: { bg: 'bg-warning-light', fg: 'text-warning-dark', icon: Timer },
  delayed: { bg: 'bg-orange-400/10', fg: 'text-orange-300', icon: ClockAlert },
  departed: { bg: 'bg-indigo-400/10', fg: 'text-indigo-300', icon: PlaneTakeoff },
  in_air: { bg: 'bg-indigo-400/10', fg: 'text-indigo-300', icon: Navigation2 },
  landed: { bg: 'bg-emerald-400/10', fg: 'text-emerald-300', icon: PlaneLanding },
  arrived: { bg: 'bg-emerald-400/10', fg: 'text-emerald-300', icon: PlaneLanding },
  cancelled: { bg: 'bg-error-light', fg: 'text-error-dark', icon: CircleX },
  diverted: { bg: 'bg-violet-400/10', fg: 'text-violet-300', icon: Navigation2 },
  unknown: { bg: 'bg-accent', fg: 'text-muted-foreground', icon: CircleHelp },
}

interface FlightStatusBadgeProps {
  status: FlightStatus
  label?: string
  pulse?: boolean
}

export default function FlightStatusBadge({ status, label, pulse = false }: FlightStatusBadgeProps) {
  const style = styles[status] || styles.unknown
  const Icon = style.icon
  const text = label ?? status

  return (
    <span className={cn('inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-bold', style.bg, style.fg)}>
      {pulse ? (
        <span className={cn('size-2 rounded-full motion-safe:animate-[status-pulse_1.6s_ease-in-out_infinite]', style.fg.replace('text-', 'bg-'))} />
      ) : (
        <Icon className="size-4" />
      )}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={text}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
