/**
 * Timezone-aware helpers. We never hardcode UTC offsets — every offset is derived
 * from Intl's IANA tz database for the instant in question, so DST and date-line
 * transitions resolve correctly year-round.
 */

export function getUtcOffsetMinutes(timeZone: string, at: Date = new Date()): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'shortOffset',
  })
  const parts = dtf.formatToParts(at)
  const tzPart = parts.find((p) => p.type === 'timeZoneName')?.value ?? 'GMT+0'
  const match = tzPart.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/)
  if (!match) return 0
  const sign = match[1] === '-' ? -1 : 1
  const hours = Number(match[2])
  const minutes = Number(match[3] ?? 0)
  return sign * (hours * 60 + minutes)
}

export function describeOffsetDifference(baseTimezone: string, targetTimezone: string, at: Date = new Date()): string {
  const diffMinutes = getUtcOffsetMinutes(targetTimezone, at) - getUtcOffsetMinutes(baseTimezone, at)
  if (diffMinutes === 0) return 'Same time zone'
  const hours = Math.abs(diffMinutes) / 60
  const hoursLabel = Number.isInteger(hours) ? `${hours}` : hours.toFixed(1)
  const unit = hours === 1 ? 'hour' : 'hours'
  return diffMinutes > 0 ? `${hoursLabel} ${unit} ahead` : `${hoursLabel} ${unit} behind`
}

export function formatLocalTime(timeZone: string, at: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(at)
}

export function formatLocalDateTime(timeZone: string, at: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(at)
}
