import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'

const stages = [
  { time: '30 min', label: 'Gate announced', dot: 'rgba(20,24,31,0.35)', min: 20 },
  { time: '20 min', label: 'Boarding', dot: '#0B5FA5', min: 15 },
  { time: '15 min', label: 'Gate closing soon', dot: '#F0851A', min: 5 },
  { time: '5 min', label: 'Proceed immediately', dot: '#C0293A', min: 0 },
  { time: '0 min', label: 'Gate closed', dot: '#14181F', min: -1 },
]

export default function AlertEscalation({ countdown }) {
  const activeIndex = countdown ? stages.findIndex(s => countdown.minutes > s.min) : -1

  return (
    <Card sx={{ p: { xs: 2.5, sm: 3 } }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box sx={{ width: 40, height: 40, borderRadius: 3, bgcolor: '#FDECDD', color: '#B4530A', display: 'grid', placeItems: 'center' }}>
          <NotificationsActiveIcon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="overline" sx={{ fontSize: 11, color: 'text.secondary' }}>Gate alert logic</Typography>
          <Typography sx={{ fontWeight: 800 }}>Escalates as departure approaches</Typography>
        </Box>
      </Stack>
      <Stack spacing={1} sx={{ mt: 2.5 }}>
        {stages.map((stage, i) => {
          const active = i === activeIndex
          return (
            <Box
              key={stage.time}
              sx={{
                display: 'grid',
                gridTemplateColumns: '48px 12px 1fr',
                alignItems: 'center',
                gap: 1.5,
                borderRadius: 3,
                px: 1,
                py: 0.5,
                bgcolor: active ? '#FDECDD' : 'transparent',
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 800, color: 'text.secondary' }}>{stage.time}</Typography>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: stage.dot,
                  ...(active && {
                    animation: 'escalationPulse 1.6s ease-in-out infinite',
                    '@keyframes escalationPulse': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.4 } },
                  }),
                }}
              />
              <Typography sx={{ fontSize: 14, fontWeight: 700, color: active ? '#B4530A' : 'text.primary' }}>
                {stage.label}
              </Typography>
            </Box>
          )
        })}
      </Stack>
    </Card>
  )
}
