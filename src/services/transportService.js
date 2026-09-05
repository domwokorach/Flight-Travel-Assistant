import { simulateRequest } from '../lib/api'
import { transportTo, transportFrom } from '../data/transport'

export function getTransportTo() {
  return simulateRequest(transportTo, { delay: 300 })
}

export function getTransportFrom() {
  return simulateRequest(transportFrom, { delay: 300 })
}
