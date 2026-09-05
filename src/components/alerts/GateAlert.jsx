import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Drawer from '@mui/material/Drawer'
import useMediaQuery from '@mui/material/useMediaQuery'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import NavigationIcon from '@mui/icons-material/Navigation'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ScheduleIcon from '@mui/icons-material/Schedule'
import AirlineLogo from '../flights/AirlineLogo'
import SplitFlapText from '../board/SplitFlapText'

const toneColors = {
  slate: { bg: 'action.hover', fg: 'text.primary' },
  sky: { bg: 'primary.main', fg: 'primary.contrastText' },
  orange: { bg: '#F0851A', fg: '#fff' },
  rose: { bg: 'error.main', fg: '#fff' },
}

function GateAlertBody({ countdown, onDismiss }) {
  const { minutes, formatted, label, message, tone } = countdown
  const tones = toneColors[tone] || toneColors.slate
  const isUrgent = tone === 'orange' || tone === 'rose'

  return (
    <>
      <Box sx={{ mx: -3, mt: -3, px: 3, py: 2, bgcolor: tones.bg, color: tones.fg, borderTopLeftRadius: 'inherit', borderTopRightRadius: 'inherit' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <WarningAmberIcon fontSize="small" />
          <Typography sx={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Urgent travel alert
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ pt: 2.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <AirlineLogo airlineName="British Airways" airlineCode="BA" size="sm" />
            <Box>
              <Typography
                variant="h5"
                component="p"
                sx={{
                  fontSize: 24,
                  ...(isUrgent && {
                    animation: tone === 'rose' ? 'gateShakeStrong 0.9s ease-in-out infinite' : 'gateShake 1.6s ease-in-out infinite',
                  }),
                  '@keyframes gateShake': { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.015)' } },
                  '@keyframes gateShakeStrong': { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.035)' } },
                }}
              >
                {label}
              </Typography>
              <Typography sx={{ mt: 0.5, fontSize: 14, fontWeight: 600, color: 'text.secondary' }}>
                British Airways BA117 to New York JFK
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ borderRadius: 4, bgcolor: '#FDECDD', px: 2, py: 1.5, textAlign: 'center', minWidth: 90 }}>
            <Typography sx={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#B4530A' }}>Closes in</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#8A3D08', fontVariantNumeric: 'tabular-nums' }}>{formatted}</Typography>
          </Box>
        </Stack>

        <Box sx={{ mt: 2.5, borderRadius: 4, border: '1px solid #F3C994', bgcolor: '#FDECDD', p: 2 }}>
          <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#7C3E07' }}>Gate B42 closes in {minutes} minutes</Typography>
          <Typography sx={{ mt: 0.5, fontSize: 13, fontWeight: 600, color: '#8A5A05' }}>{message}</Typography>
        </Box>

        <Box sx={{ mt: 2.5, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
          <Box sx={{ borderRadius: 4, bgcolor: 'action.hover', p: 2 }}>
            <LocationOnIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="overline" sx={{ display: 'block', mt: 1, fontSize: 11, color: 'text.secondary' }}>Location</Typography>
            <SplitFlapText value="TERMINAL 5 · GATE B42" sx={{ mt: 0.5, fontSize: 13, fontWeight: 700 }} />
          </Box>
          <Box sx={{ borderRadius: 4, bgcolor: 'action.hover', p: 2 }}>
            <ScheduleIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="overline" sx={{ display: 'block', mt: 1, fontSize: 11, color: 'text.secondary' }}>Estimated walk</Typography>
            <Typography sx={{ mt: 0.5, fontSize: 14, fontWeight: 700 }}>8 min</Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 2.5, borderRadius: 4, bgcolor: 'text.primary', color: 'background.paper', p: 2 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7 }}>
            Recommended action
          </Typography>
          <Typography sx={{ mt: 0.5, fontSize: 17, fontWeight: 800 }}>Go to Gate Now</Typography>
        </Box>

        <Stack direction="row" spacing={1.5} sx={{ mt: 2.5 }}>
          <Button variant="contained" fullWidth startIcon={<NavigationIcon />} sx={{ minHeight: 44 }}>
            Get directions
          </Button>
          <Button variant="outlined" fullWidth onClick={onDismiss} sx={{ minHeight: 44 }}>
            Dismiss
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default function GateAlert({ countdown, open, onOpenChange }) {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const dismiss = () => onOpenChange(false)

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onClose={dismiss}
        maxWidth="sm"
        fullWidth
        aria-labelledby="gate-alert-title"
        PaperProps={{ sx: { p: 3 } }}
      >
        <Typography id="gate-alert-title" sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
          Urgent travel alert: gate closing countdown for BA117
        </Typography>
        <GateAlertBody countdown={countdown} onDismiss={dismiss} />
      </Dialog>
    )
  }

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={dismiss}
      PaperProps={{ sx: { p: 3, pb: 4 } }}
    >
      <Typography sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        Urgent travel alert: gate closing countdown for BA117
      </Typography>
      <Box sx={{ width: 40, height: 4, borderRadius: 999, bgcolor: 'divider', mx: 'auto', mb: 2 }} />
      <GateAlertBody countdown={countdown} onDismiss={dismiss} />
    </Drawer>
  )
}
