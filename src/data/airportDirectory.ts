import type { AirportMeta } from '@/types/airport'

/**
 * Static reference metadata for a curated set of major airports.
 * This is real-world IATA/ICAO/coordinate/timezone data (not live), used to power
 * airport search, timezone resolution, and map/direction links without needing
 * a paid airport-data API for every lookup.
 */
export const AIRPORT_DIRECTORY: AirportMeta[] = [
  { iata: 'LHR', icao: 'EGLL', name: 'London Heathrow Airport', city: 'London', country: 'United Kingdom', latitude: 51.4700, longitude: -0.4543, timezone: 'Europe/London', terminals: ['2', '3', '4', '5'], website: 'https://www.heathrow.com' },
  { iata: 'LGW', icao: 'EGKK', name: 'London Gatwick Airport', city: 'London', country: 'United Kingdom', latitude: 51.1537, longitude: -0.1821, timezone: 'Europe/London', terminals: ['North', 'South'], website: 'https://www.gatwickairport.com' },
  { iata: 'JFK', icao: 'KJFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States', latitude: 40.6413, longitude: -73.7781, timezone: 'America/New_York', terminals: ['1', '4', '5', '7', '8'], website: 'https://www.jfkairport.com' },
  { iata: 'EWR', icao: 'KEWR', name: 'Newark Liberty International Airport', city: 'Newark', country: 'United States', latitude: 40.6895, longitude: -74.1745, timezone: 'America/New_York', terminals: ['A', 'B', 'C'] },
  { iata: 'LAX', icao: 'KLAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States', latitude: 33.9416, longitude: -118.4085, timezone: 'America/Los_Angeles', terminals: ['1', '2', '3', '4', '5', '6', '7', '8', 'B'] },
  { iata: 'ORD', icao: 'KORD', name: "O'Hare International Airport", city: 'Chicago', country: 'United States', latitude: 41.9742, longitude: -87.9073, timezone: 'America/Chicago', terminals: ['1', '2', '3', '5'] },
  { iata: 'CDG', icao: 'LFPG', name: 'Paris Charles de Gaulle Airport', city: 'Paris', country: 'France', latitude: 49.0097, longitude: 2.5479, timezone: 'Europe/Paris', terminals: ['1', '2A', '2B', '2C', '2D', '2E', '2F', '3'] },
  { iata: 'AMS', icao: 'EHAM', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands', latitude: 52.3105, longitude: 4.7683, timezone: 'Europe/Amsterdam', terminals: ['1', '2', '3'] },
  { iata: 'FRA', icao: 'EDDF', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany', latitude: 50.0379, longitude: 8.5622, timezone: 'Europe/Berlin', terminals: ['1', '2'] },
  { iata: 'MUC', icao: 'EDDM', name: 'Munich Airport', city: 'Munich', country: 'Germany', latitude: 48.3538, longitude: 11.7861, timezone: 'Europe/Berlin', terminals: ['1', '2'] },
  { iata: 'MAD', icao: 'LEMD', name: 'Adolfo Suárez Madrid–Barajas Airport', city: 'Madrid', country: 'Spain', latitude: 40.4936, longitude: -3.5668, timezone: 'Europe/Madrid', terminals: ['1', '2', '3', '4'] },
  { iata: 'FCO', icao: 'LIRF', name: 'Rome Fiumicino Airport', city: 'Rome', country: 'Italy', latitude: 41.8003, longitude: 12.2389, timezone: 'Europe/Rome', terminals: ['1', '3'] },
  { iata: 'CPH', icao: 'EKCH', name: 'Copenhagen Airport', city: 'Copenhagen', country: 'Denmark', latitude: 55.6180, longitude: 12.6560, timezone: 'Europe/Copenhagen', terminals: ['2', '3'] },
  { iata: 'DXB', icao: 'OMDB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates', latitude: 25.2532, longitude: 55.3657, timezone: 'Asia/Dubai', terminals: ['1', '2', '3'] },
  { iata: 'IST', icao: 'LTFM', name: 'Istanbul Airport', city: 'Istanbul', country: 'Türkiye', latitude: 41.2753, longitude: 28.7519, timezone: 'Europe/Istanbul', terminals: ['1'] },
  { iata: 'SIN', icao: 'WSSS', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore', latitude: 1.3644, longitude: 103.9915, timezone: 'Asia/Singapore', terminals: ['1', '2', '3', '4'] },
  { iata: 'HND', icao: 'RJTT', name: 'Tokyo Haneda Airport', city: 'Tokyo', country: 'Japan', latitude: 35.5494, longitude: 139.7798, timezone: 'Asia/Tokyo', terminals: ['1', '2', '3'] },
  { iata: 'NRT', icao: 'RJAA', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan', latitude: 35.7647, longitude: 140.3864, timezone: 'Asia/Tokyo', terminals: ['1', '2', '3'] },
  { iata: 'SYD', icao: 'YSSY', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia', latitude: -33.9399, longitude: 151.1753, timezone: 'Australia/Sydney', terminals: ['1', '2', '3'] },
  { iata: 'PER', icao: 'YPPH', name: 'Perth Airport', city: 'Perth', country: 'Australia', latitude: -31.9385, longitude: 115.9672, timezone: 'Australia/Perth', terminals: ['1', '2', '3', '4'] },
  { iata: 'YYZ', icao: 'CYYZ', name: 'Toronto Pearson International Airport', city: 'Toronto', country: 'Canada', latitude: 43.6777, longitude: -79.6248, timezone: 'America/Toronto', terminals: ['1', '3'] },
  { iata: 'SFO', icao: 'KSFO', name: 'San Francisco International Airport', city: 'San Francisco', country: 'United States', latitude: 37.6213, longitude: -122.3790, timezone: 'America/Los_Angeles', terminals: ['1', '2', '3', 'International'] },
  { iata: 'MIA', icao: 'KMIA', name: 'Miami International Airport', city: 'Miami', country: 'United States', latitude: 25.7959, longitude: -80.2870, timezone: 'America/New_York', terminals: ['J', 'D', 'E', 'F', 'H'] },
  { iata: 'HKG', icao: 'VHHH', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'Hong Kong', latitude: 22.3080, longitude: 113.9185, timezone: 'Asia/Hong_Kong', terminals: ['1', '2'] },
  { iata: 'DOH', icao: 'OTHH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar', latitude: 25.2609, longitude: 51.6138, timezone: 'Asia/Qatar', terminals: ['1'] },
]

export function findAirport(iata: string): AirportMeta | undefined {
  return AIRPORT_DIRECTORY.find((a) => a.iata.toUpperCase() === iata.toUpperCase())
}

export function searchAirports(query: string, limit = 8): AirportMeta[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return AIRPORT_DIRECTORY.filter(
    (a) =>
      a.iata.toLowerCase().includes(q) ||
      a.icao.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q)
  ).slice(0, limit)
}
