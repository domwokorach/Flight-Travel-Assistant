'use client'

import React from 'react'
import { format } from 'date-fns'
import { ArrowLeft, PlaneTakeoff, TriangleAlert } from 'lucide-react'
import { CommandGroup, CommandItem } from '@/components/ui/command'
import { Skeleton } from '@/components/ui/skeleton'
import AirlineLogo from '@/components/flights/AirlineLogo'
import FlightStatusBadge from '@/components/flights/FlightStatusBadge'
import type { AirlineSearchResult, AirlineSearchFlight } from '@/types/airlineSearch'
import type { AirlineSearchStatus } from '@/hooks/useAirlineSearch'

function formatTime(iso: string | null): string | null {
  if (!iso) return null
  try {
    return format(new Date(iso), 'HH:mm')
  } catch {
    return null
  }
}

function FlightSnippet({ flight }: { flight: AirlineSearchFlight }) {
  const departing = formatTime(flight.estimatedDeparture ?? flight.scheduledDeparture)
  return (
    <div className="mt-1.5 space-y-1 rounded-lg bg-accent px-2.5 py-2">
      <p className="text-xs font-bold text-foreground">
        {flight.flightNumber} · {flight.originIata ?? '—'} → {flight.destinationIata ?? '—'}
      </p>
      <p className="text-[11px] font-medium text-muted-foreground">
        {departing ? `Departing ${departing}` : 'Departure time unavailable'}
        {flight.gate ? ` · Gate ${flight.gate}` : ''}
        {flight.delayMinutes ? ` · Delayed ${flight.delayMinutes} min` : ''}
      </p>
      <FlightStatusBadge status={flight.status} label={flight.statusText} pulse={flight.status === 'boarding'} />
    </div>
  )
}

function ResultSkeletonRow() {
  return (
    <div className="flex items-start gap-3 rounded-lg px-2.5 py-2.5">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-1.5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  )
}

interface AirlineSearchResultsProps {
  query: string
  status: AirlineSearchStatus
  results: AirlineSearchResult[]
  onSelect: (result: AirlineSearchResult) => void
}

/**
 * Live airline-search result group for the ⌘K command palette. Loading/empty/error states
 * are tracked separately from `results` so "no matches" is never shown while a request is
 * still in flight (spec's Loading/Empty state requirements).
 */
export function AirlineSearchResults({ query, status, results, onSelect }: AirlineSearchResultsProps) {
  if (query.trim().length < 2) return null

  if (status === 'loading') {
    return (
      <CommandGroup heading="Airlines">
        <ResultSkeletonRow />
        <ResultSkeletonRow />
      </CommandGroup>
    )
  }

  if (status === 'error') {
    return (
      <CommandGroup heading="Airlines">
        <div className="flex flex-col items-center gap-1 px-4 py-6 text-center">
          <TriangleAlert className="size-4 text-muted-foreground" />
          <p className="text-sm font-bold text-foreground">Live airline data is temporarily unavailable</p>
          <p className="text-xs text-muted-foreground">Please try again.</p>
        </div>
      </CommandGroup>
    )
  }

  if (status === 'success' && results.length === 0) {
    return (
      <CommandGroup heading="Airlines">
        <div className="flex flex-col items-center gap-1 px-4 py-6 text-center">
          <p className="text-sm font-bold text-foreground">No airlines found</p>
          <p className="text-xs text-muted-foreground">Try an airline name, airline code, flight number, or route.</p>
        </div>
      </CommandGroup>
    )
  }

  if (results.length === 0) return null

  return (
    <CommandGroup heading="Airlines">
      {results.map((result) => {
        const { airline } = result
        const key = `${airline.iata ?? airline.icao ?? airline.name}-${result.matchKind}`
        const primary = result.flights[0]
        return (
          <CommandItem key={key} value={key} onSelect={() => onSelect(result)} className="h-auto items-start gap-3 py-2.5">
            <AirlineLogo airlineName={airline.name} airlineCode={airline.iata} airlineIcao={airline.icao} domain={airline.domain} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-foreground">{airline.name}</p>
              <p className="text-xs font-medium text-muted-foreground">
                {[airline.iata, airline.icao].filter(Boolean).join(' · ') || 'Code unavailable'}
              </p>
              {primary && <FlightSnippet flight={primary} />}
            </div>
          </CommandItem>
        )
      })}
    </CommandGroup>
  )
}

interface AirlineDetailPanelProps {
  result: AirlineSearchResult
  flights: AirlineSearchFlight[]
  loading: boolean
  error: boolean
  onBack: () => void
}

/** Shown after selecting an airline result — spec: "opens without requiring another search",
 *  so this renders inline in the same palette rather than navigating away. */
export function AirlineDetailPanel({ result, flights, loading, error, onBack }: AirlineDetailPanelProps) {
  const { airline } = result
  return (
    <div className="p-2">
      <button
        type="button"
        onClick={onBack}
        className="flex h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-bold text-muted-foreground hover:bg-accent hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to search
      </button>
      <div className="flex items-center gap-3 px-2 pt-2 pb-3">
        <AirlineLogo airlineName={airline.name} airlineCode={airline.iata} airlineIcao={airline.icao} domain={airline.domain} size="md" />
        <div>
          <p className="font-heading text-base font-extrabold text-foreground">{airline.name}</p>
          <p className="text-xs font-semibold text-muted-foreground">
            {[airline.iata, airline.icao, airline.country].filter(Boolean).join(' · ') || 'Details unavailable'}
          </p>
        </div>
      </div>
      <div className="space-y-2 px-2 pb-2">
        {loading && (
          <>
            <ResultSkeletonRow />
            <ResultSkeletonRow />
          </>
        )}
        {!loading && error && (
          <div className="flex flex-col items-center gap-1 py-6 text-center">
            <TriangleAlert className="size-4 text-muted-foreground" />
            <p className="text-sm font-bold text-foreground">Live airline data is temporarily unavailable</p>
            <p className="text-xs text-muted-foreground">Please try again.</p>
          </div>
        )}
        {!loading && !error && flights.length === 0 && (
          <div className="flex flex-col items-center gap-1 py-6 text-center">
            <PlaneTakeoff className="size-4 text-muted-foreground" />
            <p className="text-sm font-bold text-foreground">No current flights found</p>
          </div>
        )}
        {!loading &&
          !error &&
          flights.map((flight) => (
            <div key={flight.flightNumber + flight.scheduledDeparture} className="rounded-xl border border-border p-3">
              <FlightSnippet flight={flight} />
            </div>
          ))}
      </div>
    </div>
  )
}
