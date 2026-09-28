import type { AirlineSearchFlight, AirlineSearchResult } from '@/types/airlineSearch'
import type { Flight } from '@/types/flight'
import { getFlightByNumber } from '@/services/flightService'
import { getAirlineByCode, searchAirlinesByName, getRoutes } from '@/services/referenceDataService'
import { getAirlineDomain } from '@/data/airlines'
import { airlabsRequest } from '@/lib/airlabs/client'
import { withServerCache } from '@/lib/serverCache'
import { serverEnv } from '@/config/env'
import { normalizeAirLabsFlight, type AirLabsFlight } from '@/lib/providers/flight/airlabs.normalize'

/**
 * Real-time airline search (per the Search & Find Airlines spec): flight-number, exact
 * IATA/ICAO airline-code, airline-name, and route ("LHR JFK") queries, ranked per the spec's
 * priority list. This is layered on top of the existing FlightProvider abstraction for the
 * flight-number branch (works with whichever provider is configured), and on AirLabs directly
 * for the airline-code/name/route/flights-by-airline branches — those capabilities
 * (name search, route lookup) aren't part of the FlightProvider interface, same as
 * nearbyAirportsService/delaysService/referenceDataService before this.
 *
 * Quota note: the AirLabs free plan this app runs on has a *lifetime* cap of 1,000 requests
 * (not just per-hour), so this deliberately does NOT eagerly enrich every airline-name match
 * with a flights lookup — only the top result. Other results hydrate on selection via
 * getAirlineFlights(), called from /api/airlines/[iata]/flights.
 */

const FLIGHT_NUMBER_RE = /^[A-Z]{2,3}\d{1,4}[A-Z]?$/i
const AIRLINE_CODE_RE = /^[A-Z]{2,3}$/i
const AIRPORT_CODE_RE = /^[A-Z]{3}$/i

type QueryShape =
  | { kind: 'flight_number'; value: string }
  | { kind: 'airline_code'; value: string }
  | { kind: 'route'; dep: string; arr: string }
  | { kind: 'airline_name'; value: string }

function detectQueryShape(raw: string): QueryShape {
  const q = raw.trim()
  const tokens = q.split(/[\s\-–>→]+/).filter(Boolean)

  if (tokens.length === 2 && AIRPORT_CODE_RE.test(tokens[0]) && AIRPORT_CODE_RE.test(tokens[1])) {
    return { kind: 'route', dep: tokens[0].toUpperCase(), arr: tokens[1].toUpperCase() }
  }
  if (FLIGHT_NUMBER_RE.test(q.replace(/\s+/g, ''))) {
    return { kind: 'flight_number', value: q.replace(/\s+/g, '').toUpperCase() }
  }
  if (AIRLINE_CODE_RE.test(q)) {
    return { kind: 'airline_code', value: q.toUpperCase() }
  }
  return { kind: 'airline_name', value: q }
}

function toSearchFlight(flight: Flight): AirlineSearchFlight {
  return {
    flightNumber: flight.flightNumber,
    originIata: flight.origin.iata ?? null,
    destinationIata: flight.destination.iata ?? null,
    scheduledDeparture: flight.departure.scheduled,
    estimatedDeparture: flight.departure.estimated,
    actualDeparture: flight.departure.actual,
    scheduledArrival: flight.arrival.scheduled,
    estimatedArrival: flight.arrival.estimated,
    actualArrival: flight.arrival.actual,
    status: flight.status,
    statusText: flight.statusText,
    terminal: flight.origin.terminal ?? null,
    gate: flight.origin.gate ?? null,
    delayMinutes: flight.delayMinutes,
    codeshareOf: flight.codeshareOf ?? null,
    updatedAt: flight.lastUpdated,
  }
}

/** Up to `limit` scheduled flights for an airline, via AirLabs' /schedules?airline_iata=.
 *  Used both to eagerly enrich a search result's top match and to lazily hydrate the rest
 *  on selection (see /api/airlines/[iata]/flights). */
export async function getAirlineFlights(airlineIata: string, limit = 5): Promise<{ flights: AirlineSearchFlight[]; isLive: boolean }> {
  if (!serverEnv.AIRLABS_API_KEY) return { flights: [], isLive: false }
  const code = airlineIata.toUpperCase()
  const cacheKey = `airlabs:airlineflights:${code}`
  const raw = await withServerCache(cacheKey, 60_000, () => airlabsRequest<AirLabsFlight[]>('schedules', { airline_iata: code }))
  const flights = (raw ?? [])
    .slice(0, limit)
    .map((f) => normalizeAirLabsFlight(f, f.dep_time_utc ? 'departure' : 'arrival'))
    .map(toSearchFlight)
  return { flights, isLive: true }
}

function buildAirline(info: { name: string; iata?: string | null; icao?: string | null; country?: string | null }): AirlineSearchResult['airline'] {
  return {
    name: info.name,
    iata: info.iata ?? null,
    icao: info.icao ?? null,
    country: info.country ?? null,
    domain: getAirlineDomain(info.iata ?? undefined) ?? null,
  }
}

export async function searchAirlines(query: string): Promise<{ results: AirlineSearchResult[]; isLive: boolean }> {
  const q = query.trim()
  if (!q) return { results: [], isLive: false }

  const shape = detectQueryShape(q)

  if (shape.kind === 'flight_number') {
    const { flight, isLive } = await getFlightByNumber(shape.value)
    if (!flight) return { results: [], isLive }
    return {
      isLive,
      results: [
        {
          matchKind: 'flight_number',
          airline: buildAirline(flight.airline),
          flights: [toSearchFlight(flight)],
        },
      ],
    }
  }

  if (shape.kind === 'airline_code') {
    const airline = await getAirlineByCode(shape.value)
    if (!airline) return { results: [], isLive: Boolean(serverEnv.AIRLABS_API_KEY) }
    const { flights, isLive } = airline.iata ? await getAirlineFlights(airline.iata) : { flights: [], isLive: true }
    return { isLive, results: [{ matchKind: 'airline_code', airline: buildAirline(airline), flights }] }
  }

  if (shape.kind === 'route') {
    const { routes, isLive } = await getRoutes({ depIata: shape.dep, arrIata: shape.arr })
    const codes = [...new Set(routes.map((r) => r.airlineIata).filter((c): c is string => Boolean(c)))].slice(0, 10)
    const airlines = await Promise.all(codes.map((code) => getAirlineByCode(code)))
    const results: AirlineSearchResult[] = airlines
      .filter((a): a is NonNullable<typeof a> => Boolean(a))
      .map((airline) => ({ matchKind: 'route', airline: buildAirline(airline), flights: [] }))
    return { isLive, results }
  }

  // airline_name
  const { airlines, isLive } = await searchAirlinesByName(shape.value)
  const qLower = shape.value.toLowerCase()
  const ranked = [...airlines]
    .sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(qLower) ? 0 : 1
      const bStarts = b.name.toLowerCase().startsWith(qLower) ? 0 : 1
      if (aStarts !== bStarts) return aStarts - bStarts
      return a.name.length - b.name.length
    })
    .slice(0, 8)

  const results: AirlineSearchResult[] = await Promise.all(
    ranked.map(async (airline, index) => {
      // Only the top-ranked match gets eager flight enrichment — see quota note above.
      const flights = index === 0 && airline.iata ? (await getAirlineFlights(airline.iata)).flights : []
      return { matchKind: 'airline_name' as const, airline: buildAirline(airline), flights }
    })
  )

  return { isLive, results }
}
