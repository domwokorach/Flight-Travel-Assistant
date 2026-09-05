import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import TimerIcon from '@mui/icons-material/Timer'
import SplitFlapText from '../board/SplitFlapText'

export default function AirportSnapshot() {
  return (
    <Card sx={{ p: { xs: 2.5, sm: 3 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Box>
          <Typography variant="overline" sx={{ fontSize: 11, color: 'text.secondary' }}>Airport snapshot</Typography>
          <Typography sx={{ mt: 0.5, fontWeight: 800, fontSize: 18 }}>London Heathrow · T5</Typography>
        </Box>
        <Chip label="Operations normal" size="small" sx={{ bgcolor: 'success.light', color: 'success.dark' }} />
      </Stack>
      <Stack spacing={1.5} sx={{ mt: 2.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ borderRadius: 4, bgcolor: 'action.hover', p: 1.5 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ fontSize: 14, fontWeight: 700, color: 'text.primary' }}>
            <VerifiedUserIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <span>Security</span>
          </Stack>
          <Typography sx={{ fontSize: 14, fontWeight: 800 }}>8–12 min</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ borderRadius: 4, bgcolor: 'action.hover', p: 1.5 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ fontSize: 14, fontWeight: 700, color: 'text.primary' }}>
            <MeetingRoomIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <span>Gate</span>
          </Stack>
          <SplitFlapText value="B42" sx={{ fontSize: 14, color: 'primary.main' }} />
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ borderRadius: 4, bgcolor: '#FDECDD', p: 1.5 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ fontSize: 14, fontWeight: 700, color: '#7C3E07' }}>
            <TimerIcon sx={{ fontSize: 18 }} />
            <span>Gate closes</span>
          </Stack>
          <SplitFlapText value="14:55" sx={{ fontSize: 14, color: '#7C3E07' }} />
        </Stack>
      </Stack>
      <Link
        href="#airport"
        underline="hover"
        sx={{ mt: 2, display: 'inline-flex', alignItems: 'center', gap: 0.75, fontSize: 14, fontWeight: 800, color: 'primary.main' }}
      >
        Airport services <ArrowForwardIcon sx={{ fontSize: 16 }} />
      </Link>
    </Card>
  )
}
