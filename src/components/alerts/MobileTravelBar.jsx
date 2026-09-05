import React from 'react'
import { motion } from 'motion/react'
import { Navigation, Map } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function MobileTravelBar({ countdown, onAlert, flight }) {
  const { formatted, tone } = countdown
  const isUrgent = tone === 'orange' || tone === 'rose'
  const flightNumber = flight?.flightNumber ?? 'BA117'
  const gate = flight?.origin?.gate ?? 'B42'
  const statusLabel = flight?.statusText ?? 'Boarding'

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 block border-t border-border bg-card/95 p-2 backdrop-blur-sm md:hidden">
      <div className="mx-auto grid max-w-[480px] grid-cols-[1fr_auto_auto] items-center gap-2">
        <motion.button
          type="button"
          onClick={onAlert}
          className="min-h-11 min-w-0 rounded-2xl border border-warning/25 bg-warning-light px-3 py-2 text-left"
          animate={isUrgent ? { opacity: [1, 0.75, 1] } : { opacity: 1 }}
          transition={isUrgent ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } : undefined}
        >
          <p className="truncate text-[10px] font-extrabold text-warning-dark uppercase">{flightNumber} · {statusLabel}</p>
          <p className="truncate font-mono text-sm font-extrabold text-foreground tabular-nums">Gate {gate} · closes {formatted}</p>
        </motion.button>
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
