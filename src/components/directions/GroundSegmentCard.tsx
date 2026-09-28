import React from 'react'
import { Navigation, Map as MapIcon, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import TransportModeToggle from './TransportModeToggle'
import type { GoogleTravelMode, GroundRoute, RecommendedDeparture } from '@/types/directions'

function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes} min`
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`
}

function formatDistance(meters: number): string {
  return meters >= 1000 ? `${(meters / 1000).toFixed(1)} mi` : `${meters} m`
}

function formatClock(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

interface GroundSegmentCardProps {
  destinationLabel: string
  groundRoute: GroundRoute | null
  recommendedDeparture: RecommendedDeparture | null
  mode: GoogleTravelMode
  onModeChange: (mode: GoogleTravelMode) => void
  availableModes?: GoogleTravelMode[]
  loading?: boolean
  onStartDirections: () => void
  onOpenInGoogleMaps: () => void
}

/**
 * The tappable "ground segment" of the journey timeline — traffic-aware ETA (kept visually
 * distinct from airline delay elsewhere in the app), recommended leave-by time (explicitly
 * labeled as this app's recommendation, never an airline-guaranteed time), and mode toggle.
 */
export default function GroundSegmentCard({
  destinationLabel,
  groundRoute,
  recommendedDeparture,
  mode,
  onModeChange,
  availableModes,
  loading,
  onStartDirections,
  onOpenInGoogleMaps,
}: GroundSegmentCardProps) {
  const trafficDeltaMinutes =
    groundRoute && mode === 'DRIVE' ? Math.round((groundRoute.durationSeconds - groundRoute.staticDurationSeconds) / 60) : 0

  return (
    <Card className="gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold tracking-[0.08em] text-muted-foreground uppercase">To {destinationLabel}</p>
          {groundRoute ? (
            <p className="mt-0.5 font-heading text-lg font-bold text-foreground">
              {formatDuration(groundRoute.durationSeconds)} · {formatDistance(groundRoute.distanceMeters)}
            </p>
          ) : loading ? (
            <p className="mt-0.5 text-sm font-semibold text-muted-foreground">Finding the best route…</p>
          ) : (
            <p className="mt-0.5 text-sm font-semibold text-muted-foreground">Route not yet calculated</p>
          )}
        </div>
        <TransportModeToggle mode={mode} onChange={onModeChange} availableModes={availableModes} disabled={loading} />
      </div>

      {groundRoute && mode === 'DRIVE' && (
        <p className="text-xs font-medium text-text-secondary">
          Normal travel {formatDuration(groundRoute.staticDurationSeconds)}
          {trafficDeltaMinutes > 0 && (
            <>
              {' '}
              · Current traffic {formatDuration(groundRoute.durationSeconds)} ·{' '}
              <span className="text-warning-dark">+{trafficDeltaMinutes} min traffic</span>
            </>
          )}
        </p>
      )}

      {recommendedDeparture && (
        <div className="rounded-xl border border-border-muted bg-accent/40 px-3.5 py-2.5">
          <p className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">App recommendation, not airline-guaranteed</p>
          <p className="mt-0.5 text-sm font-bold text-foreground">Leave by {formatClock(recommendedDeparture.recommendedLeaveAt)}</p>
          <p className="mt-0.5 text-xs font-medium text-text-secondary">
            Arrive at the airport by {formatClock(recommendedDeparture.recommendedAirportArrivalAt)} ({recommendedDeparture.bufferMinutesUsed} min
            prep + {recommendedDeparture.trafficBufferMinutesUsed} min buffer)
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={onStartDirections} disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Navigation className="size-4" />}
          Start directions
        </Button>
        <Button variant="outline" className="border-white/15 bg-white/5 text-foreground hover:border-white/25 hover:bg-white/10" onClick={onOpenInGoogleMaps}>
          <MapIcon className="size-4" />
          Open in Google Maps
        </Button>
      </div>
    </Card>
  )
}
