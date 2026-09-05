import React from 'react'
import Box from '@mui/material/Box'
import SplitFlapChar from './SplitFlapChar'
import { fontMono } from '../../theme'

/**
 * Airport split-flap display text. Uppercase, monospaced, tabular — reserved
 * for board moments (flight numbers, airport codes, times, gates, status),
 * never for body copy.
 */
export default function SplitFlapText({ value, sx, charSx }) {
  const chars = String(value ?? '').toUpperCase().split('')
  return (
    <Box
      component="span"
      role="text"
      aria-label={String(value ?? '')}
      sx={{
        display: 'inline-flex',
        fontFamily: fontMono,
        fontVariantNumeric: 'tabular-nums',
        ...sx,
      }}
    >
      <Box component="span" aria-hidden="true" sx={{ display: 'inline-flex' }}>
        {chars.map((ch, i) => (
          <SplitFlapChar key={i} value={ch} sx={charSx} />
        ))}
      </Box>
    </Box>
  )
}
