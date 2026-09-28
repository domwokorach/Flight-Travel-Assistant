import React from 'react'
import {
  CircleCheck,
  DoorOpen,
  Lock,
  ClockAlert,
  PlaneTakeoff,
  PlaneLanding,
  Navigation2,
  CircleX,
  CircleHelp,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FlightStatus } from '@/types/flight'

/** The exact vocabulary requested for the Heathrow-style board: ON TIME, BOARDING, GATE OPEN,
 *  GATE CLOSED, DELAYED, DEPARTED, LANDED, CANCELLED — plus IN AIR / DIVERTED, which the
 *  provider data can genuinely report and shouldn't be swallowed into a wrong neighbour. */
const STATUS_MAP: Record<FlightStatus, { label: string; tone: string; icon: LucideIcon; pulse?: boolean }> = {
  scheduled: { label: 'ON TIME', tone: 'success', icon: CircleCheck },
  on_time: { label: 'ON TIME', tone: 'success', icon: CircleCheck },
  gate_open: { label: 'GATE OPEN', tone: 'info', icon: DoorOpen, pulse: true },
  boarding: { label: 'BOARDING', tone: 'magenta', icon: PlaneTakeoff, pulse: true },
  gate_closing: { label: 'GATE CLOSED', tone: 'warning', icon: Lock },
  delayed: { label: 'DELAYED', tone: 'delay', icon: ClockAlert },
  departed: { label: 'DEPARTED', tone: 'neutral', icon: PlaneTakeoff },
  in_air: { label: 'IN AIR', tone: 'neutral', icon: Navigation2, pulse: true },
  landed: { label: 'LANDED', tone: 'success', icon: PlaneLanding },
  arrived: { label: 'LANDED', tone: 'success', icon: PlaneLanding },
  cancelled: { label: 'CANCELLED', tone: 'error', icon: CircleX },
  diverted: { label: 'DIVERTED', tone: 'warning', icon: Navigation2 },
  unknown: { label: 'ON TIME', tone: 'neutral', icon: CircleHelp },
}

const TONE_CLASSES: Record<string, string> = {
  success: 'bg-success-light text-success-dark',
  info: 'bg-info-light text-info-dark',
  warning: 'bg-warning-light text-warning-dark',
  delay: 'bg-delay-light text-delay-dark',
  error: 'bg-error-light text-error-dark',
  magenta: 'bg-[var(--hrw-magenta-light)] text-[var(--hrw-magenta-dark)]',
  neutral: 'bg-muted text-muted-foreground',
}

interface HeathrowStatusBadgeProps {
  status: FlightStatus
  className?: string
}

export default function HeathrowStatusBadge({ status, className }: HeathrowStatusBadgeProps) {
  const entry = STATUS_MAP[status] ?? STATUS_MAP.unknown
  const Icon = entry.icon
  return (
    <span
      className={cn(
        'inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-extrabold tracking-wide',
        TONE_CLASSES[entry.tone],
        className
      )}
    >
      {entry.pulse ? (
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full rounded-full bg-current motion-safe:animate-[hrw-pulse_1.6s_ease-in-out_infinite]" />
          <span className="relative inline-flex size-2 rounded-full bg-current" />
        </span>
      ) : (
        <Icon className="size-3.5" />
      )}
      {entry.label}
    </span>
  )
}
