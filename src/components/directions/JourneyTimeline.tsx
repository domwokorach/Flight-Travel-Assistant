import React, { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import GroundSegmentCard from './GroundSegmentCard'
import FlightSegmentCard from './FlightSegmentCard'
import type { Flight } from '@/types/flight'
import type { GoogleTravelMode, GroundRoute, RecommendedDeparture } from '@/types/directions'

function TimelineNode({ label, detail, last }: { label: string; detail?: string; last?: boolean }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <span className="size-3 shrink-0 rounded-full bg-primary shadow-[0_0_0_4px_rgba(255,255,255,0.08)]" />
        {!last && <span className="mt-1 w-px flex-1 bg-border-muted" />}
      </div>
      <div className="min-w-0 pb-5">
        <p className="text-sm font-bold text-foreground">{label}</p>
        {detail && <p className="text-xs font-medium text-text-secondary">{detail}</p>}
      </div>
    </div>
  )
}

function TimelineSegment({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <span className="w-px flex-1 bg-border-muted" />
      </div>
      <div className="min-w-0 flex-1 pb-5">{children}</div>
    </div>
  )
}

interface JourneyTimelineProps {
  flight: Flight
  originLabel: string
  groundRoute: GroundRoute | null
  recommendedDeparture: RecommendedDeparture | null
  mode: GoogleTravelMode
  onModeChange: (mode: GoogleTravelMode) => void
  availableModes?: GoogleTravelMode[]
  loading?: boolean
  onStartDirections: () => void
  onOpenInGoogleMaps: () => void
}

/** Your location → departure airport/terminal/gate → flight → arrival airport/terminal → final destination. */
export default function JourneyTimeline({
  flight,
  originLabel,
  groundRoute,
  recommendedDeparture,
  mode,
  onModeChange,
  availableModes,
  loading,
  onStartDirections,
  onOpenInGoogleMaps,
}: JourneyTimelineProps) {
  return (
    <div className={cn('flex flex-col')}>
      <TimelineNode label={originLabel} />
      <TimelineSegment>
        <GroundSegmentCard
          destinationLabel={flight.origin.name ?? flight.origin.iata}
          groundRoute={groundRoute}
          recommendedDeparture={recommendedDeparture}
          mode={mode}
          onModeChange={onModeChange}
          availableModes={availableModes}
          loading={loading}
          onStartDirections={onStartDirections}
          onOpenInGoogleMaps={onOpenInGoogleMaps}
        />
      </TimelineSegment>

      <TimelineNode
        label={`${flight.origin.name ?? flight.origin.iata} (${flight.origin.iata})`}
        detail={flight.origin.terminal ? `Terminal ${flight.origin.terminal}` : undefined}
      />
      {flight.origin.gate && <TimelineNode label={`Gate ${flight.origin.gate}`} />}

      <TimelineSegment>
        <FlightSegmentCard flight={flight} />
      </TimelineSegment>

      <TimelineNode
        label={`${flight.destination.name ?? flight.destination.iata} (${flight.destination.iata})`}
        detail={flight.destination.terminal ? `Terminal ${flight.destination.terminal}` : undefined}
      />
      <TimelineNode label="Final destination" detail="Directions from the arrival airport are coming soon" last />
    </div>
  )
}
