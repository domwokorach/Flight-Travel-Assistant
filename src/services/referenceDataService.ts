import type { AirlineInfo, CityInfo, CountryInfo, FleetAircraft, AirlineRoute } from '@/types/reference'
import { airlabsRequest } from '@/lib/airlabs/client'
import { withServerCache } from '@/lib/serverCache'
import { serverEnv } from '@/config/env'

/**
 * Thin pass-through wrappers around AirLabs' reference databases (/airlines, /cities,
 * /countries, /fleets, /routes — spec §§12–16). None back a specific screen today; they exist
 * as a ready data layer (service + API route + types) for future features. /taxes is skipped —
 * fare/tax metadata isn't part of this app's passenger-journey scope.
 */

interface AirLabsAirline {
  name?: string
  iata_code?: string | null
  icao_code?: string | null
  country_code?: string | null
}

export async function getAirlineInfo(iata: string): Promise<AirlineInfo | null> {
  if (!serverEnv.AIRLABS_API_KEY) return null
  const results = await withServerCache(`airlabs:airline:${iata}`, 24 * 60 * 60_000, () =>
    airlabsRequest<AirLabsAirline[]>('airlines', { iata_code: iata.toUpperCase() })
  )
  const first = results?.[0]
  if (!first) return null
  return { name: first.name ?? iata, iata: first.iata_code ?? null, icao: first.icao_code ?? null, country: first.country_code ?? null }
}

/** Exact-code airline lookup that accepts either a 2-letter IATA or 3-letter ICAO code —
 *  used by airlineSearchService's "exact airline-code match" branch. */
export async function getAirlineByCode(code: string): Promise<AirlineInfo | null> {
  if (!serverEnv.AIRLABS_API_KEY) return null
  const upper = code.toUpperCase()
  const param = upper.length === 3 ? { icao_code: upper } : { iata_code: upper }
  const cacheKey = `airlabs:airlinecode:${upper}`
  const results = await withServerCache(cacheKey, 24 * 60 * 60_000, () => airlabsRequest<AirLabsAirline[]>('airlines', param))
  const first = results?.[0]
  if (!first) return null
  return { name: first.name ?? upper, iata: first.iata_code ?? null, icao: first.icao_code ?? null, country: first.country_code ?? null }
}

/**
 * Airline name search via AirLabs' /airlines?name= (NOT /suggest — verified live that /suggest
 * only returns countries/cities/airports/cross-refs, never airlines, despite what its docs
 * examples imply). Substring match, e.g. "british" matches "British Airways".
 */
export async function searchAirlinesByName(name: string): Promise<{ airlines: AirlineInfo[]; isLive: boolean }> {
  if (!serverEnv.AIRLABS_API_KEY) return { airlines: [], isLive: false }
  const q = name.trim()
  if (!q) return { airlines: [], isLive: false }
  const cacheKey = `airlabs:airlinename:${q.toLowerCase()}`
  const results = await withServerCache(cacheKey, 5 * 60_000, () => airlabsRequest<AirLabsAirline[]>('airlines', { name: q }))
  const airlines: AirlineInfo[] = (results ?? []).map((a) => ({
    name: a.name ?? q,
    iata: a.iata_code ?? null,
    icao: a.icao_code ?? null,
    country: a.country_code ?? null,
  }))
  return { airlines, isLive: true }
}

interface AirLabsCity {
  name?: string
  city_code?: string | null
  country_code?: string | null
  lat?: number | null
  lng?: number | null
}

export async function getCityInfo(cityCode: string): Promise<CityInfo | null> {
  if (!serverEnv.AIRLABS_API_KEY) return null
  const results = await withServerCache(`airlabs:city:${cityCode}`, 24 * 60 * 60_000, () =>
    airlabsRequest<AirLabsCity[]>('cities', { city_code: cityCode.toUpperCase() })
  )
  const first = results?.[0]
  if (!first) return null
  return { name: first.name ?? cityCode, cityCode: first.city_code ?? null, country: first.country_code ?? null, latitude: first.lat ?? null, longitude: first.lng ?? null }
}

interface AirLabsCountry {
  name?: string
  code?: string | null
  continent?: string | null
}

export async function getCountryInfo(code: string): Promise<CountryInfo | null> {
  if (!serverEnv.AIRLABS_API_KEY) return null
  const results = await withServerCache(`airlabs:country:${code}`, 24 * 60 * 60_000, () =>
    airlabsRequest<AirLabsCountry[]>('countries', { code: code.toUpperCase() })
  )
  const first = results?.[0]
  if (!first) return null
  return { name: first.name ?? code, code: first.code ?? null, continent: first.continent ?? null }
}

interface AirLabsFleetAircraft {
  reg_number?: string | null
  icao_code?: string | null
  airline_iata?: string | null
  manufacturer?: string | null
  model?: string | null
}

export async function getFleet(limit = 100, offset = 0): Promise<{ aircraft: FleetAircraft[]; isLive: boolean }> {
  if (!serverEnv.AIRLABS_API_KEY) return { aircraft: [], isLive: false }
  const results = await withServerCache(`airlabs:fleets:${limit}:${offset}`, 24 * 60 * 60_000, () =>
    airlabsRequest<AirLabsFleetAircraft[]>('fleets', { limit, offset })
  )
  const aircraft: FleetAircraft[] = (results ?? []).map((a) => ({
    registration: a.reg_number ?? null,
    aircraftIcao: a.icao_code ?? null,
    airlineIata: a.airline_iata ?? null,
    manufacturer: a.manufacturer ?? null,
    model: a.model ?? null,
  }))
  return { aircraft, isLive: true }
}

interface AirLabsRoute {
  airline_iata?: string | null
  dep_iata?: string | null
  arr_iata?: string | null
}

export async function getRoutes(filters: { depIata?: string; arrIata?: string; airlineIata?: string }): Promise<{ routes: AirlineRoute[]; isLive: boolean }> {
  if (!serverEnv.AIRLABS_API_KEY) return { routes: [], isLive: false }
  const cacheKey = `airlabs:routes:${filters.depIata ?? ''}:${filters.arrIata ?? ''}:${filters.airlineIata ?? ''}`
  const results = await withServerCache(cacheKey, 24 * 60 * 60_000, () =>
    airlabsRequest<AirLabsRoute[]>('routes', {
      dep_iata: filters.depIata,
      arr_iata: filters.arrIata,
      airline_iata: filters.airlineIata,
    })
  )
  const routes: AirlineRoute[] = (results ?? []).map((r) => ({
    airlineIata: r.airline_iata ?? null,
    departureIata: r.dep_iata ?? null,
    arrivalIata: r.arr_iata ?? null,
  }))
  return { routes, isLive: true }
}
