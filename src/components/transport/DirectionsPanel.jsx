import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import NavigationIcon from '@mui/icons-material/Navigation'
import MapIcon from '@mui/icons-material/Map'

export default function DirectionsPanel() {
  return (
    <Card sx={{ overflow: 'hidden', bgcolor: '#0B1220', color: '#fff' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 360px' } }}>
        <Box sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography sx={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7DD3FC' }}>
            Door to gate
          </Typography>
          <Typography variant="h5" sx={{ mt: 1, color: '#fff' }}>Keep the journey moving</Typography>
          <Typography sx={{ mt: 1, maxWidth: 480, fontSize: 14, fontWeight: 500, lineHeight: 1.6, color: '#CBD5E1' }}>
            Open step-by-step airport directions, check terminal transfers, or continue from JFK with the fastest available transport option.
          </Typography>
          <Stack direction="row" flexWrap="wrap" spacing={1.5} sx={{ mt: 2.5, rowGap: 1.5 }}>
            <Button variant="contained" startIcon={<NavigationIcon />} sx={{ bgcolor: '#0EA5E9', '&:hover': { bgcolor: '#38BDF8' } }}>
              Get directions
            </Button>
            <Button variant="outlined" startIcon={<MapIcon />} sx={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff', bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)' } }}>
              View airport map
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            position: 'relative',
            minHeight: 176,
            borderTop: { xs: '1px solid rgba(255,255,255,0.1)', lg: 'none' },
            borderLeft: { lg: '1px solid rgba(255,255,255,0.1)' },
            background: 'radial-gradient(circle at 20% 30%, rgba(14,165,233,.28), transparent 32%), radial-gradient(circle at 75% 70%, rgba(59,130,246,.22), transparent 35%)',
          }}
        >
          <Box sx={{ position: 'absolute', inset: 24, borderRadius: 5, border: '1px solid rgba(255,255,255,0.1)' }}>
            <Box sx={{ position: 'absolute', left: '18%', top: '62%', width: 12, height: 12, borderRadius: '50%', bgcolor: '#fff', boxShadow: '0 0 0 8px rgba(56,189,248,0.2)' }} />
            <Box sx={{ position: 'absolute', right: '18%', top: '28%', width: 12, height: 12, borderRadius: '50%', bgcolor: '#38BDF8', boxShadow: '0 0 0 8px rgba(56,189,248,0.2)' }} />
          </Box>
        </Box>
      </Box>
    </Card>
  )
}
