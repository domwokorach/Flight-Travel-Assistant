import React from 'react'
import { Card } from '../ui/card'
import JourneyTimeline from '../flights/JourneyTimeline'

export default function YourJourney() {
  return (
    <Card className="mb-5 p-5 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4"><div><p className="eyebrow">Your journey</p><h3 className="mt-1 text-lg font-black text-foreground">Check-in to take-off</h3></div><span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">Boarding</span></div>
      <JourneyTimeline stages={['Check-in', 'Security', 'Gate', 'Boarding', 'Flight']} currentIndex={3} />
    </Card>
  )
}
