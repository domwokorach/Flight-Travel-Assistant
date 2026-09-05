import type { PushSubscription as WebPushSubscription } from 'web-push'
import type { Flight } from '@/types/flight'

export interface PushSubscriptionRecord {
  subscription: WebPushSubscription
  flightNumber: string
}

/**
 * Process-local, same pattern as serverCache.ts/rateLimit.ts — real subscriptions and real
 * sends, but not durable across a redeploy/cold restart. If this needs to survive that,
 * swap the Map for a real store (e.g. Upstash Redis via the Vercel Marketplace); not adding
 * one unprompted since this app has no database provisioned today.
 */
const subscriptions = new Map<string, PushSubscriptionRecord>()
const lastSeenByFlight = new Map<string, Flight>()

function keyFor(subscription: WebPushSubscription): string {
  return subscription.endpoint
}

export function addSubscription(subscription: WebPushSubscription, flightNumber: string) {
  subscriptions.set(keyFor(subscription), { subscription, flightNumber: flightNumber.toUpperCase() })
}

export function removeSubscription(subscription: WebPushSubscription) {
  subscriptions.delete(keyFor(subscription))
}

export function listSubscriptions(): PushSubscriptionRecord[] {
  return [...subscriptions.values()]
}

export function getLastSeen(flightNumber: string): Flight | null {
  return lastSeenByFlight.get(flightNumber.toUpperCase()) ?? null
}

export function setLastSeen(flightNumber: string, flight: Flight) {
  lastSeenByFlight.set(flightNumber.toUpperCase(), flight)
}

export function dropSubscriptionByEndpoint(endpoint: string) {
  subscriptions.delete(endpoint)
}
