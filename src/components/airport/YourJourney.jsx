import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import JourneyTimeline from '../flights/JourneyTimeline'

export default function YourJourney() {
  return (
    <Card sx={{ mb: 2.5, p: { xs: 2.5, sm: 3 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ mb: 2.5 }}>
        <Box>
          <Typography variant="overline" sx={{ fontSize: 11, color: 'text.secondary' }}>Your journey</Typography>
          <Typography sx={{ mt: 0.5, fontWeight: 800, fontSize: 18 }}>Check-in to take-off</Typography>
        </Box>
        <Chip label="Boarding" size="small" sx={{ bgcolor: 'primary.light', color: 'primary.dark' }} />
      </Stack>
      <JourneyTimeline stages={['Check-in', 'Security', 'Gate', 'Boarding', 'Flight']} currentIndex={3} />
    </Card>
  )
}
