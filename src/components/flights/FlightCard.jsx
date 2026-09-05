import React from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { CalendarPlus, Clock3, DoorOpen, EllipsisVertical, MapPin, Navigation, PlaneTakeoff, Share2 } from 'lucide-react'
import FlightStatusBadge from './FlightStatusBadge'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { fadeInUp, smooth } from '@/lib/motion'

function TimePair({ label, scheduled, actual }) {
  const changed = actual && actual !== '—' && actual !== scheduled
  return (
    <div>
      <div className="metric-label">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className={`text-lg font-black ${changed ? 'text-muted-foreground line-through decoration-muted-foreground/50' : 'text-foreground'}`}>{scheduled}</span>
        {changed && <span className="text-lg font-black text-amber-600 dark:text-amber-400">{actual}</span>}
      </div>
    </div>
  )
}

export default function FlightCard({ flight, featured = false }) {
  return (
    <motion.div layout variants={fadeInUp} initial="hidden" animate="show" exit="hidden" transition={smooth}>
      <Card className={featured ? 'ring-2 ring-primary/30' : ''}>
        {featured && <div className="bg-primary px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground">Your flight · Boarding now</div>}
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-foreground text-sm font-black tracking-tight text-background">{flight.airlineMark}</div>
              <div><p className="text-sm font-bold text-foreground">{flight.airline}</p><p className="text-sm font-semibold text-muted-foreground">{flight.flightNumber}</p></div>
            </div>
            <div className="flex items-center gap-1.5">
              <FlightStatusBadge status={flight.status} pulse={flight.status === 'Boarding'} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm" aria-label="Flight actions">
                    <EllipsisVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => toast.success(`${flight.flightNumber} added to calendar`)}>
                    <CalendarPlus className="h-4 w-4" /> Add to calendar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast(`Directions to Gate ${flight.from.gate}`, { icon: <Navigation className="h-4 w-4" /> })}>
                    <Navigation className="h-4 w-4" /> Get directions
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast(`Link copied for ${flight.flightNumber}`, { icon: <Share2 className="h-4 w-4" /> })}>
                    <Share2 className="h-4 w-4" /> Share flight
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
            <div><p className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">{flight.from.code}</p><p className="mt-1 text-sm font-semibold text-muted-foreground">{flight.from.city}</p></div>
            <div className="flex items-center gap-2 text-border"><div className="h-px w-5 bg-border sm:w-12"/><PlaneTakeoff className="h-5 w-5 text-primary"/><div className="h-px w-5 bg-border sm:w-12"/></div>
            <div className="text-right"><p className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">{flight.to.code}</p><p className="mt-1 text-sm font-semibold text-muted-foreground">{flight.to.city}</p></div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-5 sm:grid-cols-4">
            <TimePair label="Departure" scheduled={flight.scheduledDeparture} actual={flight.actualDeparture} />
            <div><div className="metric-label">Boarding</div><div className="mt-1 text-lg font-black text-foreground">{flight.boarding}</div></div>
            <TimePair label="Arrival" scheduled={flight.scheduledArrival} actual={flight.actualArrival} />
            <div><div className="metric-label">Duration</div><div className="mt-1 text-lg font-black text-foreground">{flight.duration}</div></div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex gap-2"><DoorOpen className="mt-0.5 h-4 w-4 text-muted-foreground"/><div><div className="metric-label">Terminal</div><div className="metric-value">{flight.from.terminal}</div></div></div>
            <div className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 text-muted-foreground"/><div><div className="metric-label">Gate</div><div className={`metric-value ${flight.status === 'Gate Change' ? 'text-violet-600 dark:text-violet-400' : ''}`}>{flight.from.gate}</div></div></div>
            <div className="flex gap-2"><Clock3 className="mt-0.5 h-4 w-4 text-muted-foreground"/><div><div className="metric-label">Gate closes</div><div className="metric-value">{flight.gateCloses}</div></div></div>
            <div className="col-span-2 rounded-2xl bg-muted px-4 py-3 sm:col-span-1"><div className="metric-label">Update</div><div className="mt-1 text-xs font-semibold leading-5 text-foreground/80">{flight.note}</div></div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
