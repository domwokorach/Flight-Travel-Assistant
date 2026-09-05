export type TransportServiceStatus =
  | 'good_service'
  | 'minor_delays'
  | 'severe_delays'
  | 'part_suspended'
  | 'service_closed'
  | 'unknown'

export interface TransportOption {
  mode: string
  kind: 'train' | 'metro' | 'bus' | 'taxi' | 'car' | 'cycle' | 'walk'
  next: string | null
  journeyTime: string
  price: string
  status: TransportServiceStatus
  statusText: string
  isLive: boolean
  disruptionReason?: string | null
  alternative?: { mode: string; journeyTime: string } | null
}

export interface DirectionsRoute {
  mode: 'driving' | 'walking' | 'cycling' | 'transit'
  distanceMeters: number
  durationMinutes: number
  summary: string
  mapUrl: string
}
