import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepConnector from '@mui/material/StepConnector'
import useMediaQuery from '@mui/material/useMediaQuery'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import FlightIcon from '@mui/icons-material/Flight'
import ScheduleIcon from '@mui/icons-material/Schedule'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import TimerIcon from '@mui/icons-material/Timer'
import FlightStatusBadge from './FlightStatusBadge'
import AirlineLogo from './AirlineLogo'
import SplitFlapText from '../board/SplitFlapText'

function codeFromFlightNumber(flightNumber) {
  return flightNumber?.match(/^[A-Z]{2}/)?.[0]
}

const urgencyStyles = {
  urgent: { bg: '#FBE7E9', fg: '#8F1F2C', border: '#F3C3C8' },
  limited: { bg: '#FDF2D8', fg: '#8A5A05', border: '#F3DFA6' },
  comfortable: { bg: '#E4F6EC', fg: '#0B7A44', border: '#BFE7D1' },
}

function FlightLeg({ eyebrow, flight, arriveOrDepart, arriveOrDepartLabel, cityFrom, cityTo }) {
  return (
    <Box sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', p: 2.5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <AirlineLogo size="sm" airlineName={flight.airline} airlineCode={codeFromFlightNumber(flight.flightNumber)} />
          <Box>
            <Typography variant="overline" sx={{ fontSize: 11, color: 'text.secondary' }}>{eyebrow}</Typography>
            <Typography sx={{ fontWeight: 800, fontSize: 14 }}>{flight.flightNumber} · {flight.airline}</Typography>
          </Box>
        </Stack>
        <FlightStatusBadge status={flight.status} />
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2.5 }}>
        <Box>
          <SplitFlapText value={flight.from} sx={{ fontSize: 24 }} />
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.secondary' }}>{cityFrom}</Typography>
        </Box>
        <FlightIcon sx={{ fontSize: 20, color: 'primary.main', transform: 'rotate(90deg)' }} />
        <Box sx={{ textAlign: 'right' }}>
          <SplitFlapText value={flight.to} sx={{ fontSize: 24, justifyContent: 'flex-end' }} />
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.secondary' }}>{cityTo}</Typography>
        </Box>
      </Stack>
      <Typography sx={{ mt: 2, fontSize: 13, fontWeight: 600, color: 'text.secondary' }}>
        {arriveOrDepartLabel}: Terminal {flight.terminal} · Gate {flight.gate}
      </Typography>
    </Box>
  )
}

export default function ConnectionCard({ journey }) {
  const isMobile = useMediaQuery('(max-width: 899px)')
  const urgency = urgencyStyles[journey.urgency] || urgencyStyles.comfortable

  return (
    <Card sx={{ overflow: 'hidden' }}>
      <Box sx={{ borderBottom: '1px solid', borderColor: urgency.border, bgcolor: urgency.bg, color: urgency.fg, px: 2.5, py: 2 }}>
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={1.5}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <WarningAmberIcon fontSize="small" />
            <Typography sx={{ fontWeight: 800 }}>{journey.connectionStatus}</Typography>
          </Stack>
          <Typography sx={{ fontWeight: 700, fontSize: 14 }}>Layover {journey.layover}</Typography>
        </Stack>
      </Box>

      <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3, overflow: 'hidden', borderRadius: 4, bgcolor: 'board.bg', px: 2, py: 1.5 }}>
          {journey.route.map((code, i) => (
            <React.Fragment key={code}>
              {i > 0 && <ArrowForwardIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.3)' }} />}
              <SplitFlapText value={code} sx={{ fontSize: { xs: 22, sm: 26 }, color: 'board.text' }} />
            </React.Fragment>
          ))}
        </Stack>

        <Stepper
          orientation={isMobile ? 'vertical' : 'horizontal'}
          alternativeLabel={!isMobile}
          activeStep={-1}
          connector={<StepConnector sx={{ '& .MuiStepConnector-line': { borderColor: 'divider' } }} />}
          sx={{ mb: 3 }}
        >
          <Step>
            <StepLabel StepIconComponent={() => null}>
              <FlightLeg
                eyebrow="Current flight"
                flight={journey.currentFlight}
                arriveOrDepartLabel="Arrival"
                cityFrom="London"
                cityTo={`Arrive ${journey.currentFlight.arrival}`}
              />
            </StepLabel>
          </Step>
          <Step>
            <StepLabel
              StepIconComponent={() => (
                <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'text.primary', color: 'background.paper', display: 'grid', placeItems: 'center' }}>
                  <Typography sx={{ fontSize: 11, fontWeight: 800 }}>AMS</Typography>
                </Box>
              )}
            >
              <Typography sx={{ fontWeight: 800, fontSize: 13 }}>Amsterdam</Typography>
              <Typography sx={{ fontSize: 11, fontWeight: 600, color: 'text.secondary' }}>Connection</Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={() => null}>
              <FlightLeg
                eyebrow="Connecting flight"
                flight={journey.nextFlight}
                arriveOrDepartLabel="Departure"
                cityFrom="Amsterdam"
                cityTo={`Depart ${journey.nextFlight.departure}`}
              />
            </StepLabel>
          </Step>
        </Stepper>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 1.5 }}>
          <Box sx={{ borderRadius: 4, bgcolor: 'action.hover', p: 1.75 }}>
            <ScheduleIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="overline" sx={{ display: 'block', mt: 1, fontSize: 11, color: 'text.secondary' }}>Layover</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{journey.layover}</Typography>
          </Box>
          <Box sx={{ borderRadius: 4, bgcolor: 'action.hover', p: 1.75 }}>
            <DirectionsWalkIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="overline" sx={{ display: 'block', mt: 1, fontSize: 11, color: 'text.secondary' }}>Gate transit</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{journey.walkTime}</Typography>
          </Box>
          <Box sx={{ borderRadius: 4, bgcolor: 'action.hover', p: 1.75 }}>
            <TimerIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="overline" sx={{ display: 'block', mt: 1, fontSize: 11, color: 'text.secondary' }}>Boarding</Typography>
            <SplitFlapText value={journey.nextFlight.boarding} sx={{ mt: 0.5, fontSize: 14, fontWeight: 700 }} />
          </Box>
          <Box sx={{ borderRadius: 4, bgcolor: '#FDF2D8', p: 1.75 }}>
            <WarningAmberIcon sx={{ fontSize: 18, color: '#8A5A05' }} />
            <Typography variant="overline" sx={{ display: 'block', mt: 1, fontSize: 11, color: '#8A5A05' }}>Gate closes</Typography>
            <SplitFlapText value={journey.boardingDeadline} sx={{ mt: 0.5, fontSize: 14, fontWeight: 700, color: '#8A5A05' }} />
          </Box>
        </Box>

        <Button variant="contained" sx={{ mt: 3, width: { xs: '100%', sm: 'auto' } }}>Show connection route</Button>
      </Box>
    </Card>
  )
}
