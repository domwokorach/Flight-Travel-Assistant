import React from 'react'
import { DoorOpen, MapPin, Radar } from 'lucide-react'
import HeathrowStatusBadge from './HeathrowStatusBadge'
import AirlineLogo from '../AirlineLogo'
import { lhrTerminalOf } from './terminal'
import { cn } from '@/lib/utils'
import type { LegacyFlight } from '@/lib/adapters/legacyFlight'

interface HeathrowFlightCardProps {
  flight: LegacyFlight
  onTrack: (flightNumber: string) => void
}

export default function HeathrowFlightCard({ flight, onTrack }: HeathrowFlightCardProps) {
  const isDeparture = flight.type === 'departure'
  const scheduled = isDeparture ? flight.scheduledDeparture : flight.scheduledArrival
  const actual = isDeparture ? flight.actualDeparture : flight.actualArrival
  const changed = actual !== '—' && actual !== scheduled
  const terminal = lhrTerminalOf(flight.raw) ?? '—'
  const gate = isDeparture ? flight.from.gate : flight.to.gate

  return (
    <div className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-popover)] sm:grid-cols-[72px_auto_1fr_auto_auto] sm:p-4">
      {/* Scheduled time */}
      <div className="row-span-2 sm:row-span-1">
        <p className="font-heading text-xl font-extrabold tabular-nums text-foreground sm:text-2xl">{scheduled}</p>
        {changed && <p className="text-xs font-bold tabular-nums text-[var(--hrw-magenta)]">{actual}</p>}
      </div>

      {/* Airline + flight number */}
      <div className="row-span-2 flex items-center gap-2.5 sm:row-span-1">
        <AirlineLogo airlineName={flight.airline} airlineCode={flight.airlineMark} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-foreground">{flight.airline}</p>
          <p className="text-xs font-semibold text-muted-foreground">{flight.flightNumber}</p>
        </div>
      </div>

      {/* Route */}
      <div className="col-span-2 flex items-center gap-2 sm:col-span-1">
        <MapPin className="size-4 shrink-0 text-[var(--hrw-magenta)]" />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-foreground">
            {isDeparture ? `${flight.to.city}` : `${flight.from.city}`}
          </p>
          <p className="text-xs font-semibold text-muted-foreground">
            {isDeparture ? `LHR ${terminal} → ${flight.to.code}` : `${flight.from.code} → LHR ${terminal}`}
          </p>
        </div>
      </div>

      {/* Terminal / gate */}
      <div className="hidden items-center gap-4 sm:flex">
        <div>
          <p className="text-[10px] font-bold tracking-wide text-muted-foreground uppercase">Terminal</p>
          <p className="text-sm font-bold text-foreground">{terminal}</p>
        </div>
        <div className="flex items-center gap-1">
          <DoorOpen className="size-3.5 text-muted-foreground" />
          <div>
            <p className="text-[10px] font-bold tracking-wide text-muted-foreground uppercase">Gate</p>
            <p className="text-sm font-bold text-foreground">{gate}</p>
          </div>
        </div>
      </div>

      {/* Status + track */}
      <div className="col-span-3 flex items-center justify-between gap-2 sm:col-span-1 sm:flex-col sm:items-end sm:justify-center sm:gap-2">
        <HeathrowStatusBadge status={flight.status} />
        <button
          type="button"
          onClick={() => onTrack(flight.flightNumber)}
          className="inline-flex h-7 items-center gap-1.5 rounded-full bg-[var(--primary)] px-3 text-[11px] font-bold text-primary-foreground transition-transform hover:brightness-110 active:scale-95"
        >
          <Radar className="size-3.5" />
          Track
        </button>
      </div>

      {/* Mobile-only terminal/gate strip */}
      <div className={cn('col-span-3 flex items-center gap-4 border-t border-border-muted pt-3 sm:hidden')}>
        <div>
          <p className="text-[10px] font-bold tracking-wide text-muted-foreground uppercase">Terminal</p>
          <p className="text-sm font-bold text-foreground">{terminal}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-wide text-muted-foreground uppercase">Gate</p>
          <p className="text-sm font-bold text-foreground">{gate}</p>
        </div>
      </div>
    </div>
  )
}
