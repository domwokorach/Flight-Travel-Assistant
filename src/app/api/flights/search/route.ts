import { NextRequest, NextResponse } from 'next/server'
import { searchFlights } from '@/services/flightService'
import { findAirports } from '@/services/airportService'
import { apiErrorResponse } from '@/lib/apiError'
import { checkRateLimit } from '@/lib/rateLimit'
import type { FlightSearchResult } from '@/types/flight'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim() ?? ''
  if (!query) return NextResponse.json({ results: [] })

  try {
    checkRateLimit(request, 'flights/search', { limit: 30, windowMs: 60_000 })

    const [flights, airports] = await Promise.all([searchFlights(query), findAirports(query)])

    const q = query.toLowerCase()
    const airlines = new Map<string, FlightSearchResult>()
    const cities = new Map<string, FlightSearchResult>()

    for (const f of flights.flights) {
      const airlineKey = f.airline.iata ?? f.airline.name
      if (airlineKey && f.airline.name.toLowerCase().includes(q) && !airlines.has(airlineKey)) {
        airlines.set(airlineKey, {
          kind: 'airline',
          label: f.airline.name,
          sublabel: f.airline.iata ?? undefined,
          value: f.airline.iata ?? f.airline.name,
        })
      }
    }
    for (const a of airports) {
      if (a.city && a.city.toLowerCase().includes(q) && !cities.has(a.city)) {
        cities.set(a.city, { kind: 'city', label: a.city, sublabel: a.country, value: a.city })
      }
    }

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
      ...airlines.values(),
      ...cities.values(),
    ]

    return NextResponse.json({ results, isLive: flights.isLive })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
