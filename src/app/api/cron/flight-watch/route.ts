import { NextResponse } from 'next/server'
import webPush from 'web-push'
import { getFlightByNumber } from '@/services/flightService'
import { diffFlightTransitions } from '@/lib/flightDiff'
import { listSubscriptions, getLastSeen, setLastSeen, dropSubscriptionByEndpoint } from '@/lib/pushStore'
import { serverEnv } from '@/config/env'

/**
 * Polled by Vercel Cron (see vercel.json) rather than the browser, so it can notify a
 * subscriber even with the tab closed — the client-side event pipeline (`useFlightEvents`)
 * only runs while the page is open. Sends only on the same meaningful transitions the
 * in-app toasts use (`diffFlightTransitions`), never once per cron tick.
 */
export async function GET() {
  if (!serverEnv.PUSH_PUBLIC_KEY || !serverEnv.PUSH_PRIVATE_KEY) {
    return NextResponse.json({ sent: 0, reason: 'push not configured' })
  }
  webPush.setVapidDetails('mailto:support@example.com', serverEnv.PUSH_PUBLIC_KEY, serverEnv.PUSH_PRIVATE_KEY)

  const subscriptions = listSubscriptions()
  const flightNumbers = [...new Set(subscriptions.map((s) => s.flightNumber))]

  const flights = await Promise.all(
    flightNumbers.map(async (flightNumber) => {
      const { flight } = await getFlightByNumber(flightNumber)
      return [flightNumber, flight] as const
    })
  )

  let sent = 0
  for (const [flightNumber, flight] of flights) {
    if (!flight) continue
    const previous = getLastSeen(flightNumber)
    const transitions = diffFlightTransitions(previous, flight)
    setLastSeen(flightNumber, flight)
    if (!transitions.length) continue

    const recipients = subscriptions.filter((s) => s.flightNumber === flightNumber)
    for (const { subscription } of recipients) {
      for (const transition of transitions) {
        try {
          await webPush.sendNotification(subscription, JSON.stringify({ title: transition.title, body: transition.description }))
          sent += 1
        } catch (err) {
          const statusCode = (err as { statusCode?: number }).statusCode
          if (statusCode === 404 || statusCode === 410) dropSubscriptionByEndpoint(subscription.endpoint)
        }
      }
    }
  }

  return NextResponse.json({ sent, watched: flightNumbers.length })
}
