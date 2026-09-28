import type { Flight } from '@/types/flight'

export const TERMINAL_OPTIONS = ['All', 'T2', 'T3', 'T4', 'T5'] as const
export type TerminalFilter = (typeof TERMINAL_OPTIONS)[number]

/** The LHR-side terminal for a board row — origin.terminal for a departure, destination.terminal
 *  for an arrival, since the other end of the flight is always the airport being boarded. */
export function lhrTerminalOf(flight: Flight): string | null {
  const raw = flight.direction === 'departure' ? flight.origin.terminal : flight.destination.terminal
  if (!raw) return null
  return /^T/i.test(raw) ? raw.toUpperCase() : `T${raw}`
}

export function matchesTerminal(flight: Flight, filter: TerminalFilter): boolean {
  if (filter === 'All') return true
  return lhrTerminalOf(flight) === filter
}
