import React from 'react'
import { Check, Plane, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { StepDot, StepLine } from '@/components/common/Stepper'

interface JourneyTimelineProps {
  stages: string[]
  currentIndex?: number
}

export default function JourneyTimeline({ stages, currentIndex = 3 }: JourneyTimelineProps) {
  return (
    <div aria-label="Your journey progress">
      <div className="hidden sm:grid" style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}>
        {stages.map((stage, i) => {
          const done = i < currentIndex
          const current = i === currentIndex
          const isLast = i === stages.length - 1
          return (
            <div key={stage} className="flex items-center">
              <StepDot status={done ? 'done' : current ? 'current' : 'upcoming'}>
                {done ? (
                  <Check className="size-4" />
                ) : current ? (
                  stage === 'Flight' ? <Plane className="size-4" /> : <Circle className="size-2.5 fill-current" />
                ) : (
                  <Circle className="size-2 fill-current" />
                )}
              </StepDot>
              {!isLast && <StepLine status={done ? 'done' : 'upcoming'} />}
            </div>
          )
        })}
      </div>
      <div className="mt-2 hidden sm:grid" style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}>
        {stages.map((stage, i) => {
          const done = i < currentIndex
          const current = i === currentIndex
          return (
            <div key={stage} className="text-center">
              <p className={cn('text-sm font-bold', current ? 'text-primary' : done ? 'text-foreground' : 'text-muted-foreground')}>
                {stage}
              </p>
              {current && <p className="text-xs font-semibold text-primary/80">Current stage</p>}
            </div>
          )
        })}
      </div>

      <ol className="flex flex-col sm:hidden">
        {stages.map((stage, i) => {
          const done = i < currentIndex
          const current = i === currentIndex
          const isLast = i === stages.length - 1
          return (
            <li key={stage} className="flex gap-3">
              <div className="flex flex-col items-center">
                <StepDot status={done ? 'done' : current ? 'current' : 'upcoming'}>
                  {done ? (
                    <Check className="size-4" />
                  ) : current ? (
                    stage === 'Flight' ? <Plane className="size-4" /> : <Circle className="size-2.5 fill-current" />
                  ) : (
                    <Circle className="size-2 fill-current" />
                  )}
                </StepDot>
                {!isLast && <div className={cn('my-1 w-0.5 flex-1 min-h-6', done ? 'bg-success' : 'bg-border')} />}
              </div>
              <div className="pb-4">
                <p className={cn('text-sm font-bold', current ? 'text-primary' : done ? 'text-foreground' : 'text-muted-foreground')}>
                  {stage}
                </p>
                {current && <p className="text-xs font-semibold text-primary/80">Current stage</p>}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
