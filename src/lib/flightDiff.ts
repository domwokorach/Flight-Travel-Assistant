import type { Flight } from '@/types/flight'
import { isMeaningfulStatusChange } from './flightMath'

export interface FlightTransition {
  type: 'status' | 'gate_change' | 'terminal_change' | 'delay' | 'cancelled'
  title: string
  description: string
}

/**
 * Diffs two snapshots of the same flight and reports only meaningful, notification-worthy
 * transitions — never one per poll. Shared by the client's in-app toast pipeline
 * (`useFlightEvents`) and the server-side push cron (`/api/cron/flight-watch`) so both
 * "what counts as worth telling someone" definitions can't drift apart.
 */
export function diffFlightTransitions(previous: Flight | null, next: Flight): FlightTransition[] {
  if (!previous) return []
  const transitions: FlightTransition[] = []

  if (previous.origin.gate && next.origin.gate && previous.origin.gate !== next.origin.gate) {
    transitions.push({
      type: 'gate_change',
      title: 'Gate Changed',
      description: `${next.flightNumber}: ${previous.origin.gate} → ${next.origin.gate}`,
    })
  }
  if (previous.origin.terminal && next.origin.terminal && previous.origin.terminal !== next.origin.terminal) {
    transitions.push({
      type: 'terminal_change',
      title: 'Terminal Changed',
      description: `Terminal ${previous.origin.terminal} → Terminal ${next.origin.terminal}`,
    })
  }
  if (next.status === 'cancelled' && previous.status !== 'cancelled') {
    transitions.push({ type: 'cancelled', title: 'Flight Cancelled', description: `${next.flightNumber} · ${next.origin.iata} → ${next.destination.iata}` })
  } else if (isMeaningfulStatusChange(previous.status, next.status)) {
    transitions.push({ type: 'status', title: next.statusText, description: `${next.flightNumber} is now ${next.statusText.toLowerCase()}` })
  }
  if ((next.delayMinutes ?? 0) > (previous.delayMinutes ?? 0)) {
    transitions.push({ type: 'delay', title: 'Delay Updated', description: `${next.flightNumber}: ${next.statusText}` })
  }

  return transitions
}
