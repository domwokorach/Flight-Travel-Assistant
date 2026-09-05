import { NextRequest } from 'next/server'
import { ProviderError } from './http'

interface Bucket {
  count: number
  windowStart: number
}

const buckets = new Map<string, Bucket>()

function clientKey(request: NextRequest, routeName: string): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
  return `${routeName}:${ip}`
}

/**
 * Fixed-window limiter, process-local like serverCache — good enough on a warm
 * Fluid Compute instance to stop a client hammering a public search/directions
 * route through our server. Not a substitute for platform-level protection.
 */
export function checkRateLimit(request: NextRequest, routeName: string, { limit, windowMs }: { limit: number; windowMs: number }): void {
  const key = clientKey(request, routeName)
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || now - bucket.windowStart >= windowMs) {
    buckets.set(key, { count: 1, windowStart: now })
    return
  }

  bucket.count += 1
  if (bucket.count > limit) {
    throw new ProviderError('Too many requests — please slow down', 'rate_limit')
  }
}
