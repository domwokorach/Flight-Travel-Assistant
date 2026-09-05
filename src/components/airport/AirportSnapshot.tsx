import React from 'react'
import { ArrowRight, ShieldCheck, DoorOpen, Timer } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SplitFlapText from '../board/SplitFlapText'
import { useAirportServices } from '@/hooks/useAirport'
import { findAirport } from '@/data/airportDirectory'
import type { AirportService } from '@/types/airport'
import type { Flight } from '@/types/flight'

interface AirportSnapshotProps {
  airport?: string
  boardingFlight?: Flight | null
  hasDisruption?: boolean
}

function findValue(services: AirportService[], title: string) {
  return services.find((s) => s.title === title)?.detail ?? '—'
}

export default function AirportSnapshot({ airport = 'LHR', boardingFlight = null, hasDisruption = false }: AirportSnapshotProps) {
  const { services } = useAirportServices(airport)
  const meta = findAirport(airport)

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold text-muted-foreground">Airport snapshot</p>
          <p className="mt-1 text-lg font-extrabold">
            {meta?.name ?? airport} {boardingFlight?.origin.terminal ? `· T${boardingFlight.origin.terminal}` : ''}
          </p>
        </div>
        <Badge className={hasDisruption ? 'bg-warning-light text-warning-dark' : 'bg-success-light text-success-dark'}>
          {hasDisruption ? 'Disruption reported' : 'Operations normal'}
        </Badge>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center justify-between rounded-2xl bg-accent p-3.5">
          <div className="flex items-center gap-2 text-sm font-bold">
            <ShieldCheck className="size-4.5 text-muted-foreground" />
            <span>Security</span>
          </div>
          <p className="text-sm font-extrabold">{findValue(services, 'Security')}</p>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-accent p-3.5">
          <div className="flex items-center gap-2 text-sm font-bold">
            <DoorOpen className="size-4.5 text-muted-foreground" />
            <span>Next gate</span>
          </div>
          <SplitFlapText value={boardingFlight?.origin.gate ?? 'Not yet announced'} className="text-sm text-primary" />
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-warning/20 bg-warning-light p-3.5">
          <div className="flex items-center gap-2 text-sm font-bold text-warning-dark">
            <Timer className="size-4.5" />
            <span>Gate closes</span>
          </div>
          <SplitFlapText
            value={boardingFlight?.gateClosingTime ? new Date(boardingFlight.gateClosingTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
            className="text-sm text-warning-dark"
          />
        </div>
      </div>
      <a href="#airport" className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-primary hover:underline">
        Airport services <ArrowRight className="size-4" />
      </a>
    </Card>
  )
}
