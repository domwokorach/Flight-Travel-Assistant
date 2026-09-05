import React from 'react'
import { cn } from '@/lib/utils'
import SplitFlapText from './SplitFlapText'

const statusTone = {
  'On Time': '#4ADE80',
  Boarding: '#38BDF8',
  'Gate Open': '#22D3EE',
  'Gate Closing': '#FB923C',
  Delayed: '#FBBF24',
  Departed: '#818CF8',
  Arrived: '#4ADE80',
  Cancelled: '#FB7185',
  'Gate Change': '#A78BFA',
}

function boardRow(flight) {
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
  }
}

const rowGrid = 'grid grid-cols-[64px_84px_1fr_56px_1fr] md:grid-cols-[72px_92px_1fr_64px_1fr] min-w-[560px] items-center gap-3'

function BoardRow({ row }) {
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
      <SplitFlapText value={row.status} className="text-xs md:text-sm" charClassName="" style={{ color: statusTone[row.status] }} />
    </div>
  )
}

export default function DepartureBoard({ heading = 'DEPARTURES', flights, className }) {
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
