import { simulateRequest } from '../lib/api'
import { airportServices } from '../data/airports'

export function getAirportServices() {
  return simulateRequest(airportServices, { delay: 300 })
}
