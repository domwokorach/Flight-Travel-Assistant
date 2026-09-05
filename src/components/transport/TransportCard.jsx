import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import TrainIcon from '@mui/icons-material/Train'
import TramIcon from '@mui/icons-material/Tram'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import NavigationIcon from '@mui/icons-material/Navigation'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ScheduleIcon from '@mui/icons-material/Schedule'

const icons = { train: TrainIcon, metro: TramIcon, bus: DirectionsBusIcon, taxi: LocalTaxiIcon, car: DirectionsCarIcon }

export default function TransportCard({ item }) {
  const Icon = icons[item.kind] || NavigationIcon
  return (
    <Card sx={{ p: 2.5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Stack direction="row" spacing={1.5}>
          <Box sx={{ width: 44, height: 44, borderRadius: 4, bgcolor: 'primary.light', color: 'primary.dark', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <Icon fontSize="small" />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800 }}>{item.mode}</Typography>
            <Typography sx={{ mt: 0.25, fontSize: 12, fontWeight: 700, color: 'success.dark' }}>{item.status}</Typography>
          </Box>
        </Stack>
        <Chip label={`Next ${item.next}`} size="small" sx={{ bgcolor: 'action.hover', color: 'text.secondary' }} />
      </Stack>
      <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, borderRadius: 4, bgcolor: 'action.hover', p: 1.5 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ fontSize: 13, fontWeight: 700 }}>
          <ScheduleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <span>{item.time}</span>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ fontSize: 13, fontWeight: 700 }}>
          <AttachMoneyIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <span>{item.price}</span>
        </Stack>
      </Box>
      <Button variant="outlined" fullWidth startIcon={<NavigationIcon />} sx={{ mt: 2 }}>
        Get directions
      </Button>
    </Card>
  )
}
