export const transportTo = [
  { mode: 'Elizabeth line', kind: 'train', time: '31 min', price: '£13.90', status: 'Good service', next: '09:08' },
  { mode: 'Piccadilly line', kind: 'metro', time: '49 min', price: '£5.80', status: 'Good service', next: '09:04' },
  { mode: 'National Express', kind: 'bus', time: '55 min', price: 'from £8', status: 'On time', next: '09:20' },
  { mode: 'Taxi', kind: 'taxi', time: '45–70 min', price: '£65–£95', status: 'Moderate traffic', next: 'On demand' },
  { mode: 'Drive / parking', kind: 'car', time: '50 min', price: 'from £39/day', status: 'Long Stay spaces', next: 'Open' },
]

export const transportFrom = [
  { mode: 'AirTrain + LIRR', kind: 'train', time: '35–45 min', price: '~$22', status: 'Normal service', next: 'Every 6–12 min' },
  { mode: 'AirTrain + Subway', kind: 'metro', time: '55–70 min', price: '~$11.40', status: 'Normal service', next: 'Every 8–12 min' },
  { mode: 'Yellow taxi', kind: 'taxi', time: '45–75 min', price: '~$70 + tolls/tip', status: 'Taxi rank open', next: 'On demand' },
  { mode: 'Ride-hailing', kind: 'car', time: '45–75 min', price: '~$60–$110', status: 'Pickup zones active', next: '3–8 min' },
  { mode: 'Rental car', kind: 'car', time: 'Varies', price: 'from ~$55/day', status: 'Counters open', next: 'On demand' },
]
