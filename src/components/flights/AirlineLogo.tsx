'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Plane } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/theme-provider'
import { getAirline, getAirlineDomain } from '@/data/airlines'
import { getAirlineLogoUrl } from '@/lib/airlineLogo'

const containerSizes = {
  sm: 'size-8',
  md: 'size-12',
  lg: 'size-14',
}

// Rendered px per size step — doubled when requesting the Logo.dev asset (spec §27's
// "32px UI → size ~64" table), since these are typically HiDPI/retina contexts.
const pxBySize = {
  sm: 32,
  md: 48,
  lg: 56,
}

const iconSizes = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-7',
}

const textSizes = {
  sm: 'text-[11px]',
  md: 'text-base',
  lg: 'text-lg',
}

type AirlineLogoSize = keyof typeof containerSizes

function getInitials(name?: string | null, code?: string | null): string {
  if (code) return code
  if (!name) return '—'
  const words = name.split(' ').filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

interface AirlineLogoProps {
  airlineName?: string | null
  /** IATA code — kept as the existing prop name used throughout the app. */
  airlineCode?: string | null
  airlineIcao?: string | null
  /** Verified marketing domain, if the caller already has one (e.g. from a normalized
   *  Flight). Falls back to src/data/airlines.js's mapping by `airlineCode` when omitted. */
  domain?: string | null
  /** Explicit logo URL override — takes priority over Logo.dev entirely, so a future
   *  provider that supplies its own logo URL doesn't need to go through Logo.dev at all. */
  logoUrl?: string | null
  size?: AirlineLogoSize
  fallback?: 'plane'
  className?: string
}

/**
 * Airline identity chip, backed by Logo.dev (spec §§3–10). Lookup priority:
 * explicit `logoUrl` override → verified domain → IATA/initials badge → plane glyph.
 *
 * The spec's original priority chain also included a company-name lookup as a fallback below
 * domain, but live testing against the real API found that Logo.dev's `/name/{name}` endpoint
 * doesn't honor `fallback=404` (an unresolvable name still returns HTTP 200 with a generated
 * monogram) — so there's no error for this component to catch, and using it automatically
 * would silently show Logo.dev's own placeholder in violation of spec §9/§10. Domain lookup
 * *does* 404 correctly for an unknown domain, so it's the only automatic Logo.dev step; an
 * airline missing from src/data/airlines.js's domain map goes straight to the IATA fallback.
 * Fix a wrong/missing logo by adding a domain there, not by special-casing a component.
 *
 * The IATA/initials fallback (spec §10) is intentionally neutral/monochrome, not
 * brand-tinted — colour in this design system is reserved for operational status, not logos.
 */
export default function AirlineLogo({
  airlineName,
  airlineCode,
  airlineIcao,
  domain,
  logoUrl,
  size = 'md',
  fallback,
  className,
}: AirlineLogoProps) {
  const { theme } = useTheme()
  const airline = airlineCode ? getAirline(airlineCode) : undefined
  const name = airlineName || airline?.name
  const resolvedDomain = domain ?? (airlineCode ? getAirlineDomain(airlineCode) : undefined)
  const label = name ? `${name}${airlineCode ? ` (${airlineCode})` : ''}` : airlineCode || 'Airline'

  const pxSize = pxBySize[size] || pxBySize.md
  // Domain lookup only — Logo.dev's name-based lookup doesn't honor fallback=404 (verified
  // live: an unresolvable name still returns HTTP 200 with a generated monogram), so there's
  // no error to catch and fall back from. See getAirlineLogoUrl's `airlineName` doc.
  const src = logoUrl || getAirlineLogoUrl({ domain: resolvedDomain, size: pxSize * 2, theme })

  const [failed, setFailed] = useState(false)
  // Reset failure state when the identity/source changes — otherwise a stale `failed` from a
  // previous airline in a reused list item would suppress a perfectly good next logo.
  useEffect(() => {
    setFailed(false)
  }, [src])

  const showPlane = fallback === 'plane' || (!airline && !airlineCode && !name)
  const showImage = Boolean(src) && !failed && !showPlane

  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        containerSizes[size] || containerSizes.md,
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-accent',
        className
      )}
    >
      {showImage && src ? (
        <Image
          src={src}
          alt={`${label} logo`}
          fill
          sizes={`${pxSize}px`}
          className="object-contain p-1.5"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className={cn(
            'flex size-full items-center justify-center rounded-full font-extrabold',
            textSizes[size] || textSizes.md,
            showPlane ? 'text-muted-foreground' : 'bg-foreground text-background'
          )}
        >
          {showPlane ? <Plane className={cn(iconSizes[size] || iconSizes.md, '-rotate-45')} /> : getInitials(name, airlineCode ?? airlineIcao)}
        </span>
      )}
    </span>
  )
}
