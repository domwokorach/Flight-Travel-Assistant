export function formatCountdown(totalSeconds) {
  const safe = Math.max(0, totalSeconds)
  const m = Math.floor(safe / 60)
  const s = safe % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export function minutesRemaining(totalSeconds) {
  return Math.max(0, Math.ceil(totalSeconds / 60))
}

export function formatClockFromOffset(offsetHours, date = new Date()) {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000
  const local = new Date(utc + offsetHours * 3600000)
  return local.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}
