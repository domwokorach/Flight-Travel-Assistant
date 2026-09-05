import type { FlightStatus, TimePoint } from '@/types/flight'

/** Minutes between scheduled and the best-known revised time (estimated, else actual). Null when not delayed or unknown. */
export function computeDelayMinutes(point: TimePoint): number | null {
  const scheduled = point.scheduled ? new Date(point.scheduled).getTime() : null
  const revised = point.actual ?? point.estimated
  const revisedMs = revised ? new Date(revised).getTime() : null
  if (scheduled === null || revisedMs === null) return null
  const diff = Math.round((revisedMs - scheduled) / 60000)
  return diff > 0 ? diff : null
}

export function formatDelayLabel(minutes: number | null, direction: 'departure' | 'arrival'): string | null {
  if (!minutes || minutes <= 0) return null
  const verb = direction === 'departure' ? 'Delayed' : 'Estimated'
  const suffix = direction === 'departure' ? '' : ' late'
  return `${verb} ${minutes} min${suffix}`
}

/** Rank used to decide whether an incoming status update is a meaningful change worth animating/notifying. */
const STATUS_RANK: Record<FlightStatus, number> = {
  scheduled: 0,
  on_time: 1,
  gate_open: 2,
  boarding: 3,
  gate_closing: 4,
  delayed: 2.5,
  departed: 5,
  in_air: 6,
  landed: 7,
  arrived: 8,
  diverted: 9,
  cancelled: 10,
  unknown: -1,
}

export function isMeaningfulStatusChange(previous: FlightStatus | undefined, next: FlightStatus): boolean {
  if (!previous) return false
  if (previous === next) return false
  return STATUS_RANK[next] !== STATUS_RANK[previous]
}

export function minutesUntil(iso: string | null, from: Date = new Date()): number | null {
  if (!iso) return null
  const target = new Date(iso).getTime()
  if (Number.isNaN(target)) return null
  return Math.round((target - from.getTime()) / 60000)
}

export function formatMinutesAsClock(totalMinutes: number): string {
  const clamped = Math.max(0, totalMinutes)
  const mins = Math.floor(clamped) % 60
  const hours = Math.floor(clamped / 60)
  const secondsPart = '00'
  if (hours > 0) return `${hours}:${String(mins).padStart(2, '0')}:${secondsPart}`
  return `${String(mins).padStart(2, '0')}:${secondsPart}`
}
