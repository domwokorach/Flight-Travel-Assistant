import React from 'react'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import DoorFrontIcon from '@mui/icons-material/MeetingRoom'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ScheduleIcon from '@mui/icons-material/Schedule'
import FlightLandIcon from '@mui/icons-material/FlightLand'
import CancelIcon from '@mui/icons-material/Cancel'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'

const styles = {
  'On Time': { bg: '#E4F6EC', fg: '#0B7A44', icon: CheckCircleIcon },
  Boarding: { bg: '#E1F1FC', fg: '#0B5FA5', icon: FlightTakeoffIcon },
  'Gate Open': { bg: '#E0F7FA', fg: '#0F7C8A', icon: DoorFrontIcon },
  'Gate Closing': { bg: '#FDECDD', fg: '#B4530A', icon: WarningAmberIcon },
  Delayed: { bg: '#FDF2D8', fg: '#8A5A05', icon: ScheduleIcon },
  Departed: { bg: '#E8E7FB', fg: '#463FAE', icon: FlightTakeoffIcon },
  Arrived: { bg: '#E4F6EC', fg: '#0B7A44', icon: FlightLandIcon },
  Cancelled: { bg: '#FBE7E9', fg: '#8F1F2C', icon: CancelIcon },
  'Gate Change': { bg: '#EFE6FB', fg: '#5B2D9E', icon: SwapHorizIcon },
}

export default function FlightStatusBadge({ status, pulse = false }) {
  const style = styles[status] || { bg: 'action.hover', fg: 'text.secondary', icon: ScheduleIcon }
  const Icon = style.icon
  return (
    <Chip
      size="small"
      icon={
        pulse ? (
          <Box
            component="span"
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: style.fg,
              animation: 'statusPulse 1.6s ease-in-out infinite',
              '@keyframes statusPulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.35 },
              },
            }}
          />
        ) : (
          <Icon sx={{ fontSize: 16, color: `${style.fg} !important` }} />
        )
      }
      label={status}
      sx={{
        bgcolor: style.bg,
        color: style.fg,
        fontWeight: 700,
        '& .MuiChip-icon': { ml: '10px' },
      }}
    />
  )
}
