import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Header from './components/navigation/Header'
import CommandMenu from './components/navigation/CommandMenu'
import MobileTravelBar from './components/alerts/MobileTravelBar'
import GateAlert from './components/alerts/GateAlert'
import FlightsPage from './pages/FlightsPage'
import AirportPage from './pages/AirportPage'
import TransportPage from './pages/TransportPage'
import { useGateCountdown } from './hooks/useGateCountdown'
import { useSnackbar } from './lib/snackbar'

export default function App() {
  const [alertOpen, setAlertOpen] = useState(true)
  const [commandOpen, setCommandOpen] = useState(false)
  const countdown = useGateCountdown(14 * 60 + 32)
  const previousLabel = useRef(countdown.label)
  const { notify } = useSnackbar()

  useEffect(() => {
    if (previousLabel.current !== countdown.label) {
      previousLabel.current = countdown.label
      if (countdown.tone === 'orange' || countdown.tone === 'rose') {
        notify(countdown.label, {
          description: 'British Airways BA117 · Gate B42',
          severity: 'warning',
          icon: <WarningAmberIcon fontSize="small" />,
        })
        if (!alertOpen) setAlertOpen(true)
      }
    }
  }, [countdown.label, countdown.tone, alertOpen, notify])

  return (
    <Box id="top" sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: { xs: 12, md: 0 } }}>
      <Header onOpenCommandMenu={() => setCommandOpen(true)} />
      <Container maxWidth="lg" component="main" sx={{ py: { xs: 3, sm: 4 } }}>
        <FlightsPage countdown={countdown} />
        <AirportPage />
        <TransportPage />
        <Box component="footer" sx={{ mt: 8, borderTop: '1px solid', borderColor: 'divider', py: 4, textAlign: 'center' }}>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'text.secondary' }}>
            FlightPath prototype · Mock data structured for future flight, weather, airport and transport APIs
          </Typography>
        </Box>
      </Container>
      <MobileTravelBar countdown={countdown} onAlert={() => setAlertOpen(true)} />
      <GateAlert countdown={countdown} open={alertOpen} onOpenChange={setAlertOpen} />
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} onOpenGateAlert={() => setAlertOpen(true)} />
    </Box>
  )
}
