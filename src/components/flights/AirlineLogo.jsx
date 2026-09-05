import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import FlightIcon from '@mui/icons-material/Flight'
import { getAirline } from '../../data/airlines'

const sizes = {
  sm: 32,
  md: 48,
  lg: 56,
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
export default function AirlineLogo({ airlineName, airlineCode, logoUrl, size = 'md', fallback, sx }) {
  const [imgFailed, setImgFailed] = useState(false)
  const airline = airlineCode ? getAirline(airlineCode) : undefined
  const name = airlineName || airline?.name
  const label = name ? `${name}${airlineCode ? ` (${airlineCode})` : ''}` : airlineCode || 'Airline'
  const dimension = sizes[size] || sizes.md

  if (logoUrl && !imgFailed) {
    return (
      <Avatar
        src={logoUrl}
        alt={`${label} logo`}
        variant="rounded"
        imgProps={{ onError: () => setImgFailed(true), style: { objectFit: 'contain' } }}
        sx={{ width: dimension, height: dimension, bgcolor: 'common.white', border: '1px solid', borderColor: 'divider', p: 0.5, borderRadius: 3, ...sx }}
      />
    )
  }

  if (fallback === 'plane' || (!airline && !airlineCode && !name)) {
    return (
      <Avatar
        variant="rounded"
        role="img"
        aria-label={label}
        sx={{ width: dimension, height: dimension, bgcolor: 'action.hover', color: 'text.secondary', borderRadius: 3, ...sx }}
      >
        <FlightIcon sx={{ fontSize: dimension * 0.5, transform: 'rotate(-45deg)' }} />
      </Avatar>
    )
  }

  return (
    <Avatar
      variant="rounded"
      role="img"
      aria-label={label}
      sx={{
        width: dimension,
        height: dimension,
        bgcolor: airline?.color || '#334155',
        color: '#fff',
        fontWeight: 800,
        fontSize: dimension * 0.32,
        borderRadius: 3,
        ...sx,
      }}
    >
      {getInitials(name, airlineCode)}
    </Avatar>
  )
}
