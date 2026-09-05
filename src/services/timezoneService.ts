import { findAirport } from '@/data/airportDirectory'
import { describeOffsetDifference, formatLocalTime } from '@/lib/timezone'

export async function getAirportTimezone(iata: string): Promise<{ timezone: string; localTime: string } | null> {
  const airport = findAirport(iata)
  if (!airport) return null
  return { timezone: airport.timezone, localTime: formatLocalTime(airport.timezone) }
}

export async function compareAirportTimezones(baseIata: string, targetIata: string): Promise<string | null> {
  const base = findAirport(baseIata)
  const target = findAirport(targetIata)
  if (!base || !target) return null
  return describeOffsetDifference(base.timezone, target.timezone)
}
