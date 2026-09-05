import type { ConnectionJourney, ConnectionUrgency, Flight } from '@/types/flight'
import { minutesUntil } from '@/lib/flightMath'

const URGENT_THRESHOLD_MIN = 20
const LIMITED_THRESHOLD_MIN = 60

function classify(effectiveMinutes: number | null): ConnectionUrgency {
  if (effectiveMinutes === null) return 'unknown'
  if (effectiveMinutes <= 0) return 'missed'
  if (effectiveMinutes <= URGENT_THRESHOLD_MIN) return 'urgent'
  if (effectiveMinutes <= LIMITED_THRESHOLD_MIN) return 'limited'
  return 'plenty'
}

function urgencyLabel(urgency: ConnectionUrgency, minutes: number | null): string {
  if (urgency === 'missed') return 'Connection at risk — see rebooking options'
  if (minutes === null) return 'Connection time unavailable'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  const time = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  if (urgency === 'urgent') return `Urgent connection · ${time} available`
  if (urgency === 'limited') return `Limited connection · ${time} available`
  return `Plenty of time · ${time} available`
}

/**
 * Effective connection time uses the live arrival estimate (not the scheduled time) minus
 * transfer walk/transit time, minus a buffer up to the next flight's boarding deadline.
 */
export function computeConnectionJourney(arrivalLeg: Flight, departureLeg: Flight, walkMinutes: number): ConnectionJourney {
  const bestArrival = arrivalLeg.arrival.estimated ?? arrivalLeg.arrival.actual ?? arrivalLeg.arrival.scheduled
  const boardingDeadline = departureLeg.gateClosingTime ?? departureLeg.boardingTime ?? departureLeg.departure.estimated ?? departureLeg.departure.scheduled

  const minutesToDeadline = bestArrival && boardingDeadline ? minutesUntil(boardingDeadline, new Date(bestArrival)) : null
  const effectiveConnectionMinutes = minutesToDeadline !== null ? minutesToDeadline - walkMinutes : null

  const scheduledConnectionMinutes =
    arrivalLeg.arrival.scheduled && departureLeg.departure.scheduled
      ? Math.round((new Date(departureLeg.departure.scheduled).getTime() - new Date(arrivalLeg.arrival.scheduled).getTime()) / 60000)
      : null

  const urgency = classify(effectiveConnectionMinutes)
  const terminalChanged = Boolean(
    arrivalLeg.destination.terminal && departureLeg.origin.terminal && arrivalLeg.destination.terminal !== departureLeg.origin.terminal
  )

  return {
    id: `${arrivalLeg.flightNumber}-${departureLeg.flightNumber}`,
    legs: [arrivalLeg, departureLeg],
    effectiveConnectionMinutes,
    scheduledConnectionMinutes,
    walkMinutes,
    urgency,
    statusText: urgencyLabel(urgency, effectiveConnectionMinutes),
    terminalChanged,
    gateChanged: false,
  }
}
