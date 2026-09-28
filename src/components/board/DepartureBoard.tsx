import React from 'react'
import { cn } from '@/lib/utils'
import SplitFlapText from './SplitFlapText'
import SplitFlapTextFlip from './SplitFlapTextFlip'
import type { LegacyFlight } from '@/lib/adapters/legacyFlight'
import type { FlightStatus } from '@/types/flight'

const statusTone: Record<FlightStatus, string> = {
  scheduled: '#A3A3A3',
  on_time: '#34D399',
  boarding: '#60A5FA',
  gate_open: '#60A5FA',
  gate_closing: '#F5A623',
  delayed: '#FB923C',
  departed: '#D4D4D4',
  in_air: '#D4D4D4',
  landed: '#34D399',
  arrived: '#34D399',
  cancelled: '#EF4444',
  diverted: '#F5A623',
  unknown: '#A3A3A3',
}

interface BoardRowData {
  id: string
  time: string
  estimated: string | null
  flightNumber: string
  airline: string
  city: string
  code: string
  terminal: string
  gate: string
  status: FlightStatus
  statusLabel: string
}

function boardRow(flight: LegacyFlight): BoardRowData {
  const isArrival = flight.type === 'arrival'
  const place = isArrival ? flight.from : flight.to
  const scheduled = isArrival ? flight.scheduledArrival : flight.scheduledDeparture
  const actual = isArrival ? flight.actualArrival : flight.actualDeparture
  const changed = actual && actual !== '—' && actual !== scheduled
  return {
    id: flight.id,
    time: scheduled,
    estimated: changed ? actual : null,
    flightNumber: flight.flightNumber,
    airline: flight.airline,
    city: place.city,
    code: place.code,
    terminal: place.terminal,
    gate: flight.from.gate,
    status: flight.status,
    statusLabel: flight.statusLabel,
  }
}

const rowGrid = 'grid grid-cols-[64px_84px_1fr_56px_1fr] md:grid-cols-[72px_92px_1fr_64px_1fr] min-w-[560px] items-center gap-3'

function BoardRow({ row }: { row: BoardRowData }) {
  return (
    <div className={cn(rowGrid, 'border-b border-white/10 px-4 py-3 last-of-type:border-b-0 md:px-6')}>
      <SplitFlapTextFlip value={row.time} className="text-base md:text-lg" charClassName="h-6 w-[13px] text-[13px] md:h-7 md:w-[15px] md:text-[15px]" />
      <div>
        <SplitFlapTextFlip
          value={row.flightNumber}
          className="text-sm md:text-base"
          charClassName="h-5 w-[11px] text-[11px] md:h-6 md:w-[13px] md:text-[13px]"
        />
        <p className="mt-0.5 truncate text-[10px] font-medium text-board-muted">{row.airline}</p>
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <SplitFlapTextFlip value={row.code} className="text-base md:text-lg" charClassName="h-6 w-[13px] text-[13px] md:h-7 md:w-[15px] md:text-[15px]" />
          {row.estimated ? <span className="font-mono text-xs text-[#FB923C]">→ {row.estimated}</span> : null}
        </div>
        <p className="mt-0.5 truncate text-[10px] font-medium text-board-muted">
          {row.city} · T{row.terminal}
        </p>
      </div>
      <SplitFlapTextFlip value={row.gate} className="text-base md:text-lg" charClassName="h-6 w-[13px] text-[13px] md:h-7 md:w-[15px] md:text-[15px]" />
      <SplitFlapText value={row.statusLabel} className="text-xs md:text-sm" charClassName="" style={{ color: statusTone[row.status] }} />
    </div>
  )
}

interface DepartureBoardProps {
  heading?: string
  flights: LegacyFlight[]
  className?: string
}

export default function DepartureBoard({ heading = 'DEPARTURES', flights, className }: DepartureBoardProps) {
  const rows = flights.map(boardRow)

  return (
    <div className={cn('overflow-hidden rounded-3xl bg-board-bg shadow-[0_16px_50px_rgba(18,20,23,0.35)]', className)}>
      <div className="flex items-center justify-between border-b border-white/10 bg-board-alt px-4 py-3 md:px-6">
        <SplitFlapText value={heading} className="text-sm text-board-text md:text-base" />
        <p className="text-[10px] font-semibold tracking-[0.08em] text-board-muted uppercase">Heathrow · T5</p>
      </div>
      <div className="overflow-x-auto">
        <div className={cn(rowGrid, 'border-b border-white/10 px-4 py-2 md:px-6')}>
          {['Time', 'Flight', heading === 'ARRIVALS' ? 'From' : 'Destination', 'Gate', 'Status'].map((label) => (
            <p key={label} className="text-[10px] font-bold tracking-[0.08em] text-board-muted uppercase">
              {label}
            </p>
          ))}
        </div>
        <div>
          {rows.length ? (
            rows.map((row) => <BoardRow key={row.id} row={row} />)
          ) : (
            <p className="min-w-[560px] px-6 py-4 text-center text-sm font-medium text-board-muted">No flights to display.</p>
          )}
        </div>
      </div>
    </div>
  )
}
