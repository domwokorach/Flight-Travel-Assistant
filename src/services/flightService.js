import { simulateRequest } from '../lib/api'
import { flights, connectionJourney } from '../data/flights'

export function getFlights() {
  return simulateRequest(flights, { delay: 400 })
}

export function getConnectionJourney() {
  return simulateRequest(connectionJourney, { delay: 400 })
}

export function searchFlights(criteria) {
  const shouldFail = criteria?.query?.trim().toLowerCase() === 'error'
  return simulateRequest(flights, { delay: 550, shouldFail })
}
