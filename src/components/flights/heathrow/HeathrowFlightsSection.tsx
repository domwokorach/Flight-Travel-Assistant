'use client'

import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Info, RotateCcw } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { LiveIndicator } from '@/components/common/LiveIndicator'
import { useDepartures, useArrivals } from '@/hooks/useFlights'
import { toLegacyFlight } from '@/lib/adapters/legacyFlight'
import type { Flight } from '@/types/flight'
import HeathrowTabs, { type HeathrowTab } from './HeathrowTabs'
import HeathrowSearchBar from './HeathrowSearchBar'
import HeathrowFlightCard from './HeathrowFlightCard'
import HeathrowFlightCardSkeleton from './HeathrowFlightCardSkeleton'
import TrackFlightPanel from './TrackFlightPanel'
import { matchesTerminal, type TerminalFilter } from './terminal'

const AIRPORT = 'LHR'

function matchesQuery(flight: Flight, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [flight.airline.name, flight.flightNumber, flight.origin.iata, flight.origin.city, flight.destination.iata, flight.destination.city]
    .some((v) => v?.toLowerCase().includes(q))
}

export default function HeathrowFlightsSection() {
  const [tab, setTab] = useState<HeathrowTab>('departure')
  const [terminal, setTerminal] = useState<TerminalFilter>('All')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [query, setQuery] = useState('')
  const [appliedQuery, setAppliedQuery] = useState('')
  const [trackFlightNumber, setTrackFlightNumber] = useState<string | null>(null)

  const departures = useDepartures(AIRPORT)
  const arrivals = useArrivals(AIRPORT)

  const board = tab === 'arrival' ? arrivals : departures
  const filtered = useMemo(() => {
    if (tab === 'track') return []
    return board.flights.filter((f) => matchesTerminal(f, terminal) && matchesQuery(f, appliedQuery))
  }, [board.flights, terminal, appliedQuery, tab])

  const legacyFlights = useMemo(() => filtered.map(toLegacyFlight), [filtered])
  const loading = board.lastUpdated === null && !board.error
  const lastUpdatedLabel = board.lastUpdated
    ? new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(board.lastUpdated)
    : '—'

  const handleTrack = (flightNumber: string) => {
    setTrackFlightNumber(flightNumber)
    setTab('track')
  }

  return (
    <div className="hrw rounded-3xl border border-border bg-background-alt p-3 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow="Heathrow Airport · LHR" title="Live flights" />
        <HeathrowTabs value={tab} onChange={setTab} />
      </div>

      <div className="mt-4">
        <HeathrowSearchBar
          date={date}
          onDateChange={setDate}
          query={query}
          onQueryChange={setQuery}
          onSubmit={() => setAppliedQuery(query)}
          terminal={terminal}
          onTerminalChange={setTerminal}
        />
      </div>

      {tab === 'track' ? (
        <div className="mt-4">
          <TrackFlightPanel initialFlightNumber={trackFlightNumber} />
        </div>
      ) : (
        <>
          <div className="mt-4 flex items-center justify-between gap-2">
            <LiveIndicator state={board.connectionState} lastUpdated={board.lastUpdated} />
            <span className="text-[11px] font-bold text-muted-foreground">Last updated: {lastUpdatedLabel}</span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${tab}-${terminal}-${appliedQuery}-${loading}-${Boolean(board.error)}`}
              className="mt-3 flex flex-col gap-2.5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
            >
              {loading ? (
                <>
                  <HeathrowFlightCardSkeleton />
                  <HeathrowFlightCardSkeleton />
                  <HeathrowFlightCardSkeleton />
                </>
              ) : board.error ? (
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-error-light py-10 text-center">
                  <Info className="size-5 text-error-dark" />
                  <p className="text-sm font-bold text-error-dark">Flight board unavailable</p>
                  <p className="max-w-[320px] text-xs font-semibold text-error-dark/80">The provider didn't respond in time. Retry to reconnect.</p>
                  <button
                    type="button"
                    onClick={board.refresh}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full bg-error px-4 text-xs font-bold text-white"
                  >
                    <RotateCcw className="size-3.5" />
                    Try again
                  </button>
                </div>
              ) : legacyFlights.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-muted py-10 text-center">
                  <Info className="size-5 text-muted-foreground" />
                  <p className="text-sm font-bold text-foreground">No matching flights</p>
                  <p className="max-w-[320px] text-xs font-semibold text-muted-foreground">
                    Try a different terminal, flight number, airline, or city.
                  </p>
                </div>
              ) : (
                legacyFlights.map((flight, i) => (
                  <motion.div
                    key={flight.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: Math.min(i, 6) * 0.03, ease: 'easeOut' }}
                  >
                    <HeathrowFlightCard flight={flight} onTrack={handleTrack} />
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  )
}
