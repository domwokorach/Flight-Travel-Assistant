import type { AirportMeta, AirportService } from '@/types/airport'
import { AIRPORT_DIRECTORY, findAirport, searchAirports } from '@/data/airportDirectory'

export async function getAirport(iata: string): Promise<AirportMeta | null> {
  return findAirport(iata) ?? null
}

export async function findAirports(query: string): Promise<AirportMeta[]> {
  return searchAirports(query)
}

export async function listAirports(): Promise<AirportMeta[]> {
  return AIRPORT_DIRECTORY
}

/**
 * Terminal-level amenity info (security wait, lounges, Wi-Fi, etc.) isn't published by any
 * free real-time API, so this is maintained as static reference content per airport rather
 * than presented as live.
 */
const SERVICES_BY_AIRPORT: Record<string, AirportService[]> = {
  LHR: [
    { title: 'Terminal information', detail: 'Terminal 5 · South concourse', icon: 'terminal' },
    { title: 'Check-in desks', detail: 'Zone C · desks C1–C18', icon: 'checkin' },
    { title: 'Security', detail: '8–12 min typical wait', icon: 'security' },
    { title: 'Passport control', detail: 'Not required before departure', icon: 'passport' },
    { title: 'Lounges', detail: '3 lounges near Gates A/B', icon: 'lounge' },
    { title: 'Shops', detail: 'Open · 42 stores airside', icon: 'shop' },
    { title: 'Restaurants', detail: 'Open · 18 food options', icon: 'food' },
    { title: 'Baggage reclaim', detail: 'Follow purple Arrivals signs', icon: 'baggage' },
    { title: 'Lost property', detail: 'Terminal 5 arrivals hall', icon: 'lost' },
    { title: 'Airport Wi-Fi', detail: 'Free Heathrow Wi-Fi', icon: 'wifi' },
    { title: 'Charging points', detail: 'At most seating areas', icon: 'charge' },
  ],
}

export async function getAirportServices(iata: string): Promise<AirportService[]> {
  return SERVICES_BY_AIRPORT[iata.toUpperCase()] ?? SERVICES_BY_AIRPORT.LHR
}
