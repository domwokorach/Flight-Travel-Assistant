interface Entry<T> {
  value: T
  expiresAt: number
}

const store = new Map<string, Entry<unknown>>()

/**
 * Process-local cache. Fluid Compute reuses warm instances across requests,
 * so this meaningfully cuts provider calls without needing a shared store.
 * It is best-effort only — never assume a hit across cold starts or instances.
 */
export async function withServerCache<T>(key: string, ttlMs: number, loader: () => Promise<T>): Promise<T> {
  const hit = store.get(key)
  if (hit && hit.expiresAt > Date.now()) {
    return hit.value as T
  }
  const value = await loader()
  store.set(key, { value, expiresAt: Date.now() + ttlMs })
  return value
}

export function getStaleServerCache<T>(key: string): T | null {
  const hit = store.get(key)
  return hit ? (hit.value as T) : null
}

export function setServerCache<T>(key: string, value: T, ttlMs: number) {
  store.set(key, { value, expiresAt: Date.now() + ttlMs })
}
