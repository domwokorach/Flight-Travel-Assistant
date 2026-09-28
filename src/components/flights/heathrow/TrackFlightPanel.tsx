'use client'

import React, { useMemo, useRef, useState } from 'react'
import { Search, RotateCcw, Gauge, TrendingUp, DoorOpen, MapPinned, Radar } from 'lucide-react'
import 'maplibre-gl/dist/maplibre-gl.css'
import AirlineLogo from '../AirlineLogo'
import HeathrowStatusBadge from './HeathrowStatusBadge'
import HeathrowFlightCardSkeleton from './HeathrowFlightCardSkeleton'
import JourneyTimeline from '../JourneyTimeline'
import { LiveIndicator } from '@/components/common/LiveIndicator'
import { useFlightTracking, useLiveFlightPosition } from '@/hooks/useFlights'
import { toLegacyFlight } from '@/lib/adapters/legacyFlight'
import { publicEnv } from '@/config/env'
import { useMapLibreMap } from '@/hooks/useMapLibreMap'
import type { Flight, FlightStatus } from '@/types/flight'

const DEFAULT_MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty'

const STAGES = ['Scheduled', 'Boarding', 'Departed', 'In air', 'Landed']

function stageIndexFor(status: FlightStatus): number {
  switch (status) {
    case 'gate_open':
    case 'boarding':
    case 'gate_closing':
      return 1
    case 'departed':
      return 2
    case 'in_air':
      return 3
    case 'landed':
    case 'arrived':
      return 4
    default:
      return 0
  }
}

function formatNow(): string {
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())
}

function TrackFlightMap({ flightNumber, enabled }: { flightNumber: string; enabled: boolean }) {
  const { position } = useLiveFlightPosition(flightNumber, enabled)
  const containerRef = useRef<HTMLDivElement>(null)
  const styleUrl = publicEnv.NEXT_PUBLIC_MAP_STYLE_URL ?? DEFAULT_MAP_STYLE_URL
  const center: [number, number] = position ? [position.longitude, position.latitude] : [0, 51.47]

  const { loadError } = useMapLibreMap(containerRef, {
    styleUrl,
    center,
    zoom: 5,
    rebuildKey: [position?.latitude, position?.longitude],
    onReady: (map, { Marker, Popup }) => {
      if (!position) return
      new Marker({ color: '#C6007E', rotation: position.direction ?? 0 })
        .setLngLat([position.longitude, position.latitude])
        .setPopup(new Popup().setText(`${flightNumber} · ${Math.round(position.speed ?? 0)} km/h`))
        .addTo(map)
    },
  })

  if (!enabled) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-2xl bg-muted text-center">
        <MapPinned className="size-5 text-muted-foreground" />
        <p className="text-xs font-semibold text-muted-foreground">Live position available once the flight is airborne</p>
      </div>
    )
  }

  if (loadError || !position) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-2xl bg-muted text-center">
        <MapPinned className="size-5 text-muted-foreground" />
        <p className="text-xs font-semibold text-muted-foreground">Locating aircraft…</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl">
      <div ref={containerRef} className="h-40 w-full" />
      <div className="flex items-center gap-4 bg-muted px-4 py-2.5 text-xs font-bold text-muted-foreground">
        {position.speed != null && (
          <span className="inline-flex items-center gap-1.5">
            <Gauge className="size-3.5" /> {Math.round(position.speed)} km/h
          </span>
        )}
        {position.altitude != null && (
          <span className="inline-flex items-center gap-1.5">
            <TrendingUp className="size-3.5" /> {Math.round(position.altitude).toLocaleString()} m
          </span>
        )}
      </div>
    </div>
  )
}

