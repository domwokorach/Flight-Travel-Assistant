import React from 'react'
import type { Flight } from '@/types/flight'

export default function FlightDirectionsHeader({ flight }: { flight: Flight }) {
  return (
    <div>
      <p className="text-xs font-bold tracking-[0.1em] text-primary-light uppercase">{flight.flightNumber}</p>
      <h3 className="mt-1 font-heading text-2xl font-bold text-foreground">{flight.airline.name}</h3>
      <p className="mt-1 font-mono text-sm font-bold tracking-wide text-text-secondary">
        {flight.origin.iata} → {flight.destination.iata}
      </p>
    </div>
  )
}
