import React from 'react'
import { cn } from '@/lib/utils'
import SplitFlapText from './SplitFlapText'
import type { LegacyFlight } from '@/lib/adapters/legacyFlight'
import type { FlightStatus } from '@/types/flight'

const statusTone: Record<FlightStatus, string> = {
  scheduled: '#94A3B8',
  on_time: '#4ADE80',
  boarding: '#38BDF8',
  gate_open: '#22D3EE',
  gate_closing: '#FB923C',
  delayed: '#FBBF24',
  departed: '#818CF8',
  in_air: '#818CF8',
  landed: '#4ADE80',
  arrived: '#4ADE80',
  cancelled: '#FB7185',
  diverted: '#A78BFA',
  unknown: '#94A3B8',
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
      <SplitFlapText value={row.time} className="text-base text-board-text md:text-lg" />
      <div>
        <SplitFlapText value={row.flightNumber} className="text-sm text-board-text md:text-base" />
        <p className="mt-0.5 truncate text-[10px] font-medium text-board-muted">{row.airline}</p>
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <SplitFlapText value={row.code} className="text-base text-board-text md:text-lg" />
          {row.estimated ? <span className="font-mono text-xs text-[#FBBF24]">→ {row.estimated}</span> : null}
        </div>
        <p className="mt-0.5 truncate text-[10px] font-medium text-board-muted">
          {row.city} · T{row.terminal}
        </p>
      </div>
      <SplitFlapText value={row.gate} className="text-base text-board-text md:text-lg" />
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