function TrackedFlightDetail({ flight, isLive, connectionState, lastUpdated, onRefresh }: {
  flight: Flight
  isLive: boolean
  connectionState: ReturnType<typeof useFlightTracking>['connectionState']
  lastUpdated: Date | null
  onRefresh: () => void
}) {
  const legacy = useMemo(() => toLegacyFlight(flight), [flight])
  const isDeparture = flight.direction === 'departure'

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <AirlineLogo airlineName={legacy.airline} airlineCode={legacy.airlineMark} size="md" />
          <div>
            <p className="font-heading text-base font-extrabold text-foreground">{legacy.airline}</p>
            <p className="text-sm font-semibold text-muted-foreground">{legacy.flightNumber}</p>
          </div>
        </div>
        <HeathrowStatusBadge status={flight.status} />
      </div>

      <div className="flex items-center justify-between gap-3 rounded-2xl bg-muted px-4 py-4">
        <div>
          <p className="font-heading text-2xl font-extrabold text-foreground">{legacy.from.code}</p>
          <p className="text-xs font-semibold text-muted-foreground">{legacy.from.city}</p>
        </div>
        <div className="flex flex-1 items-center gap-2 px-2">
          <div className="h-px flex-1 bg-border-strong" />
          <Radar className="size-4 text-[var(--hrw-magenta)]" />
          <div className="h-px flex-1 bg-border-strong" />
        </div>
        <div className="text-right">
          <p className="font-heading text-2xl font-extrabold text-foreground">{legacy.to.code}</p>
          <p className="text-xs font-semibold text-muted-foreground">{legacy.to.city}</p>
        </div>
      </div>

      <JourneyTimeline stages={STAGES} currentIndex={stageIndexFor(flight.status)} />

      <TrackFlightMap flightNumber={legacy.flightNumber} enabled={flight.status === 'in_air'} />

      <div className="grid grid-cols-2 gap-4 border-y border-border py-4 sm:grid-cols-4">
        <div>
          <p className="text-[10px] font-bold tracking-wide text-muted-foreground uppercase">Scheduled</p>
          <p className="mt-1 text-sm font-bold text-foreground">{isDeparture ? legacy.scheduledDeparture : legacy.scheduledArrival}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-wide text-muted-foreground uppercase">Estimated / actual</p>
          <p className="mt-1 text-sm font-bold text-foreground">{isDeparture ? legacy.actualDeparture : legacy.actualArrival}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div>
            <p className="text-[10px] font-bold tracking-wide text-muted-foreground uppercase">Terminal</p>
            <p className="mt-1 text-sm font-bold text-foreground">{(isDeparture ? legacy.from.terminal : legacy.to.terminal) ?? '—'}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <DoorOpen className="mt-3 size-3.5 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-[10px] font-bold tracking-wide text-muted-foreground uppercase">Gate</p>
            <p className="mt-1 text-sm font-bold text-foreground">{isDeparture ? legacy.from.gate : legacy.to.gate}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <LiveIndicator state={connectionState} lastUpdated={lastUpdated} />
        <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground">
          <span>Last updated: {lastUpdated ? formatNow() : '—'}</span>
          <button type="button" onClick={onRefresh} className="inline-flex items-center gap-1 text-[var(--hrw-magenta)] hover:underline">
            <RotateCcw className="size-3.5" />
            Refresh
          </button>
        </div>
      </div>
      {!isLive && (
        <p className="text-center text-[11px] font-semibold text-muted-foreground">Showing demo data — connect a flight-data provider for live tracking.</p>
      )}
    </div>
  )
}

export default function TrackFlightPanel({ initialFlightNumber }: { initialFlightNumber?: string | null }) {
  const [input, setInput] = useState(initialFlightNumber ?? '')
  const [tracked, setTracked] = useState<string | null>(initialFlightNumber ?? null)

  React.useEffect(() => {
    if (initialFlightNumber) {
      setInput(initialFlightNumber)
      setTracked(initialFlightNumber)
    }
  }, [initialFlightNumber])

  const { flight, isLive, error, connectionState, lastUpdated, refresh } = useFlightTracking(tracked)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = input.trim().toUpperCase()
    if (value) setTracked(value)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:p-6">
      <form onSubmit={submit} className="flex items-center gap-2">
        <label className="relative flex h-11 flex-1 items-center rounded-xl border border-border bg-background px-3">
          <Search className="mr-2 size-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a flight number, e.g. BA117"
            aria-label="Flight number to track"
            className="h-full w-full bg-transparent text-sm font-semibold text-foreground uppercase outline-none placeholder:text-muted-foreground placeholder:font-medium placeholder:normal-case"
          />
        </label>
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98]"
        >
          <Radar className="size-4" />
          Track
        </button>
      </form>

      <div className="mt-5">
        {!tracked ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-muted py-12 text-center">
            <Radar className="size-6 text-muted-foreground" />
            <p className="text-sm font-bold text-foreground">Track any flight live</p>
            <p className="max-w-[320px] text-xs font-semibold text-muted-foreground">
              Enter a flight number above to see its live status, progress, and position.
            </p>
          </div>
        ) : !flight && !error ? (
          <HeathrowFlightCardSkeleton />
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-error-light py-10 text-center">
            <p className="text-sm font-bold text-error-dark">Couldn't find flight {tracked}</p>
            <p className="max-w-[320px] text-xs font-semibold text-error-dark/80">Check the flight number and try again.</p>
            <button
              type="button"
              onClick={refresh}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-error px-4 text-xs font-bold text-white"
            >
              <RotateCcw className="size-3.5" />
              Try again
            </button>
          </div>
        ) : flight ? (
          <TrackedFlightDetail
            flight={flight}
            isLive={isLive}
            connectionState={connectionState}
            lastUpdated={lastUpdated}
            onRefresh={refresh}
          />
        ) : null}
      </div>
    </div>
  )
}
