export const flights = [
  {
    id: 'ba117', type: 'departure', airline: 'British Airways', airlineMark: 'BA', flightNumber: 'BA117',
    from: { city: 'London', code: 'LHR', terminal: '5', gate: 'B42' },
    to: { city: 'New York', code: 'JFK', terminal: '8', gate: '—' },
    scheduledDeparture: '15:10', actualDeparture: '15:10', scheduledArrival: '18:05', actualArrival: '18:05',
    boarding: '14:25', gateCloses: '14:55', duration: '7h 55m', status: 'Boarding', note: 'Boarding groups 1–3 now',
  },
  {
    id: 'sk500', type: 'departure', airline: 'Scandinavian Airlines', airlineMark: 'SK', flightNumber: 'SK500',
    from: { city: 'London', code: 'LHR', terminal: '2', gate: 'A18' },
    to: { city: 'Copenhagen', code: 'CPH', terminal: '3', gate: '—' },
    scheduledDeparture: '16:05', actualDeparture: '16:05', scheduledArrival: '19:00', actualArrival: '19:00',
    boarding: '15:25', gateCloses: '15:50', duration: '1h 55m', status: 'On Time', note: 'Gate opens 15:15',
  },
  {
    id: 'aa106', type: 'departure', airline: 'American Airlines', airlineMark: 'AA', flightNumber: 'AA106',
    from: { city: 'London', code: 'LHR', terminal: '3', gate: '31' },
    to: { city: 'New York', code: 'JFK', terminal: '8', gate: '—' },
    scheduledDeparture: '16:35', actualDeparture: '17:20', scheduledArrival: '19:30', actualArrival: '20:05',
    boarding: '16:25', gateCloses: '17:05', duration: '7h 45m', status: 'Delayed', note: '45 min delay · inbound aircraft late',
  },
  {
    id: 'af1281', type: 'departure', airline: 'Air France', airlineMark: 'AF', flightNumber: 'AF1281',
    from: { city: 'London', code: 'LHR', terminal: '4', gate: '22' },
    to: { city: 'Paris', code: 'CDG', terminal: '2E', gate: '—' },
    scheduledDeparture: '17:00', actualDeparture: '17:00', scheduledArrival: '19:20', actualArrival: '19:20',
    boarding: '16:20', gateCloses: '16:45', duration: '1h 20m', status: 'Gate Change', note: 'Gate changed from 16 to 22',
  },
  {
    id: 'lh921', type: 'departure', airline: 'Lufthansa', airlineMark: 'LH', flightNumber: 'LH921',
    from: { city: 'London', code: 'LHR', terminal: '2', gate: '—' },
    to: { city: 'Frankfurt', code: 'FRA', terminal: '1', gate: '—' },
    scheduledDeparture: '18:30', actualDeparture: '—', scheduledArrival: '21:05', actualArrival: '—',
    boarding: '—', gateCloses: '—', duration: '1h 35m', status: 'Cancelled', note: 'Contact airline for rebooking',
  },
  {
    id: 'ba178', type: 'arrival', airline: 'British Airways', airlineMark: 'BA', flightNumber: 'BA178',
    from: { city: 'New York', code: 'JFK', terminal: '8', gate: '7' },
    to: { city: 'London', code: 'LHR', terminal: '5', gate: 'C61' },
    scheduledDeparture: '07:55', actualDeparture: '08:04', scheduledArrival: '20:00', actualArrival: '19:48',
    boarding: '07:10', gateCloses: '07:40', duration: '7h 44m', status: 'Arrived', note: 'Baggage reclaim belt 7',
  },
  {
    id: 'kl1008', type: 'arrival', airline: 'KLM', airlineMark: 'KL', flightNumber: 'KL1008',
    from: { city: 'Amsterdam', code: 'AMS', terminal: '1', gate: 'D12' },
    to: { city: 'London', code: 'LHR', terminal: '4', gate: '14' },
    scheduledDeparture: '12:45', actualDeparture: '12:48', scheduledArrival: '13:10', actualArrival: '13:08',
    boarding: '12:10', gateCloses: '12:30', duration: '1h 20m', status: 'Arrived', note: 'Arrived 2 min early',
  },
]

export const connectionJourney = {
  id: 'connect-lhr-ams-jfk',
  route: ['LHR', 'AMS', 'JFK'],
  cities: ['London', 'Amsterdam', 'New York'],
  currentFlight: { airline: 'KLM', flightNumber: 'KL1002', from: 'LHR', to: 'AMS', arrival: '13:40', terminal: '2', gate: 'D7', status: 'On Time' },
  nextFlight: { airline: 'KLM', flightNumber: 'KL641', from: 'AMS', to: 'JFK', departure: '15:05', terminal: '2', gate: 'E22', boarding: '14:20', gateCloses: '14:45', status: 'Gate Open' },
  layover: '1h 25m', walkTime: '18–22 min', boardingDeadline: '14:45', connectionStatus: 'Limited connection time', urgency: 'limited',
}
