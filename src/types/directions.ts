export type GoogleTravelMode = 'DRIVE' | 'TRANSIT' | 'WALK'

export interface GroundRoute {
  travelMode: GoogleTravelMode
  distanceMeters: number
  /** Traffic-aware ("live") duration. */
  durationSeconds: number
  /** Typical, no-traffic duration — the baseline "Normal travel" figure shown against `durationSeconds`. */
  staticDurationSeconds: number
  encodedPolyline?: string
  computedAt: string
}

export interface ResolvedPlace {
  placeId: string
  name: string
  formattedAddress: string
  latitude: number
  longitude: number
}

export interface RecommendedDeparture {
  recommendedLeaveAt: string
  recommendedAirportArrivalAt: string
  bufferMinutesUsed: number
  trafficBufferMinutesUsed: number
  groundRoute: GroundRoute
}
