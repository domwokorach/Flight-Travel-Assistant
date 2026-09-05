import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import JourneyTimeline from '../flights/JourneyTimeline'

export default function YourJourney() {
  return (
    <Card className="mb-3 p-5 sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold text-muted-foreground">Your journey</p>
          <p className="mt-1 text-lg font-extrabold">Check-in to take-off</p>
        </div>
        <Badge className="bg-primary/15 text-primary-light">Boarding</Badge>
      </div>
      <JourneyTimeline stages={['Check-in', 'Security', 'Gate', 'Boarding', 'Flight']} currentIndex={3} />
    </Card>
  )
}
