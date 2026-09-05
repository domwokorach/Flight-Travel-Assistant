import { simulateRequest } from '../lib/api'
import { cityInfo } from '../data/weather'

export function getCityInfo() {
  return simulateRequest(cityInfo, { delay: 300 })
}
