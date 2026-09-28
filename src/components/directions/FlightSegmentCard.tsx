import React from 'react'
import { PlaneTakeoff } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Flight } from '@/types/flight'

function formatDuration(minutes: number | null): string {
  if (minutes == null) return 'Duration unknown'
  if (minutes < 60) return `${minutes} min`
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`
}

const STATUS_BADGE_VARIANT: Record<Flight['status'], 'default' | 'secondary' | 'success' | 'warning' | 'delay' | 'error' | 'info' | 'outline'> = {
  scheduled: 'secondary',
  on_time: 'success',
  gate_open: 'info',
  boarding: 'info',
  gate_closing: 'warning',
  delayed: 'delay',
  departed: 'secondary',
  in_air: 'info',
  landed: 'success',
  arrived: 'success',
  cancelled: 'error',
  diverted: 'warning',
  unknown: 'secondary',
}

/** Flight-leg card — every field here comes straight from the aviation provider, never inferred from Google data. */
export default function FlightSegmentCard({ flight }: { flight: Flight }) {
  return (
    <Card className="gap-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <PlaneTakeoff className="size-4 text-primary" />
          <p className="font-heading text-lg font-bold text-foreground">
            {flight.flightNumber} · {flight.airline.name}
          </p>
        </div>
        <Badge variant={STATUS_BADGE_VARIANT[flight.status]}>{flight.statusText}</Badge>
      </div>
      <p className="text-sm font-medium text-text-secondary">
        {flight.origin.iata} → {flight.destination.iata} · {formatDuration(flight.durationMinutes)}
      </p>
    </Card>
  )
}
