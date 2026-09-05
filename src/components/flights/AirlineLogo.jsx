import React from 'react'
import { Plane } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { getAirline } from '@/data/airlines'

const sizes = {
  sm: 'size-8',
  md: 'size-12',
  lg: 'size-14',
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

function getInitials(name, code) {
  if (code) return code
  if (!name) return '—'
  const words = name.split(' ').filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

/**
 * Airline identity chip. Renders a supplied `logoUrl` when available (contain-fit,
 * never stretched); otherwise falls back to a circular initials badge tinted with
 * the airline's brand color, or a neutral plane glyph if the airline is unknown.
 */
export default function AirlineLogo({ airlineName, airlineCode, logoUrl, size = 'md', fallback, className }) {
  const airline = airlineCode ? getAirline(airlineCode) : undefined
  const name = airlineName || airline?.name
  const label = name ? `${name}${airlineCode ? ` (${airlineCode})` : ''}` : airlineCode || 'Airline'
  const showPlane = fallback === 'plane' || (!airline && !airlineCode && !name)

  return (
    <Avatar className={cn(sizes[size] || sizes.md, 'rounded-xl', className)} role="img" aria-label={label}>
      {logoUrl && <AvatarImage src={logoUrl} alt={`${label} logo`} className="bg-white p-1" />}
      <AvatarFallback
        className={cn(
          'rounded-xl font-extrabold',
          textSizes[size] || textSizes.md,
          showPlane ? 'bg-accent text-muted-foreground' : 'text-white'
        )}
        style={!showPlane ? { backgroundColor: airline?.color || '#334155' } : undefined}
      >
        {showPlane ? <Plane className={cn(iconSizes[size] || iconSizes.md, '-rotate-45')} /> : getInitials(name, airlineCode)}
      </AvatarFallback>
    </Avatar>
  )
}
