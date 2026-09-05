import React, { useState } from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EventIcon from '@mui/icons-material/Event'
import NavigationIcon from '@mui/icons-material/Navigation'
import ShareIcon from '@mui/icons-material/Share'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ScheduleIcon from '@mui/icons-material/Schedule'
import FlightStatusBadge from './FlightStatusBadge'
import AirlineLogo from './AirlineLogo'
import SplitFlapText from '../board/SplitFlapText'
import { useSnackbar } from '../../lib/snackbar'

function TimePair({ label, scheduled, actual }) {
  const changed = actual && actual !== '—' && actual !== scheduled
  return (
    <Box>
      <Typography variant="overline" sx={{ fontSize: 11, color: 'text.secondary' }}>{label}</Typography>
      <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mt: 0.5 }}>
        <SplitFlapText
          value={scheduled}
          sx={{
            fontSize: 18,
            color: changed ? 'text.secondary' : 'text.primary',
            textDecoration: changed ? 'line-through' : 'none',
          }}
        />
        {changed && <SplitFlapText value={actual} sx={{ fontSize: 18, color: 'warning.dark' }} />}
      </Stack>
    </Box>
  )
}

export default function FlightCard({ flight, featured = false }) {
  const { notify } = useSnackbar()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleAction = (action) => {
    setAnchorEl(null)
    if (action === 'calendar') notify(`${flight.flightNumber} added to calendar`, { severity: 'success' })
    if (action === 'directions') notify(`Directions to Gate ${flight.from.gate}`, { severity: 'info' })
    if (action === 'share') notify(`Link copied for ${flight.flightNumber}`, { severity: 'info' })
  }

  return (
    <Card
      sx={{
        overflow: 'hidden',
        ...(featured && { boxShadow: '0 0 0 2px rgba(11,95,165,0.25)' }),
      }}
    >
      {featured && (
        <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', px: 2.5, py: 1, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Your flight · Boarding now
        </Box>
      )}
      <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="flex-start" gap={2}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <AirlineLogo airlineName={flight.airline} airlineCode={flight.airlineMark} logoUrl={flight.airlineLogo} />
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{flight.airline}</Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'text.secondary' }}>
                {flight.flightNumber} · {flight.airlineMark}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={0.75} alignItems="center">
            <FlightStatusBadge status={flight.status} pulse={flight.status === 'Boarding'} />
            <IconButton
              size="small"
              aria-label="Flight actions"
              aria-haspopup="menu"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ minWidth: 44, minHeight: 44 }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={() => handleAction('calendar')}>
                <ListItemIcon><EventIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Add to calendar</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleAction('directions')}>
                <ListItemIcon><NavigationIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Get directions</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleAction('share')}>
                <ListItemIcon><ShareIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Share flight</ListItemText>
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>

        <Box sx={{ mt: 3, overflow: 'hidden', borderRadius: 4, bgcolor: 'board.bg' }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ px: { xs: 2, sm: 3 }, py: 2.5 }}
          >
            <Box>
              <SplitFlapText value={flight.from.code} sx={{ fontSize: { xs: 36, sm: 44 }, fontWeight: 600, color: 'board.text' }} />
              <Typography sx={{ mt: 0.5, fontSize: 14, fontWeight: 500, color: 'board.muted' }}>{flight.from.city}</Typography>
            </Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box sx={{ width: { xs: 20, sm: 48 }, height: '1px', bgcolor: 'rgba(255,255,255,0.15)' }} />
              <FlightTakeoffIcon sx={{ color: '#38BDF8' }} />
              <Box sx={{ width: { xs: 20, sm: 48 }, height: '1px', bgcolor: 'rgba(255,255,255,0.15)' }} />
            </Stack>
            <Box sx={{ textAlign: 'right' }}>
              <SplitFlapText value={flight.to.code} sx={{ fontSize: { xs: 36, sm: 44 }, fontWeight: 600, color: 'board.text', justifyContent: 'flex-end' }} />
              <Typography sx={{ mt: 0.5, fontSize: 14, fontWeight: 500, color: 'board.muted' }}>{flight.to.city}</Typography>
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            mt: 3,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
            gap: 2,
            py: 2.5,
            borderTop: '1px solid',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <TimePair label="Departure" scheduled={flight.scheduledDeparture} actual={flight.actualDeparture} />
          <Box>
            <Typography variant="overline" sx={{ fontSize: 11, color: 'text.secondary' }}>Boarding</Typography>
            <SplitFlapText value={flight.boarding} sx={{ display: 'flex', mt: 0.5, fontSize: 18, color: 'text.primary' }} />
          </Box>
          <TimePair label="Arrival" scheduled={flight.scheduledArrival} actual={flight.actualArrival} />
          <Box>
            <Typography variant="overline" sx={{ fontSize: 11, color: 'text.secondary' }}>Duration</Typography>
            <Typography sx={{ mt: 0.5, fontSize: 18, fontWeight: 800 }}>{flight.duration}</Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 2.5, display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 2 }}>
          <Stack direction="row" spacing={1}>
            <MeetingRoomIcon sx={{ fontSize: 18, color: 'text.secondary', mt: 0.25 }} />
            <Box>
              <Typography variant="overline" sx={{ fontSize: 11, color: 'text.secondary' }}>Terminal</Typography>
              <Typography sx={{ mt: 0.5, fontSize: 14, fontWeight: 700 }}>{flight.from.terminal}</Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <LocationOnIcon sx={{ fontSize: 18, color: 'text.secondary', mt: 0.25 }} />
            <Box>
              <Typography variant="overline" sx={{ fontSize: 11, color: 'text.secondary' }}>Gate</Typography>
              <SplitFlapText value={flight.from.gate} sx={{ mt: 0.5, fontSize: 14, fontWeight: 700, color: flight.status === 'Gate Change' ? 'secondary.dark' : 'text.primary' }} />
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <ScheduleIcon sx={{ fontSize: 18, color: 'text.secondary', mt: 0.25 }} />
            <Box>
              <Typography variant="overline" sx={{ fontSize: 11, color: 'text.secondary' }}>Gate closes</Typography>
              <SplitFlapText value={flight.gateCloses} sx={{ mt: 0.5, fontSize: 14, fontWeight: 700 }} />
            </Box>
          </Stack>
          <Box sx={{ gridColumn: { xs: 'span 2', sm: 'span 1' }, borderRadius: 4, bgcolor: 'action.hover', px: 2, py: 1.5 }}>
            <Typography variant="overline" sx={{ fontSize: 11, color: 'text.secondary' }}>Update</Typography>
            <Typography sx={{ mt: 0.5, fontSize: 12, fontWeight: 600, lineHeight: 1.5, color: 'text.primary' }}>{flight.note}</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}
