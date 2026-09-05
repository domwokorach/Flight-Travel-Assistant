import React from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import CheckIcon from '@mui/icons-material/Check'
import FlightIcon from '@mui/icons-material/Flight'
import CircleIcon from '@mui/icons-material/FiberManualRecord'

function StageIcon({ done, current, stage }) {
  return (
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        border: '2px solid',
        borderColor: done ? 'success.main' : current ? 'primary.main' : 'divider',
        bgcolor: done ? 'success.main' : current ? 'primary.main' : 'background.paper',
        color: done || current ? '#fff' : 'text.secondary',
        ...(current && {
          animation: 'journeyPulse 1.8s ease-out infinite',
          '@keyframes journeyPulse': {
            '0%': { boxShadow: '0 0 0 0 rgba(11,95,165,0.35)' },
            '100%': { boxShadow: '0 0 0 8px rgba(11,95,165,0)' },
          },
        }),
      }}
    >
      {done ? (
        <CheckIcon sx={{ fontSize: 18 }} />
      ) : current ? (
        stage === 'Flight' ? <FlightIcon sx={{ fontSize: 18 }} /> : <CircleIcon sx={{ fontSize: 10 }} />
      ) : (
        <CircleIcon sx={{ fontSize: 8 }} />
      )}
    </Box>
  )
}

export default function JourneyTimeline({ stages, currentIndex = 3 }) {
  const isMobile = useMediaQuery('(max-width: 599px)')

  return (
    <Stepper
      activeStep={currentIndex}
      orientation={isMobile ? 'vertical' : 'horizontal'}
      alternativeLabel={!isMobile}
      aria-label="Your journey progress"
      sx={{
        '& .MuiStepConnector-line': {
          borderColor: 'divider',
        },
        '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
          borderColor: 'success.main',
        },
      }}
    >
      {stages.map((stage, i) => {
        const done = i < currentIndex
        const current = i === currentIndex
        return (
          <Step key={stage} completed={done}>
            <StepLabel StepIconComponent={() => <StageIcon done={done} current={current} stage={stage} />}>
              <Typography sx={{ fontWeight: 700, fontSize: 14, color: current ? 'primary.main' : done ? 'text.primary' : 'text.secondary' }}>
                {stage}
              </Typography>
              {current && (
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'primary.main', opacity: 0.8 }}>
                  Current stage
                </Typography>
              )}
            </StepLabel>
          </Step>
        )
      })}
    </Stepper>
  )
}
