import React from 'react'
import { motion } from 'framer-motion'
import { Bus, Car, Navigation, TrainFront, TramFront, CircleDollarSign, Clock3 } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { fadeInUp } from '@/lib/motion'

const icons = { train: TrainFront, metro: TramFront, bus: Bus, taxi: Car, car: Car }

export default function TransportCard({ item }) {
  const Icon = icons[item.kind] || Navigation
  return (
    <motion.div variants={fadeInUp}>
      <Card className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-accent-foreground"><Icon className="h-5 w-5"/></div>
            <div><h3 className="font-black text-foreground">{item.mode}</h3><p className="mt-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">{item.status}</p></div>
          </div>
          <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-bold text-muted-foreground">Next {item.next}</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-muted p-3">
          <div className="flex items-center gap-2 text-sm font-bold text-foreground/80"><Clock3 className="h-4 w-4 text-muted-foreground"/>{item.time}</div>
          <div className="flex items-center gap-2 text-sm font-bold text-foreground/80"><CircleDollarSign className="h-4 w-4 text-muted-foreground"/>{item.price}</div>
        </div>
        <Button variant="outline" className="mt-4 w-full"><Navigation className="h-4 w-4"/>Get directions</Button>
      </Card>
    </motion.div>
  )
}
