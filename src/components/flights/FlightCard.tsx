import React from 'react'
import { MoreVertical, CalendarPlus, Navigation, Share2, PlaneTakeoff, DoorOpen, MapPin, Clock, ChevronDown } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import FlightStatusBadge from './FlightStatusBadge'
import AirlineLogo from './AirlineLogo'
import SplitFlapText from '../board/SplitFlapText'
import { cn } from '@/lib/utils'
import { useSnackbar } from '@/lib/snackbar'
import type { LegacyFlight } from '@/lib/adapters/legacyFlight'

interface TimePairProps {
  label: string
  scheduled: string
  actual: string
}

function TimePair({ label, scheduled, actual }: TimePairProps) {
  const changed = actual && actual !== '—' && actual !== scheduled
  return (
    <div>
      <p className="text-[11px] font-bold text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-baseline gap-2">
        <SplitFlapText
          value={scheduled}
          className={cn('text-lg', changed ? 'text-muted-foreground line-through' : 'text-foreground')}
        />
        {changed && <SplitFlapText value={actual} className="text-lg text-warning-dark" />}
      </div>
    </div>
  )
}

type FlightCardFlight = LegacyFlight & { airlineLogo?: string | null }

interface FlightCardProps {
  flight: FlightCardFlight
  featured?: boolean
}

type FlightCardAction = 'calendar' | 'directions' | 'share'

export default function FlightCard({ flight, featured = false }: FlightCardProps) {
  const { notify } = useSnackbar()
  const [detailsOpen, setDetailsOpen] = React.useState(false)

  const handleAction = (action: FlightCardAction) => {
    if (action === 'calendar') notify(`${flight.flightNumber} added to calendar`, { severity: 'success' })
    if (action === 'directions') notify(`Directions to Gate ${flight.from.gate}`, { severity: 'info' })
    if (action === 'share') notify(`Link copied for ${flight.flightNumber}`, { severity: 'info' })
  }

  return (
    <Card className={cn('overflow-hidden p-0', featured && 'ring-2 ring-primary/25')}>
      {featured && (
        <div className="bg-primary px-5 py-2 text-xs font-bold tracking-[0.1em] text-primary-foreground uppercase">
          Your flight · Boarding now
        </div>
      )}
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <AirlineLogo airlineName={flight.airline} airlineCode={flight.airlineMark} logoUrl={flight.airlineLogo} />
            <div>
              <p className="text-sm font-bold">{flight.airline}</p>
              <p className="text-sm font-semibold text-muted-foreground">
                {flight.flightNumber} · {flight.airlineMark}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <FlightStatusBadge status={flight.status} label={flight.statusLabel} pulse={flight.status === 'boarding'} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Flight actions" className="size-11 rounded-xl">
                  <MoreVertical className="size-4.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => handleAction('calendar')}>
                  <CalendarPlus />
                  Add to calendar
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleAction('directions')}>
                  <Navigation />
                  Get directions
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleAction('share')}>
                  <Share2 />
                  Share flight
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl bg-board-bg">
          <div className="flex items-center justify-between gap-4 px-4 py-5 sm:px-6">
            <div>
              <SplitFlapText value={flight.from.code} className="text-4xl font-semibold text-board-text sm:text-[44px]" />
              <p className="mt-1 text-sm font-medium text-board-muted">{flight.from.city}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-px w-5 bg-white/15 sm:w-12" />
              <PlaneTakeoff className="size-5 text-primary-light" />
              <div className="h-px w-5 bg-white/15 sm:w-12" />
            </div>
            <div className="text-right">
              <SplitFlapText value={flight.to.code} className="justify-end text-4xl font-semibold text-board-text sm:text-[44px]" />
              <p className="mt-1 text-sm font-medium text-board-muted">{flight.to.city}</p>
            </div>
          </div>
        </div>

        {flight.status === 'cancelled' ? (
          <div className="mt-6 rounded-2xl border border-error/20 bg-error-light p-4 text-error-dark">
            <p className="text-sm font-extrabold">Flight Cancelled</p>
            <p className="mt-1 text-xs leading-relaxed font-semibold">{flight.raw?.disruption?.reason ?? 'Contact the operating airline for rebooking options.'}</p>
            {flight.raw?.disruption?.rebookingInfo && (
              <p className="mt-2 text-xs leading-relaxed font-semibold">{flight.raw.disruption.rebookingInfo}</p>
            )}
            {flight.raw?.disruption?.alternativeFlights && flight.raw.disruption.alternativeFlights.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {flight.raw.disruption.alternativeFlights.map((alt) => (
                  <span key={alt} className="rounded-full bg-white/60 px-3 py-1 text-[11px] font-bold">
                    {alt}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Primary tier — always visible on every breakpoint: Gate leads on mobile per priority order (status, gate, route, departure, boarding). */}
            <div className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-5 *:min-w-0 sm:grid-cols-4">
              <div className="flex gap-2">
                <MapPin className="mt-0.5 size-4.5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground">Gate</p>
                  <SplitFlapText value={flight.from.gate} className="mt-1 text-lg text-foreground" />
                </div>
              </div>
              <TimePair label="Departure" scheduled={flight.scheduledDeparture} actual={flight.actualDeparture} />
              <div>
                <p className="text-[11px] font-bold text-muted-foreground">Boarding</p>
                <SplitFlapText value={flight.boarding} className="mt-1 flex text-lg text-foreground" />
              </div>
              <TimePair label="Arrival" scheduled={flight.scheduledArrival} actual={flight.actualArrival} />
            </div>

            {/* Secondary tier — collapsed by default below md; always expanded on tablet/desktop. */}
            <button
              type="button"
              onClick={() => setDetailsOpen((v) => !v)}
              aria-expanded={detailsOpen}
              className="mt-4 flex w-full items-center justify-between text-xs font-bold text-muted-foreground md:hidden"
            >
              More details
              <ChevronDown className={cn('size-4 transition-transform', detailsOpen && 'rotate-180')} />
            </button>
            <div className={cn('mt-4 grid-cols-2 gap-4 *:min-w-0 sm:grid-cols-4 md:mt-5 md:grid', detailsOpen ? 'grid' : 'hidden')}>
              <div className="flex gap-2">
                <DoorOpen className="mt-0.5 size-4.5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground">Terminal</p>
                  <p className="mt-1 text-sm font-bold">{flight.from.terminal}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Clock className="mt-0.5 size-4.5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground">Duration</p>
                  <p className="mt-1 text-sm font-bold">{flight.duration}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Clock className="mt-0.5 size-4.5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground">Gate closes</p>
                  <SplitFlapText value={flight.gateCloses} className="mt-1 text-sm font-bold" />
                </div>
              </div>
              <div className="col-span-2 rounded-2xl bg-accent px-4 py-3 sm:col-span-1">
                <p className="text-[11px] font-bold text-muted-foreground">Update</p>
                <p className="mt-1 text-xs leading-relaxed font-semibold">{flight.note}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
