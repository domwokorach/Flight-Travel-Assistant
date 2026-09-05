import React from 'react'
import { motion } from 'framer-motion'
import { Clock3, MapPinned, Navigation, TriangleAlert } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '../ui/drawer'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { urgencyMotion } from '@/lib/motion'

const toneClasses = {
  slate: 'bg-muted text-foreground',
  sky: 'bg-primary text-primary-foreground',
  orange: 'bg-orange-500 text-white',
  rose: 'bg-rose-600 text-white',
}

function GateAlertBody({ countdown, onDismiss }) {
  const { minutes, formatted, label, message, tone } = countdown
  return (
    <>
      <div className={`-mx-4 -mt-4 px-5 py-4 sm:-mx-6 sm:-mt-6 ${toneClasses[tone] || toneClasses.slate}`}>
        <div className="flex items-center gap-2"><TriangleAlert className="h-5 w-5"/><span className="text-sm font-black uppercase tracking-wide">Urgent travel alert</span></div>
      </div>
      <div className="pt-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <motion.p
              animate={urgencyMotion[tone] || urgencyMotion.slate}
              className="text-2xl font-black tracking-tight text-foreground"
            >
              {label}
            </motion.p>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">British Airways BA117 to New York JFK</p>
          </div>
          <div className="rounded-2xl bg-orange-50 px-3 py-2 text-center dark:bg-orange-500/10">
            <p className="text-[10px] font-bold uppercase tracking-wide text-orange-700 dark:text-orange-400">Closes in</p>
            <p className="text-xl font-black tabular-nums text-orange-800 dark:text-orange-300">{formatted}</p>
          </div>
        </div>
        <div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-500/20 dark:bg-orange-500/10">
          <p className="text-lg font-black text-orange-950 dark:text-orange-200">Gate B42 closes in {minutes} minutes</p>
          <p className="mt-1 text-sm font-semibold text-orange-800 dark:text-orange-300">{message}</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-muted p-4"><MapPinned className="h-4 w-4 text-muted-foreground"/><p className="metric-label mt-2">Location</p><p className="metric-value">Terminal 5 · Gate B42</p></div>
          <div className="rounded-2xl bg-muted p-4"><Clock3 className="h-4 w-4 text-muted-foreground"/><p className="metric-label mt-2">Estimated walk</p><p className="metric-value">8 min</p></div>
        </div>
        <div className="mt-5 rounded-2xl bg-foreground p-4 text-background"><p className="text-xs font-bold uppercase tracking-[0.16em] opacity-70">Recommended action</p><p className="mt-1 text-lg font-black">Go to Gate Now</p></div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button className="w-full"><Navigation className="h-4 w-4"/>Get directions</Button>
          <Button variant="outline" onClick={onDismiss} className="w-full">Dismiss</Button>
        </div>
      </div>
    </>
  )
}

export default function GateAlert({ countdown, open, onOpenChange }) {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const dismiss = () => onOpenChange(false)

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="sr-only">
            <DialogTitle>Urgent travel alert</DialogTitle>
            <DialogDescription>Gate closing countdown for BA117</DialogDescription>
          </DialogHeader>
          <GateAlertBody countdown={countdown} onDismiss={dismiss} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>Urgent travel alert</DrawerTitle>
          <DrawerDescription>Gate closing countdown for BA117</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-6">
          <GateAlertBody countdown={countdown} onDismiss={dismiss} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
