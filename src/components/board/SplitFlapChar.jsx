import React from 'react'
import Box from '@mui/material/Box'
import { fontMono } from '../../theme'

/**
 * A single split-flap cell. Keying the inner span by `value` triggers a short
 * CSS fade/slide when the character changes; unchanged characters never
 * re-animate. Respects prefers-reduced-motion via the global CSS rule that
 * collapses animation/transition durations to ~0.
 */
export default function SplitFlapChar({ value, className, sx }) {
  const char = value === ' ' ? ' ' : value
  return (
    <Box
      component="span"
      className={className}
      sx={{
        position: 'relative',
        display: 'inline-block',
        width: '1ch',
        overflow: 'hidden',
        textAlign: 'center',
        fontFamily: fontMono,
        ...sx,
      }}
    >
      <Box
        key={char}
        component="span"
        sx={{
          display: 'block',
          animation: 'splitFlapIn 0.2s cubic-bezier(0.4,0,0.2,1)',
          '@keyframes splitFlapIn': {
            from: { opacity: 0, transform: 'translateY(-3px) scaleY(0.4)' },
            to: { opacity: 1, transform: 'translateY(0) scaleY(1)' },
          },
        }}
      >
        {char}
      </Box>
    </Box>
  )
}
