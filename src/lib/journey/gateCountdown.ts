import type { GateCountdownState } from '@/types/journey'
import type { Flight } from '@/types/flight'
import { minutesUntil } from '@/lib/flightMath'

/**
 * Escalation thresholds per product spec:
 * 30min announced, 20min boarding, 15min closing soon, 5min urgent, 0min closed.
 */
export function computeGateCountdown(flight: Flight, now: Date = new Date()): GateCountdownState {
  if (flight.status === 'cancelled') {
    return { minutesRemaining: null, label: 'Flight cancelled', tone: 'neutral', escalation: 'none' }
  }

  const deadline = flight.gateClosingTime ?? flight.boardingTime ?? flight.departure.estimated ?? flight.departure.scheduled
  const minutesRemaining = minutesUntil(deadline, now)

  if (minutesRemaining === null) {
    return { minutesRemaining: null, label: 'Gate not yet announced', tone: 'neutral', escalation: 'none' }
  }
  if (minutesRemaining <= 0) {
    return { minutesRemaining: 0, label: 'Gate closed', tone: 'rose', escalation: 'closed' }
  }
  if (minutesRemaining <= 5) {
    return { minutesRemaining, label: 'Urgent — proceed immediately', tone: 'rose', escalation: 'urgent' }
  }
  if (minutesRemaining <= 15) {
    return { minutesRemaining, label: 'Gate closing soon', tone: 'orange', escalation: 'closing_soon' }
  }
  if (minutesRemaining <= 20) {
    return { minutesRemaining, label: 'Boarding', tone: 'blue', escalation: 'boarding' }
  }
  if (minutesRemaining <= 30) {
    return { minutesRemaining, label: 'Gate announced', tone: 'green', escalation: 'announced' }
  }
  return { minutesRemaining, label: 'On schedule', tone: 'green', escalation: 'none' }
}
