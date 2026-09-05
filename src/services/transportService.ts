import type { TransportOption } from '@/types/transport'
import { buildTflTransportOption } from '@/lib/providers/transport/tfl'

function staticOption(o: Omit<TransportOption, 'isLive' | 'status' | 'statusText'> & { statusText: string }): TransportOption {
  return { ...o, isLive: false, status: 'unknown' }
}

export async function getTransportToAirport(iata: string): Promise<TransportOption[]> {
  if (iata.toUpperCase() !== 'LHR') return getGenericToAirportOptions()

  const [elizabeth, piccadilly] = await Promise.all([
    buildTflTransportOption('elizabeth', 'Elizabeth line', '31 min', '£13.90', { mode: 'Piccadilly line', journeyTime: '49 min' }),
    buildTflTransportOption('piccadilly', 'Piccadilly line', '49 min', '£5.80'),
  ])

  return [
    elizabeth,
    piccadilly,
    staticOption({ mode: 'National Express', kind: 'bus', next: 'Every 20–30 min', journeyTime: '55 min', price: 'from £8', statusText: 'Scheduled service' }),
    staticOption({ mode: 'Taxi', kind: 'taxi', next: 'On demand', journeyTime: '45–70 min', price: '£65–£95', statusText: 'Subject to traffic' }),
    staticOption({ mode: 'Drive / parking', kind: 'car', next: 'Open', journeyTime: '50 min', price: 'from £39/day', statusText: 'Long Stay spaces available' }),
  ]
}

function getGenericToAirportOptions(): TransportOption[] {
  return [
    staticOption({ mode: 'Taxi', kind: 'taxi', next: 'On demand', journeyTime: 'Varies', price: 'Varies', statusText: 'Live status unavailable for this airport' }),
    staticOption({ mode: 'Drive / parking', kind: 'car', next: 'Open', journeyTime: 'Varies', price: 'Varies', statusText: 'Live status unavailable for this airport' }),
  ]
}

export async function getTransportFromAirport(iata: string): Promise<TransportOption[]> {
  if (iata.toUpperCase() === 'JFK') {
    return [
      staticOption({ mode: 'AirTrain + LIRR', kind: 'train', next: 'Every 6–12 min', journeyTime: '35–45 min', price: '~$22', statusText: 'Scheduled service' }),
      staticOption({ mode: 'AirTrain + Subway', kind: 'metro', next: 'Every 8–12 min', journeyTime: '55–70 min', price: '~$11.40', statusText: 'Scheduled service' }),
      staticOption({ mode: 'Yellow taxi', kind: 'taxi', next: 'On demand', journeyTime: '45–75 min', price: '~$70 + tolls/tip', statusText: 'Taxi rank open' }),
      staticOption({ mode: 'Ride-hailing', kind: 'car', next: '3–8 min', journeyTime: '45–75 min', price: '~$60–$110', statusText: 'Pickup zones active' }),
      staticOption({ mode: 'Rental car', kind: 'car', next: 'On demand', journeyTime: 'Varies', price: 'from ~$55/day', statusText: 'Counters open' }),
    ]
  }
  return getGenericToAirportOptions()
}
