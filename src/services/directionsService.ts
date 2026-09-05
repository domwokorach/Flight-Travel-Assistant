import type { DirectionsRoute } from '@/types/transport'
import { getDirectionsProvider } from '@/lib/providers/directions'
import { findAirport } from '@/data/airportDirectory'

export async function getDirectionsToAirport(
  from: { lat: number; lon: number },
  airportIata: string,
  mode: DirectionsRoute['mode'] = 'driving'
): Promise<DirectionsRoute | null> {
  const airport = findAirport(airportIata)
  if (!airport) return null
  return getDirectionsProvider().getDirections(from, { lat: airport.latitude, lon: airport.longitude }, mode)
}

export async function getDirectionsBetweenAirports(
  fromIata: string,
  toIata: string,
  mode: DirectionsRoute['mode'] = 'driving'
): Promise<DirectionsRoute | null> {
  const from = findAirport(fromIata)
  const to = findAirport(toIata)
  if (!from || !to) return null
  return getDirectionsProvider().getDirections({ lat: from.latitude, lon: from.longitude }, { lat: to.latitude, lon: to.longitude }, mode)
}
