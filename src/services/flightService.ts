import type { ConnectionJourney, Flight } from '@/types/flight'
import { getFlightProvider } from '@/lib/providers/flight'
import { computeConnectionJourney } from '@/lib/journey/connectionStatus'

export async function getDepartures(airportIata: string): Promise<{ flights: Flight[]; isLive: boolean }> {
  const provider = getFlightProvider()
  const flights = await provider.getDepartures(airportIata)
  return { flights: flights.sort(sortByDepartureTime), isLive: provider.isLive }
}

export async function getArrivals(airportIata: string): Promise<{ flights: Flight[]; isLive: boolean }> {
  const provider = getFlightProvider()
  const flights = await provider.getArrivals(airportIata)
  return { flights: flights.sort(sortByArrivalTime), isLive: provider.isLive }
}

export async function getFlightByNumber(flightNumber: string, date?: string): Promise<{ flight: Flight | null; isLive: boolean }> {
  const provider = getFlightProvider()
  const flight = await provider.getFlight(flightNumber, date)
  return { flight, isLive: provider.isLive }
}

export async function searchFlights(query: string): Promise<{ flights: Flight[]; isLive: boolean }> {
  const provider = getFlightProvider()
  const flights = await provider.searchFlights(query)
  return { flights, isLive: provider.isLive }
}

export async function getConnectionJourney(
  arrivalFlightNumber: string,
  departureFlightNumber: string,
  walkMinutes = 20
): Promise<{ journey: ConnectionJourney | null; isLive: boolean }> {
  const provider = getFlightProvider()
  const [arrivalLeg, departureLeg] = await Promise.all([
    provider.getFlight(arrivalFlightNumber),
    provider.getFlight(departureFlightNumber),
  ])
  if (!arrivalLeg || !departureLeg) return { journey: null, isLive: provider.isLive }
  return { journey: computeConnectionJourney(arrivalLeg, departureLeg, walkMinutes), isLive: provider.isLive }
}

function sortByDepartureTime(a: Flight, b: Flight): number {
  const at = a.departure.estimated ?? a.departure.scheduled ?? ''
  const bt = b.departure.estimated ?? b.departure.scheduled ?? ''
  return at.localeCompare(bt)
}

function sortByArrivalTime(a: Flight, b: Flight): number {
  const at = a.arrival.estimated ?? a.arrival.scheduled ?? ''
  const bt = b.arrival.estimated ?? b.arrival.scheduled ?? ''
  return at.localeCompare(bt)
}
