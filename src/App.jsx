import React, { useEffect, useRef, useState } from 'react'
import { TriangleAlert } from 'lucide-react'
import Header from './components/navigation/Header'
import CommandMenu from './components/navigation/CommandMenu'
import MobileTravelBar from './components/alerts/MobileTravelBar'
import GateAlert from './components/alerts/GateAlert'
import FlightsPage from './sections/FlightsPage'
import AirportPage from './sections/AirportPage'
import TransportPage from './sections/TransportPage'
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
          icon: <TriangleAlert className="size-4" />,
        })
        if (!alertOpen) setAlertOpen(true)
      }
    }
  }, [countdown.label, countdown.tone, alertOpen, notify])

  return (
    <div id="top" className="min-h-screen bg-background pb-24 md:pb-0">
      <Header onOpenCommandMenu={() => setCommandOpen(true)} />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <FlightsPage countdown={countdown} />
        <AirportPage />
        <TransportPage />
        <footer className="mt-16 border-t border-border py-8 text-center">
          <p className="text-xs font-bold text-muted-foreground">
            FlightPath prototype · Mock data structured for future flight, weather, airport and transport APIs
          </p>
        </footer>
      </main>
      <MobileTravelBar countdown={countdown} onAlert={() => setAlertOpen(true)} />
      <GateAlert countdown={countdown} open={alertOpen} onOpenChange={setAlertOpen} />
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} onOpenGateAlert={() => setAlertOpen(true)} />
    </div>
  )
}
