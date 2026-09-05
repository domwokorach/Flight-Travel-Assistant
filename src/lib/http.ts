export class ProviderError extends Error {
  kind: 'timeout' | 'rate_limit' | 'not_found' | 'outage' | 'invalid' | 'unknown'

  constructor(message: string, kind: ProviderError['kind'] = 'unknown') {
    super(message)
    this.kind = kind
    this.name = 'ProviderError'
  }
}

export async function fetchJson<T>(
  url: string,
  init: RequestInit & { timeoutMs?: number; revalidate?: number } = {}
): Promise<T> {
  const { timeoutMs = 8000, revalidate, ...rest } = init
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(url, {
      ...rest,
      signal: controller.signal,
      ...(revalidate !== undefined ? { next: { revalidate } } : {}),
    } as RequestInit)

    if (res.status === 404) throw new ProviderError('Resource not found', 'not_found')
    if (res.status === 429) throw new ProviderError('Provider rate limit exceeded', 'rate_limit')
    if (res.status >= 500) throw new ProviderError('Provider outage', 'outage')
    if (!res.ok) throw new ProviderError(`Request failed with status ${res.status}`, 'invalid')

    return (await res.json()) as T
  } catch (err) {
    if (err instanceof ProviderError) throw err
    if (err instanceof Error && err.name === 'AbortError') {
      throw new ProviderError('Provider request timed out', 'timeout')
    }
    throw new ProviderError(err instanceof Error ? err.message : 'Unknown provider error', 'unknown')
  } finally {
    clearTimeout(timer)
  }
}
