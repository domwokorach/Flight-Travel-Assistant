import type { Flight } from '@/types/flight'
import type { GroundRoute, RecommendedDeparture } from '@/types/directions'
import { DEFAULT_AIRPORT_BUFFERS, type AirportBufferConfig } from '@/config/journeyBuffers'

export interface ComputeRecommendedDepartureOptions {
  buffers?: AirportBufferConfig
  now?: Date
}

/**
 * Pure function of (flight, groundRoute, opts) — no caching, no stored blob — so a future
 * live-recalculation pass (flight time/gate change, fresh traffic) can just call this again
 * with updated inputs. Labeled in the UI as an app recommendation, never an airline-guaranteed
 * time (spec requirement).
 */
export function computeRecommendedDeparture(
  flight: Flight,
  groundRoute: GroundRoute,
  opts: ComputeRecommendedDepartureOptions = {}
): RecommendedDeparture {
  const buffers = opts.buffers ?? DEFAULT_AIRPORT_BUFFERS

  const flightDepartureIso = flight.departure.estimated ?? flight.departure.scheduled
  const flightDeparture = flightDepartureIso ? new Date(flightDepartureIso) : (opts.now ?? new Date())

  const isDomestic = Boolean(flight.origin.country) && flight.origin.country === flight.destination.country
  const airportPrepBufferMinutes = isDomestic ? buffers.domesticAirportBufferMinutes : buffers.internationalAirportBufferMinutes

  const recommendedAirportArrivalAt = new Date(flightDeparture.getTime() - airportPrepBufferMinutes * 60_000)

  const groundTravelMinutes = Math.ceil(groundRoute.durationSeconds / 60)
  const recommendedLeaveAt = new Date(
    recommendedAirportArrivalAt.getTime() - (groundTravelMinutes + buffers.trafficContingencyBufferMinutes) * 60_000
  )

  return {
    recommendedLeaveAt: recommendedLeaveAt.toISOString(),
    recommendedAirportArrivalAt: recommendedAirportArrivalAt.toISOString(),
    bufferMinutesUsed: airportPrepBufferMinutes,
    trafficBufferMinutesUsed: buffers.trafficContingencyBufferMinutes,
    groundRoute,
  }
}
