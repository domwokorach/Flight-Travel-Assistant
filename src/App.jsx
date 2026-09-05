import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TriangleAlert } from 'lucide-react'
import Header from './components/navigation/Header'
import CommandMenu from './components/navigation/CommandMenu'
import MobileTravelBar from './components/alerts/MobileTravelBar'
import GateAlert from './components/alerts/GateAlert'
import FlightsPage from './sections/FlightsPage'
import AirportPage from './sections/AirportPage'
import TransportPage from './sections/TransportPage'
import { useFlightTracking } from './hooks/useFlights'
import { useLiveGateCountdown } from './hooks/useLiveGateCountdown'
import { useFlightEvents, useNotificationPermission } from './hooks/useFlightEvents'
import { useSnackbar } from './lib/snackbar'
import { FOLLOWED_FLIGHT_NUMBER as FOLLOWED_FLIGHT } from './lib/followedFlight'

export default function App() {
  const [alertOpen, setAlertOpen] = useState(true)
  const [commandOpen, setCommandOpen] = useState(false)
  const { flight } = useFlightTracking(FOLLOWED_FLIGHT)
  const countdown = useLiveGateCountdown(flight)
  const previousLabel = useRef(countdown.label)
  const { notify } = useSnackbar()
  const { notify: nativeNotify } = useNotificationPermission()

  useEffect(() => {
    if (previousLabel.current !== countdown.label) {
      previousLabel.current = countdown.label
      if (countdown.tone === 'orange' || countdown.tone === 'rose') {
        notify(countdown.label, {
          description: `British Airways ${FOLLOWED_FLIGHT} · Gate ${flight?.origin.gate ?? '—'}`,
          severity: 'warning',
          icon: <TriangleAlert className="size-4" />,
        })
        if (!alertOpen) setAlertOpen(true)
      }
    }
  }, [countdown.label, countdown.tone, alertOpen, notify, flight])

  const handleFlightEvent = useCallback(
    (event) => {
      notify(event.title, {
        description: event.description,
        severity: event.type === 'cancelled' ? 'error' : event.type === 'gate_change' || event.type === 'terminal_change' ? 'warning' : 'info',
        icon: <TriangleAlert className="size-4" />,
      })
      nativeNotify(event.title, event.description)
    },
    [notify, nativeNotify]
  )
  useFlightEvents(flight, handleFlightEvent)

  return (
    <div id="top" className="min-h-screen bg-background pb-24 md:pb-0">
      <Header onOpenCommandMenu={() => setCommandOpen(true)} />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <FlightsPage countdown={countdown} />
        <AirportPage />
        <TransportPage />
        <footer className="mt-16 border-t border-border py-8 text-center">
          <p className="text-xs font-bold text-muted-foreground">
            FlightPath · Live departures, arrivals and connections, powered by real flight, weather, airport and transport data
          </p>
        </footer>
      </main>
      <MobileTravelBar countdown={countdown} onAlert={() => setAlertOpen(true)} flight={flight} />
      <GateAlert countdown={countdown} open={alertOpen} onOpenChange={setAlertOpen} flight={flight} />
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} onOpenGateAlert={() => setAlertOpen(true)} />
    </div>
  )
}
