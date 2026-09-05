import React from 'react'
import { motion } from 'framer-motion'
import { Map, Navigation } from 'lucide-react'
import { Button } from '../ui/button'
import { urgencyMotion } from '@/lib/motion'

export default function MobileTravelBar({ countdown, onAlert }) {
  const { formatted, tone } = countdown
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, ...{ type: 'spring', stiffness: 300, damping: 30 } }}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 p-2 shadow-[0_-10px_30px_rgba(15,23,42,.10)] backdrop-blur md:hidden"
    >
      <div className="mx-auto grid max-w-lg grid-cols-[1fr_auto_auto] items-center gap-2">
        <motion.button
          onClick={onAlert}
          animate={urgencyMotion[tone] || urgencyMotion.slate}
          className="min-w-0 rounded-xl bg-orange-50 px-3 py-2 text-left dark:bg-orange-500/10"
        >
          <p className="truncate text-[10px] font-black uppercase tracking-wide text-orange-700 dark:text-orange-400">BA117 · Boarding</p>
          <p className="truncate text-sm font-black text-foreground">Gate B42 · closes {formatted}</p>
        </motion.button>
        <Button className="px-3"><Navigation className="h-4 w-4"/><span className="hidden min-[390px]:inline">Directions</span></Button>
        <Button variant="outline" className="px-3" aria-label="Airport map"><Map className="h-4 w-4"/></Button>
      </div>
    </motion.div>
  )
}
