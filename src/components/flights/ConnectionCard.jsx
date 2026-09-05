import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock3, Footprints, Plane, Timer, TriangleAlert } from 'lucide-react'
import FlightStatusBadge from './FlightStatusBadge'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { fadeInUp, smooth, staggerContainer } from '@/lib/motion'

const urgencyClasses = {
  urgent: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400',
  limited: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400',
  comfortable: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400',
}

export default function ConnectionCard({ journey }) {
  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="show" transition={smooth}>
      <Card className="overflow-hidden">
        <div className={`border-b px-5 py-4 ${urgencyClasses[journey.urgency] || urgencyClasses.comfortable}`}>
          <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><TriangleAlert className="h-5 w-5"/><span className="font-black">{journey.connectionStatus}</span></div><span className="text-sm font-bold">Layover {journey.layover}</span></div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="mb-6 flex items-baseline gap-2 text-foreground"><span className="text-3xl font-black">LHR</span><ArrowRight className="h-5 w-5 text-muted-foreground"/><span className="text-3xl font-black">AMS</span><ArrowRight className="h-5 w-5 text-muted-foreground"/><span className="text-3xl font-black">JFK</span></div>

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="show"
            className="relative grid gap-5 md:grid-cols-[1fr_120px_1fr] md:items-center"
          >
            <motion.div variants={fadeInUp} className="rounded-2xl border border-border p-4">
              <div className="flex items-center justify-between gap-3"><div><p className="eyebrow">Current flight</p><p className="mt-1 font-black">{journey.currentFlight.flightNumber} · {journey.currentFlight.airline}</p></div><FlightStatusBadge status={journey.currentFlight.status}/></div>
              <div className="mt-4 flex items-center justify-between"><div><p className="text-2xl font-black">{journey.currentFlight.from}</p><p className="text-xs font-semibold text-muted-foreground">London</p></div><Plane className="h-5 w-5 rotate-90 text-primary"/><div className="text-right"><p className="text-2xl font-black">{journey.currentFlight.to}</p><p className="text-xs font-semibold text-muted-foreground">Arrive {journey.currentFlight.arrival}</p></div></div>
              <p className="mt-4 text-sm font-semibold text-muted-foreground">Arrival: Terminal {journey.currentFlight.terminal} · Gate {journey.currentFlight.gate}</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative flex items-center gap-3 md:block md:text-center">
              <div className="absolute left-4 top-0 h-full w-px bg-border md:left-0 md:top-4 md:h-px md:w-full"/>
              <div className="relative z-10 grid h-8 w-8 place-items-center rounded-full bg-foreground text-background md:mx-auto">
                <span className="text-xs font-black">AMS</span>
              </div>
              <div className="relative z-10 bg-card md:mt-2"><p className="text-xs font-black text-foreground">Amsterdam</p><p className="text-[11px] font-semibold text-muted-foreground">Connection</p></div>
            </motion.div>

            <motion.div variants={fadeInUp} className="rounded-2xl border border-border p-4">
              <div className="flex items-center justify-between gap-3"><div><p className="eyebrow">Connecting flight</p><p className="mt-1 font-black">{journey.nextFlight.flightNumber} · {journey.nextFlight.airline}</p></div><FlightStatusBadge status={journey.nextFlight.status}/></div>
              <div className="mt-4 flex items-center justify-between"><div><p className="text-2xl font-black">{journey.nextFlight.from}</p><p className="text-xs font-semibold text-muted-foreground">Amsterdam</p></div><Plane className="h-5 w-5 rotate-90 text-primary"/><div className="text-right"><p className="text-2xl font-black">{journey.nextFlight.to}</p><p className="text-xs font-semibold text-muted-foreground">Depart {journey.nextFlight.departure}</p></div></div>
              <p className="mt-4 text-sm font-semibold text-muted-foreground">Departure: Terminal {journey.nextFlight.terminal} · Gate {journey.nextFlight.gate}</p>
            </motion.div>
          </motion.div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl bg-muted p-3"><Clock3 className="h-4 w-4 text-muted-foreground"/><p className="metric-label mt-2">Layover</p><p className="metric-value">{journey.layover}</p></div>
            <div className="rounded-2xl bg-muted p-3"><Footprints className="h-4 w-4 text-muted-foreground"/><p className="metric-label mt-2">Gate transit</p><p className="metric-value">{journey.walkTime}</p></div>
            <div className="rounded-2xl bg-muted p-3"><Timer className="h-4 w-4 text-muted-foreground"/><p className="metric-label mt-2">Boarding</p><p className="metric-value">{journey.nextFlight.boarding}</p></div>
            <div className="rounded-2xl bg-amber-50 p-3 dark:bg-amber-500/10"><TriangleAlert className="h-4 w-4 text-amber-600 dark:text-amber-400"/><p className="metric-label mt-2">Gate closes</p><p className="metric-value text-amber-800 dark:text-amber-400">{journey.boardingDeadline}</p></div>
          </div>
          <Button className="mt-5 w-full sm:w-auto">Show connection route</Button>
        </div>
      </Card>
    </motion.div>
  )
}
