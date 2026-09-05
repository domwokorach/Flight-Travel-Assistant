import React from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import NavigationIcon from '@mui/icons-material/Navigation'
import MapIcon from '@mui/icons-material/Map'

export default function MobileTravelBar({ countdown, onAlert }) {
  const { formatted, tone } = countdown
  const isUrgent = tone === 'orange' || tone === 'rose'

  return (
    <Paper
      elevation={0}
      sx={{
        display: { xs: 'block', md: 'none' },
        position: 'fixed',
        insetInline: 0,
        bottom: 0,
        zIndex: 30,
        borderTop: '1px solid',
        borderColor: 'divider',
        borderRadius: 0,
        p: 1,
        boxShadow: '0 -10px 30px rgba(20,24,31,0.10)',
      }}
    >
      <Box sx={{ mx: 'auto', maxWidth: 480, display: 'grid', gridTemplateColumns: '1fr auto auto', alignItems: 'center', gap: 1 }}>
        <Box
          component="button"
          type="button"
          onClick={onAlert}
          sx={{
            minWidth: 0,
            textAlign: 'left',
            borderRadius: 3,
            bgcolor: '#FDECDD',
            px: 1.5,
            py: 1,
            border: 'none',
            cursor: 'pointer',
            minHeight: 44,
            ...(isUrgent && {
              animation: 'travelBarPulse 1.6s ease-in-out infinite',
              '@keyframes travelBarPulse': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.75 } },
            }),
          }}
        >
          <Typography noWrap sx={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#B4530A' }}>
            BA117 · Boarding
          </Typography>
          <Typography noWrap sx={{ fontSize: 14, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
            Gate B42 · closes {formatted}
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<NavigationIcon />} sx={{ px: 1.5, minHeight: 44 }}>
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Directions</Box>
        </Button>
        <IconButton aria-label="Airport map" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, width: 44, height: 44 }}>
          <MapIcon fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  )
}
