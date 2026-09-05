import React from 'react'
import { motion } from 'framer-motion'
import { BellRing } from 'lucide-react'
import { Card } from '../ui/card'
import { staggerContainer } from '@/lib/motion'

const stages = [
  { time: '30 min', label: 'Gate announced', dot: 'bg-muted-foreground/40', min: 20 },
  { time: '20 min', label: 'Boarding', dot: 'bg-sky-500', min: 15 },
  { time: '15 min', label: 'Gate closing soon', dot: 'bg-orange-500', min: 5 },
  { time: '5 min', label: 'Proceed immediately', dot: 'bg-rose-500', min: 0 },
  { time: '0 min', label: 'Gate closed', dot: 'bg-foreground', min: -1 },
]

export default function AlertEscalation({ countdown }) {
  const activeIndex = countdown ? stages.findIndex(s => countdown.minutes > s.min) : -1

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"><BellRing className="h-5 w-5"/></div>
        <div><p className="eyebrow">Gate alert logic</p><h3 className="font-black text-foreground">Escalates as departure approaches</h3></div>
      </div>
      <motion.div variants={staggerContainer(0.05)} initial="hidden" animate="show" className="mt-5 space-y-3">
        {stages.map((stage, i) => {
          const active = i === activeIndex
          return (
            <motion.div
              key={stage.time}
              variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
              className={`grid grid-cols-[48px_12px_1fr] items-center gap-3 rounded-xl px-2 py-1 transition-colors ${active ? 'bg-orange-50 dark:bg-orange-500/10' : ''}`}
            >
              <span className="text-xs font-black text-muted-foreground">{stage.time}</span>
              <span className={`h-2.5 w-2.5 rounded-full ${stage.dot} ${active ? 'motion-safe:animate-pulse' : ''}`}/>
              <span className={`text-sm font-bold ${active ? 'text-orange-700 dark:text-orange-400' : 'text-foreground/80'}`}>{stage.label}</span>
            </motion.div>
          )
        })}
      </motion.div>
    </Card>
  )
}
