import React from 'react'
import { Navigation, Map } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function MobileTravelBar({ countdown, onAlert }) {
  const { formatted, tone } = countdown
  const isUrgent = tone === 'orange' || tone === 'rose'

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 block border-t border-border bg-card p-2 shadow-[0_-10px_30px_rgba(20,24,31,0.10)] md:hidden">
      <div className="mx-auto grid max-w-[480px] grid-cols-[1fr_auto_auto] items-center gap-2">
        <button
          type="button"
          onClick={onAlert}
          className={cn(
            'min-h-11 min-w-0 rounded-2xl bg-[#FDECDD] px-3 py-2 text-left',
            isUrgent && 'motion-safe:animate-[status-pulse_1.6s_ease-in-out_infinite]'
          )}
        >
          <p className="truncate text-[10px] font-extrabold text-[#B4530A] uppercase">BA117 · Boarding</p>
          <p className="truncate font-mono text-sm font-extrabold tabular-nums">Gate B42 · closes {formatted}</p>
        </button>
        <Button className="h-11 px-3.5">
          <Navigation className="size-4" />
          <span className="hidden sm:inline">Directions</span>
        </Button>
        <Button variant="outline" size="icon" aria-label="Airport map" className="size-11 rounded-xl">
          <Map className="size-4" />
        </Button>
      </div>
    </div>
  )
}
