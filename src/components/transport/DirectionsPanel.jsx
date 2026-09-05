import React from 'react'
import { motion } from 'framer-motion'
import { Map, Navigation } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { fadeInUp, smooth } from '@/lib/motion'

export default function DirectionsPanel() {
  return (
    <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} transition={smooth}>
      <Card className="overflow-hidden bg-slate-950 text-white">
        <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
          <div className="p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">Door to gate</p>
            <h3 className="mt-2 text-2xl font-black tracking-tight">Keep the journey moving</h3>
            <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-slate-300">Open step-by-step airport directions, check terminal transfers, or continue from JFK with the fastest available transport option.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button className="bg-sky-500 text-white hover:bg-sky-400"><Navigation className="h-4 w-4"/>Get directions</Button>
              <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10"><Map className="h-4 w-4"/>View airport map</Button>
            </div>
          </div>
          <div className="relative min-h-44 border-t border-white/10 bg-[radial-gradient(circle_at_20%_30%,rgba(14,165,233,.28),transparent_32%),radial-gradient(circle_at_75%_70%,rgba(59,130,246,.22),transparent_35%)] lg:border-l lg:border-t-0">
            <div className="absolute inset-6 rounded-3xl border border-white/10">
              <div className="absolute left-[18%] top-[62%] h-3 w-3 rounded-full bg-white ring-8 ring-sky-400/20"/>
              <div className="absolute right-[18%] top-[28%] h-3 w-3 rounded-full bg-sky-400 ring-8 ring-sky-400/20"/>
              <div className="absolute left-[22%] top-[58%] h-px w-[56%] -rotate-[21deg] border-t border-dashed border-sky-300/80"/>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
