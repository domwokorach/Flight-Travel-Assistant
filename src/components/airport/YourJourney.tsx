import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Bell, BellOff } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import JourneyTimeline from '../flights/JourneyTimeline'
import { LiveIndicator } from '../common/LiveIndicator'
import { useFlightTracking } from '@/hooks/useFlights'
import { usePushNotifications } from '@/hooks/usePushNotifications'
import { computeJourneyState } from '@/lib/journey/journeyStage'
import { FOLLOWED_FLIGHT_NUMBER } from '@/lib/followedFlight'
import type { JourneyStage } from '@/types/journey'

const STAGES = ['Check-in', 'Security', 'Gate', 'Boarding', 'Flight']

const STAGE_INDEX: Record<JourneyStage, number> = {
  check_in: 0,
  security: 1,
  passport_control: 1,
  lounge: 1,
  gate: 2,
  boarding: 3,
  in_flight: 4,
  connection: 4,
  baggage_reclaim: 4,
  ground_transport: 4,
  destination: 4,
}

/**
 * Persistent live journey assistant (spec §13/§36): combines the followed flight's
 * real status with the journey engine to answer "what should the traveller do next".
 */
export default function YourJourney() {
  const { flight, connectionState, lastUpdated } = useFlightTracking(FOLLOWED_FLIGHT_NUMBER)
  const journey = flight ? computeJourneyState(flight, null, 8) : null
  const currentIndex = journey ? STAGE_INDEX[journey.stage] ?? 0 : 0
  const push = usePushNotifications(FOLLOWED_FLIGHT_NUMBER)

  return (
    <Card className="mb-3 p-5 sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold text-muted-foreground">Your journey</p>
          <p className="mt-1 text-lg font-extrabold">Check-in to take-off</p>
          <div className="mt-1.5">
            <LiveIndicator state={connectionState} lastUpdated={lastUpdated} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(push.status === 'subscribed' || push.status === 'unsubscribed') && (
            <Button
              variant="outline"
              size="icon"
              aria-label={push.status === 'subscribed' ? 'Turn off notifications' : 'Get notified of gate/delay changes'}
              onClick={() => (push.status === 'subscribed' ? push.unsubscribe() : push.subscribe())}
            >
              {push.status === 'subscribed' ? <Bell className="size-4" /> : <BellOff className="size-4" />}
            </Button>
          )}
          <Badge className="bg-primary/15 text-primary-light">{flight?.statusText ?? 'Loading'}</Badge>
        </div>
      </div>

      <JourneyTimeline stages={STAGES} currentIndex={currentIndex} />

      <AnimatePresence mode="wait">
        {journey && (
          <motion.div
            key={journey.headline}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mt-6 rounded-2xl bg-primary p-4 text-primary-foreground sm:p-5"
          >
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase opacity-80">Keep your journey moving</p>
            <p className="mt-1 text-lg font-extrabold sm:text-xl">{journey.headline}</p>
            <p className="mt-1 text-sm font-semibold opacity-90">{journey.subline}</p>
            <Button variant="secondary" className="mt-4 bg-white text-primary hover:bg-white/90">
              {journey.ctaLabel}
              <ArrowRight className="size-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
