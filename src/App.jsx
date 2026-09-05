import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { TriangleAlert } from 'lucide-react'
import Header from './components/navigation/Header'
import CommandMenu from './components/navigation/CommandMenu'
import MobileTravelBar from './components/alerts/MobileTravelBar'
import GateAlert from './components/alerts/GateAlert'
import FlightsPage from './pages/FlightsPage'
import AirportPage from './pages/AirportPage'
import TransportPage from './pages/TransportPage'
import { useGateCountdown } from './hooks/useGateCountdown'

export default function App() {
  const [alertOpen, setAlertOpen] = useState(true)
  const [commandOpen, setCommandOpen] = useState(false)
  const countdown = useGateCountdown(14 * 60 + 32)
  const previousLabel = useRef(countdown.label)

  useEffect(() => {
    if (previousLabel.current !== countdown.label) {
      previousLabel.current = countdown.label
      if (countdown.tone === 'orange' || countdown.tone === 'rose') {
        toast.warning(countdown.label, {
          description: 'British Airways BA117 · Gate B42',
          icon: <TriangleAlert className="h-4 w-4" />,
        })
        if (!alertOpen) setAlertOpen(true)
      }
    }
  }, [countdown.label, countdown.tone, alertOpen])

  return (
    <div id="top" className="min-h-screen bg-background pb-24 md:pb-0">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-20%,rgba(14,165,233,.12),transparent_32%)]" />
      <Header onOpenCommandMenu={() => setCommandOpen(true)} />
      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <FlightsPage countdown={countdown} />
        <AirportPage />
        <TransportPage />
        <footer className="mt-12 border-t border-border py-8 text-center text-xs font-semibold text-muted-foreground">FlightPath prototype · Mock data structured for future flight, weather, airport and transport APIs</footer>
      </main>
      <MobileTravelBar countdown={countdown} onAlert={() => setAlertOpen(true)} />
      <GateAlert countdown={countdown} open={alertOpen} onOpenChange={setAlertOpen} />
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} onOpenGateAlert={() => setAlertOpen(true)} />
    </div>
  )
}
