import React from 'react'
import { motion } from 'framer-motion'
import { Check, CircleDot, Plane } from 'lucide-react'
import { springy, staggerContainer } from '@/lib/motion'

export default function JourneyTimeline({ stages, currentIndex = 3 }) {
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      animate="show"
      className="grid gap-1 sm:grid-cols-5"
      aria-label="Your journey progress"
    >
      {stages.map((stage, i) => {
        const done = i < currentIndex
        const current = i === currentIndex
        return (
          <motion.div
            key={stage}
            variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
            transition={springy}
            className="relative flex items-center gap-3 rounded-2xl p-3 sm:block sm:text-center"
          >
            {i < stages.length - 1 && (
              <div className={`absolute left-7 top-11 h-[calc(100%-26px)] w-px sm:left-1/2 sm:top-6 sm:h-px sm:w-full ${done ? 'bg-emerald-400' : 'bg-border'}`} />
            )}
            <motion.div
              animate={current ? { boxShadow: ['0 0 0 0 rgba(2,132,199,0.35)', '0 0 0 8px rgba(2,132,199,0)'] } : {}}
              transition={current ? { duration: 1.8, repeat: Infinity, ease: 'easeOut' } : {}}
              className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 sm:mx-auto ${done ? 'border-emerald-500 bg-emerald-500 text-white' : current ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground'}`}
            >
              {done ? <Check className="h-4 w-4"/> : current ? (stage === 'Flight' ? <Plane className="h-4 w-4"/> : <CircleDot className="h-4 w-4"/>) : <span className="h-2 w-2 rounded-full bg-current"/>}
            </motion.div>
            <div className="relative z-10 sm:mt-2">
              <p className={`text-sm font-bold ${current ? 'text-primary' : done ? 'text-foreground' : 'text-muted-foreground'}`}>{stage}</p>
              {current && <p className="text-xs font-semibold text-primary/80">Current stage</p>}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
