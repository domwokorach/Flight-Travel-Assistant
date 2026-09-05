import type { Flight, ConnectionJourney } from '@/types/flight'
import type { JourneyState } from '@/types/journey'
import { computeGateCountdown } from './gateCountdown'
import { formatMinutesAsClock } from '@/lib/flightMath'

/**
 * Central journey engine: combines flight status + gate countdown + connection state
 * into a single "what should the traveller do next" answer, per the product's core
 * principle (spec §35/§38) of turning raw status into an action rather than raw data.
 */
export function computeJourneyState(flight: Flight, connection: ConnectionJourney | null, walkMinutes: number | null): JourneyState {
  const now = new Date().toISOString()

  if (flight.status === 'cancelled') {
    return {
      stage: 'gate',
      headline: `${flight.flightNumber} is cancelled`,
      subline: flight.disruption?.rebookingInfo ?? 'Contact the airline for rebooking options.',
      ctaLabel: 'View alternative flights',
      isLive: flight.isLive,
      updatedAt: now,
    }
  }

  if (flight.status === 'arrived') {
    if (connection) {
      return {
        stage: 'connection',
        headline: `Welcome to ${flight.destination.city ?? flight.destination.iata}`,
        subline: `Baggage reclaim: Belt ${flight.destination.baggageBelt ?? 'TBC'} · Next connection ${connection.legs[1].flightNumber}`,
        ctaLabel: 'Plan onward journey',
        isLive: flight.isLive,
        updatedAt: now,
      }
    }
    return {
      stage: 'baggage_reclaim',
      headline: `Welcome to ${flight.destination.city ?? flight.destination.iata}`,
      subline: flight.destination.baggageBelt ? `Baggage reclaim: Belt ${flight.destination.baggageBelt}` : 'Baggage belt not yet announced',
      ctaLabel: 'Plan transport',
      isLive: flight.isLive,
      updatedAt: now,
    }
  }

  if (flight.status === 'in_air' || flight.status === 'departed' || flight.status === 'landed') {
    return {
      stage: 'in_flight',
      headline: `${flight.flightNumber} · In flight`,
      subline: flight.arrival.estimated ? `Estimated arrival ${new Date(flight.arrival.estimated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Arrival time pending',
      ctaLabel: 'Track flight',
      isLive: flight.isLive,
      updatedAt: now,
    }
  }

  const countdown = computeGateCountdown(flight)
  const walkLabel = walkMinutes !== null ? `${walkMinutes}-minute walk` : 'Walk time unavailable'

  if (countdown.escalation === 'urgent' || countdown.escalation === 'closing_soon') {
    return {
      stage: 'gate',
      headline: `Gate closing soon · Gate ${flight.origin.gate ?? 'TBC'}`,
      subline: `${walkLabel} · Closes in ${countdown.minutesRemaining !== null ? formatMinutesAsClock(countdown.minutesRemaining) : '—'}`,
      ctaLabel: 'Go to Gate',
      isLive: flight.isLive,
      updatedAt: now,
    }
  }

  if (flight.status === 'boarding' || flight.status === 'gate_open') {
    return {
      stage: 'boarding',
      headline: `${flight.flightNumber} is boarding at Gate ${flight.origin.gate ?? 'TBC'}`,
      subline: `${walkLabel} · Gate closes ${countdown.minutesRemaining !== null ? formatMinutesAsClock(countdown.minutesRemaining) : 'soon'}`,
      ctaLabel: 'Take Me to Gate',
      isLive: flight.isLive,
      updatedAt: now,
    }
  }

  return {
    stage: 'gate',
    headline: `Next: Gate ${flight.origin.gate ?? 'not yet announced'}`,
    subline: `${flight.statusText} · ${walkLabel}`,
    ctaLabel: 'View Flight Details',
    isLive: flight.isLive,
    updatedAt: now,
  }
}
