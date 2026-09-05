import { NextRequest, NextResponse } from 'next/server'
import { searchFlights } from '@/services/flightService'
import { findAirports } from '@/services/airportService'
import { apiErrorResponse } from '@/lib/apiError'
import type { FlightSearchResult } from '@/types/flight'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim() ?? ''
  if (!query) return NextResponse.json({ results: [] })

  try {
    const [flights, airports] = await Promise.all([searchFlights(query), findAirports(query)])

    const results: FlightSearchResult[] = [
      ...flights.flights.map((f) => ({
        kind: 'flight' as const,
        label: `${f.airline.name} · ${f.flightNumber}`,
        sublabel: `${f.origin.iata} → ${f.destination.iata}`,
        value: f.flightNumber,
      })),
      ...airports.map((a) => ({
        kind: 'airport' as const,
        label: `${a.name} · ${a.iata}`,
        sublabel: a.city,
        value: a.iata,
      })),
    ]

    return NextResponse.json({ results, isLive: flights.isLive })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
