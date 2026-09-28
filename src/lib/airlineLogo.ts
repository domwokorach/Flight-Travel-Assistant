import { publicEnv } from '@/config/env'

const LOGO_DEV_HOST = 'https://img.logo.dev'

interface GetAirlineLogoUrlParams {
  /** Verified marketing domain (e.g. "britishairways.com"). See src/data/airlines.js. */
  domain?: string | null
  /**
   * Company-name lookup (Logo.dev's `/name/{name}` Brand Search). NOT used automatically by
   * AirlineLogo — verified live against the real API that `fallback=404` (spec §9), which
   * works correctly for domain lookup (an unknown domain does return a real 404), does NOT
   * work for name lookup: an unresolvable name still returns HTTP 200 with a generated
   * monogram, so there's no error to detect and fall back from. Using it automatically would
   * silently show Logo.dev's own placeholder for any airline missing from the domain map,
   * which spec §9/§10 explicitly rules out. Kept here only for explicit, opt-in use if a
   * caller wants to accept that risk, or if Logo.dev's behavior changes.
   */
  airlineName?: string | null
  /** Logo.dev `size` query value (the returned asset's pixel dimensions) — pass the
   *  rendered size already multiplied for the container/DPI you're targeting; `retina=true`
   *  is always added on top per spec. */
  size?: number
  theme?: 'light' | 'dark'
}

/**
 * Central Logo.dev URL builder (spec §6) — the only place that constructs a Logo.dev URL.
 * Returns null when no verified domain is available and no explicit `airlineName` override
 * was requested, so callers skip straight to the application-controlled IATA/initials/plane
 * fallback (spec §10) instead of hitting Logo.dev's name endpoint at all — see the
 * `airlineName` doc above for why.
 */
export function getAirlineLogoUrl({ domain, airlineName, size = 128, theme = 'dark' }: GetAirlineLogoUrlParams): string | null {
  const token = publicEnv.NEXT_PUBLIC_LOGO_DEV_TOKEN
  if (!token) return null

  const path = domain ? `/${encodeURIComponent(domain)}` : airlineName ? `/name/${encodeURIComponent(airlineName)}` : null
  if (!path) return null

  const params = new URLSearchParams({
    token,
    format: 'png',
    theme,
    retina: 'true',
    fallback: '404',
    size: String(size),
  })

  return `${LOGO_DEV_HOST}${path}?${params.toString()}`
}
