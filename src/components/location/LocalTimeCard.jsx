import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useLocalTime } from '../../hooks/useLocalTime'

export default function LocalTimeCard({ offsetHours, offsetLabel }) {
  const time = useLocalTime(offsetHours)
  return (
    <Box sx={{ borderRadius: 4, bgcolor: 'text.primary', color: 'background.paper', p: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ opacity: 0.7 }}>
        <AccessTimeIcon sx={{ fontSize: 16 }} />
        <Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Local time</Typography>
      </Stack>
      <Typography sx={{ mt: 1, fontSize: 28, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{time}</Typography>
      <Typography sx={{ mt: 0.5, fontSize: 12, fontWeight: 600, opacity: 0.7 }}>{offsetLabel}</Typography>
    </Box>
  )
}
