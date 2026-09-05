import React from 'react'
import { motion } from 'motion/react'
import { ArrowRight, TriangleAlert, Plane, Clock, Footprints, Timer } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import FlightStatusBadge from './FlightStatusBadge'
import AirlineLogo from './AirlineLogo'
import SplitFlapText from '../board/SplitFlapText'
import { toLegacyFlight } from '@/lib/adapters/legacyFlight'
import type { LegacyFlight } from '@/lib/adapters/legacyFlight'
import type { ConnectionJourney, ConnectionUrgency } from '@/types/flight'

const urgencyStyles: Record<ConnectionUrgency, string> = {
  plenty: 'bg-success-light text-success-dark border-success/25',
  limited: 'bg-warning-light text-warning-dark border-warning/25',
  urgent: 'bg-error-light text-error-dark border-error/25',
  missed: 'bg-error-light text-error-dark border-error/25',
  unknown: 'bg-accent text-muted-foreground border-border',
}

interface FlightLegProps {
  eyebrow: string
  flight: LegacyFlight
  arriveOrDepartLabel: 'Arrival' | 'Departure'
  timeLabel: string
}

function FlightLeg({ eyebrow, flight, arriveOrDepartLabel, timeLabel }: FlightLegProps) {
  return (
    <div className="rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AirlineLogo size="sm" airlineName={flight.airline} airlineCode={flight.airlineMark} />
          <div>
            <p className="text-[11px] font-bold tracking-[0.1em] text-muted-foreground uppercase">{eyebrow}</p>
            <p className="text-sm font-extrabold">
              {flight.flightNumber} · {flight.airline}
            </p>
          </div>
        </div>
        <FlightStatusBadge status={flight.status} label={flight.statusLabel} />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div>
          <SplitFlapText value={flight.from.code} className="text-2xl" />
          <p className="text-xs font-semibold text-muted-foreground">{flight.from.city}</p>
        </div>
        <Plane className="size-5 rotate-90 text-primary" />
        <div className="text-right">
          <SplitFlapText value={flight.to.code} className="justify-end text-2xl" />
          <p className="text-xs font-semibold text-muted-foreground">{flight.to.city}</p>
        </div>
      </div>
      <p className="mt-4 text-[13px] font-semibold text-muted-foreground">
        {arriveOrDepartLabel}: Terminal {arriveOrDepartLabel === 'Arrival' ? flight.to.terminal : flight.from.terminal} · {timeLabel}
      </p>
    </div>
  )
}

function formatMinutes(minutes: number | null | undefined): string {
  if (minutes === null || minutes === undefined) return '—'
  const h = Math.floor(Math.abs(minutes) / 60)
  const m = Math.abs(minutes) % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

interface ConnectionCardProps {
  journey: ConnectionJourney
}

export default function ConnectionCard({ journey }: ConnectionCardProps) {
  const [arrivalRaw, departureRaw] = journey.legs
  const arrival = toLegacyFlight(arrivalRaw)
  const departure = toLegacyFlight(departureRaw)
  const urgency = urgencyStyles[journey.urgency] || urgencyStyles.unknown
  const connectionAirport = departure.from.code

  return (
    <Card className="overflow-hidden p-0">
      <div className={cn('flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4', urgency)}>
        <div className="flex items-center gap-2">
          <TriangleAlert className="size-4.5" />
          <p className="font-extrabold">{journey.statusText}</p>
        </div>
        <p className="text-sm font-bold">Layover {formatMinutes(journey.scheduledConnectionMinutes)}</p>
      </div>

      <div className="p-5 sm:p-6">
        <div className="mb-6 flex items-center gap-3 overflow-hidden rounded-2xl bg-board-bg px-4 py-3">
          {[arrival.from.code, connectionAirport, departure.to.code].map((code, i) => (
            <React.Fragment key={`${code}-${i}`}>
              {i > 0 && <ArrowRight className="size-4 text-white/30" />}
              <SplitFlapText value={code} className="text-[22px] text-board-text sm:text-[26px]" />
            </React.Fragment>
          ))}
        </div>

        {journey.terminalChanged && (
          <div className="mb-4 rounded-2xl border border-warning/25 bg-warning-light p-3.5 text-warning-dark">
            <p className="text-sm font-extrabold">Terminal Changed</p>
            <p className="text-xs font-semibold">
              Arrival Terminal {arrival.to.terminal} → Departure Terminal {departure.from.terminal}. Connection feasibility has been recalculated.
            </p>
          </div>
        )}

        <div className="mb-6 flex flex-col gap-0 md:flex-row md:items-stretch md:gap-0">
          <div className="md:flex-1">
            <FlightLeg eyebrow="Current flight" flight={arrival} arriveOrDepartLabel="Arrival" timeLabel={`Arrive ${arrival.scheduledArrival}`} />
          </div>

          <div className="relative flex items-center justify-center py-3 md:w-16 md:py-0">
            <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-border md:block" />
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-extrabold text-primary-foreground"
            >
              {connectionAirport}
            </motion.div>
          </div>
          <p className="-mt-4 mb-2 text-center text-xs font-semibold text-muted-foreground md:hidden">Connection at {connectionAirport}</p>

          <div className="md:flex-1">
            <FlightLeg eyebrow="Connecting flight" flight={departure} arriveOrDepartLabel="Departure" timeLabel={`Depart ${departure.scheduledDeparture}`} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 *:min-w-0">
          <div className="rounded-2xl bg-accent p-3.5">
            <Clock className="size-4.5 text-muted-foreground" />
            <p className="mt-2 text-[11px] font-bold text-muted-foreground uppercase">Effective time</p>
            <p className="text-sm font-bold">{formatMinutes(journey.effectiveConnectionMinutes)}</p>
          </div>
          <div className="rounded-2xl bg-accent p-3.5">
            <Footprints className="size-4.5 text-muted-foreground" />
            <p className="mt-2 text-[11px] font-bold text-muted-foreground uppercase">Gate transit</p>
            <p className="text-sm font-bold">{journey.walkMinutes} min</p>
          </div>
          <div className="rounded-2xl bg-accent p-3.5">
            <Timer className="size-4.5 text-muted-foreground" />
            <p className="mt-2 text-[11px] font-bold text-muted-foreground uppercase">Boarding</p>
            <SplitFlapText value={departure.boarding} className="mt-0.5 text-sm font-bold" />
          </div>
          <div className="rounded-2xl border border-warning/20 bg-warning-light p-3.5">
            <TriangleAlert className="size-4.5 text-warning-dark" />
            <p className="mt-2 text-[11px] font-bold text-warning-dark uppercase">Gate closes</p>
            <SplitFlapText value={departure.gateCloses} className="mt-0.5 text-sm font-bold text-warning-dark" />
          </div>
        </div>

        <Button className="mt-6 w-full sm:w-auto">Show connection route</Button>
      </div>
    </Card>
  )
}
