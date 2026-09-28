import { ProviderError } from '@/lib/http'
import { serverEnv } from '@/config/env'

const BASE_URL = serverEnv.AIRLABS_BASE_URL ?? 'https://airlabs.co/api/v9'

interface AirLabsEnvelope<T> {
  response?: T
  error?: { message?: string; code?: string }
}

/**
 * Shared server-only AirLabs client (spec §3). Every AirLabs-backed service/provider in this
 * app goes through here — never `fetch` AirLabs directly from a route or service — so auth,
 * timeouts, retries, error shape, and logging stay consistent in one place.
 *
 * NEVER log `url` (it carries `api_key` in the query string) — log `endpoint`/`params` only.
 */
export async function airlabsRequest<T>(
  endpoint: string,
  params: Record<string, string | number | undefined> = {},
  { timeoutMs = 9000, retries = 1 }: { timeoutMs?: number; retries?: number } = {}
): Promise<T> {
  if (!serverEnv.AIRLABS_API_KEY) {
    throw new ProviderError('AIRLABS_API_KEY is not configured', 'invalid')
  }

  const url = new URL(`${BASE_URL}/${endpoint}`)
  url.searchParams.set('api_key', serverEnv.AIRLABS_API_KEY)
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value))
  }

  let lastError: unknown
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetch(url.toString(), { signal: controller.signal })

      if (res.status === 429) throw new ProviderError('AirLabs rate limit exceeded', 'rate_limit')
      if (res.status >= 500) throw new ProviderError('AirLabs outage', 'outage')
      if (!res.ok) throw new ProviderError(`AirLabs request failed with status ${res.status}`, 'invalid')

      const body = (await res.json()) as AirLabsEnvelope<T>
      if (body.error) {
        const message = body.error.message ?? 'AirLabs request failed'
        const kind = body.error.code === 'not_found' ? 'not_found' : 'invalid'
        throw new ProviderError(message, kind)
      }
      return (body.response ?? ([] as unknown as T)) as T
    } catch (err) {
      lastError = err
      const isTimeout = err instanceof Error && err.name === 'AbortError'
      const isRetryable = isTimeout || (err instanceof ProviderError && (err.kind === 'outage' || err.kind === 'timeout'))
      if (!isRetryable || attempt === retries) break
    } finally {
      clearTimeout(timer)
    }
  }

  if (lastError instanceof ProviderError) throw lastError
  if (lastError instanceof Error && lastError.name === 'AbortError') {
    throw new ProviderError('AirLabs request timed out', 'timeout')
  }
  console.error(`[airlabs] ${endpoint} failed:`, lastError instanceof Error ? lastError.message : lastError)
  throw new ProviderError('Unknown AirLabs error', 'unknown')
}
