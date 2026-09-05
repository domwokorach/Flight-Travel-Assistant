import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
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

const gridTemplate = { xs: '64px 84px 1fr 56px 1fr' }

function BoardRow({ row }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: gridTemplate,
        alignItems: 'center',
        gap: 1.5,
        minWidth: 560,
        px: { xs: 2, md: 3 },
        py: 1.5,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        '&:last-of-type': { borderBottom: 'none' },
      }}
    >
      <SplitFlapText value={row.time} sx={{ fontSize: { xs: 16, md: 18 }, color: 'board.text' }} />
      <Box>
        <SplitFlapText value={row.flightNumber} sx={{ fontSize: { xs: 14, md: 16 }, color: 'board.text' }} />
        <Typography noWrap sx={{ mt: 0.25, fontSize: 10, fontWeight: 500, color: 'board.muted' }}>
          {row.airline}
        </Typography>
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <SplitFlapText value={row.code} sx={{ fontSize: { xs: 16, md: 18 }, color: 'board.text' }} />
          {row.estimated ? (
            <Typography
              component="span"
              sx={{ fontSize: 12, color: '#FBBF24', fontFamily: 'IBM Plex Mono, monospace' }}
            >
              → {row.estimated}
            </Typography>
          ) : null}
        </Box>
        <Typography noWrap sx={{ mt: 0.25, fontSize: 10, fontWeight: 500, color: 'board.muted' }}>
          {row.city} · T{row.terminal}
        </Typography>
      </Box>
      <SplitFlapText value={row.gate} sx={{ fontSize: { xs: 16, md: 18 }, color: 'board.text' }} />
      <SplitFlapText
        value={row.status}
        sx={{ fontSize: { xs: 12, md: 14 }, color: statusTone[row.status] || 'board.text' }}
      />
    </Box>
  )
}

export default function DepartureBoard({ heading = 'DEPARTURES', flights, sx }) {
  const rows = flights.map(boardRow)

  return (
    <Box
      sx={{
        overflow: 'hidden',
        borderRadius: 5,
        bgcolor: 'board.bg',
        boxShadow: '0 16px 50px rgba(18,20,23,0.35)',
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          bgcolor: 'board.alt',
          px: { xs: 2, md: 3 },
          py: 1.5,
        }}
      >
        <SplitFlapText value={heading} sx={{ fontSize: { xs: 14, md: 16 }, color: 'board.text' }} />
        <Typography sx={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'board.muted' }}>
          Heathrow · T5
        </Typography>
      </Box>
      <Box sx={{ overflowX: 'auto' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: gridTemplate,
            gap: 1.5,
            minWidth: 560,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            px: { xs: 2, md: 3 },
            py: 1,
          }}
        >
          {['Time', 'Flight', heading === 'ARRIVALS' ? 'From' : 'Destination', 'Gate', 'Status'].map(label => (
            <Typography key={label} sx={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'board.muted' }}>
              {label}
            </Typography>
          ))}
        </Box>
        <div>
          {rows.length ? (
            rows.map(row => <BoardRow key={row.id} row={row} />)
          ) : (
            <Typography sx={{ minWidth: 560, px: 3, py: 4, textAlign: 'center', fontSize: 14, fontWeight: 500, color: 'board.muted' }}>
              No flights to display.
            </Typography>
          )}
        </div>
      </Box>
    </Box>
  )
}
