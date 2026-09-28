export interface AirportBufferConfig {
  domesticAirportBufferMinutes: number
  internationalAirportBufferMinutes: number
  trafficContingencyBufferMinutes: number
}

/**
 * Business/UX tuning knobs, not secrets — plain constants rather than env vars, matching
 * how e.g. connection walkMinutes is passed as a plain value elsewhere in src/lib/journey.
 */
export const DEFAULT_AIRPORT_BUFFERS: AirportBufferConfig = {
  domesticAirportBufferMinutes: 90,
  internationalAirportBufferMinutes: 150,
  trafficContingencyBufferMinutes: 15,
}
