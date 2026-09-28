import React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CircleCheck, PlaneTakeoff, DoorOpen, Clock, ClockAlert, Timer, PlaneLanding, CircleX, Navigation2, CircleHelp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FlightStatus } from '@/types/flight'
import type { ComponentType } from 'react'

// Monochrome by default. Colour is reserved for states with real operational meaning:
// green = on time / arrived, blue = boarding / active, amber = gate closing / attention,
// orange = delay, red = cancellation.
const styles: Record<FlightStatus, { bg: string; fg: string; icon: ComponentType<{ className?: string }> }> = {
  scheduled: { bg: 'bg-accent', fg: 'text-muted-foreground', icon: Clock },
  on_time: { bg: 'bg-success-light', fg: 'text-success-dark', icon: CircleCheck },
  gate_open: { bg: 'bg-info-light', fg: 'text-info-dark', icon: DoorOpen },
  boarding: { bg: 'bg-info-light', fg: 'text-info-dark', icon: PlaneTakeoff },
  gate_closing: { bg: 'bg-warning-light', fg: 'text-warning-dark', icon: Timer },
  delayed: { bg: 'bg-delay-light', fg: 'text-delay-dark', icon: ClockAlert },
  departed: { bg: 'bg-accent', fg: 'text-foreground', icon: PlaneTakeoff },
  in_air: { bg: 'bg-accent', fg: 'text-foreground', icon: Navigation2 },
  landed: { bg: 'bg-success-light', fg: 'text-success-dark', icon: PlaneLanding },
  arrived: { bg: 'bg-success-light', fg: 'text-success-dark', icon: PlaneLanding },
  cancelled: { bg: 'bg-error-light', fg: 'text-error-dark', icon: CircleX },
  diverted: { bg: 'bg-warning-light', fg: 'text-warning-dark', icon: Navigation2 },
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
