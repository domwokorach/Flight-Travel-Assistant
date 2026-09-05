import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, DoorOpen, ShieldCheck, Timer } from 'lucide-react'
import { Card } from '../ui/card'
import { fadeInUp, smooth } from '@/lib/motion'

export default function AirportSnapshot() {
  return (
    <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} transition={smooth}>
      <Card className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div><p className="eyebrow">Airport snapshot</p><h3 className="mt-1 text-lg font-black text-foreground">London Heathrow · T5</h3></div>
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Operations normal</span>
        </div>
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between rounded-2xl bg-muted p-3"><span className="flex items-center gap-2 text-sm font-bold text-foreground/80"><ShieldCheck className="h-4 w-4 text-muted-foreground"/>Security</span><span className="text-sm font-black">8–12 min</span></div>
          <div className="flex items-center justify-between rounded-2xl bg-muted p-3"><span className="flex items-center gap-2 text-sm font-bold text-foreground/80"><DoorOpen className="h-4 w-4 text-muted-foreground"/>Gate</span><span className="text-sm font-black text-primary">B42</span></div>
          <div className="flex items-center justify-between rounded-2xl bg-orange-50 p-3 dark:bg-orange-500/10"><span className="flex items-center gap-2 text-sm font-bold text-orange-800 dark:text-orange-300"><Timer className="h-4 w-4"/>Gate closes</span><span className="text-sm font-black text-orange-900 dark:text-orange-200">14:55</span></div>
        </div>
        <a href="#airport" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:opacity-80">Airport services <ArrowRight className="h-4 w-4"/></a>
      </Card>
    </motion.div>
  )
}
