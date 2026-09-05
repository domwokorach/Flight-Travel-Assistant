import React from 'react'
import { TriangleAlert, Navigation, MapPin, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import AirlineLogo from '../flights/AirlineLogo'
import SplitFlapText from '../board/SplitFlapText'

const toneClasses = {
  slate: 'bg-accent text-foreground',
  sky: 'bg-primary text-primary-foreground',
  orange: 'bg-[#F0851A] text-white',
  rose: 'bg-error text-white',
}

function GateAlertBody({ countdown, onDismiss }) {
  const { minutes, formatted, label, message, tone } = countdown
  const tones = toneClasses[tone] || toneClasses.slate
  const isUrgent = tone === 'orange' || tone === 'rose'

  return (
    <>
      <div className={cn('-mx-1 -mt-1 rounded-t-2xl px-4 py-3', tones)}>
        <div className="flex items-center gap-2">
          <TriangleAlert className="size-4.5" />
          <p className="text-[13px] font-extrabold tracking-[0.06em] uppercase">Urgent travel alert</p>
        </div>
      </div>
      <div className="px-4 pt-5 pb-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <AirlineLogo airlineName="British Airways" airlineCode="BA" size="sm" />
            <div>
              <p
                className={cn(
                  'font-heading text-2xl font-extrabold',
                  isUrgent &&
                    (tone === 'rose'
                      ? 'motion-safe:animate-[gate-shake-strong_0.9s_ease-in-out_infinite]'
                      : 'motion-safe:animate-[gate-shake_1.6s_ease-in-out_infinite]')
                )}
              >
                {label}
              </p>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">British Airways BA117 to New York JFK</p>
            </div>
          </div>
          <div className="min-w-[90px] rounded-2xl bg-[#FDECDD] px-4 py-3 text-center">
            <p className="text-[10px] font-extrabold text-[#B4530A] uppercase">Closes in</p>
            <p className="font-mono text-[22px] font-extrabold text-[#8A3D08] tabular-nums">{formatted}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#F3C994] bg-[#FDECDD] p-4">
          <p className="text-[17px] font-extrabold text-[#7C3E07]">Gate B42 closes in {minutes} minutes</p>
          <p className="mt-1 text-[13px] font-semibold text-[#8A5A05]">{message}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 *:min-w-0">
          <div className="rounded-2xl bg-accent p-4">
            <MapPin className="size-4.5 text-muted-foreground" />
            <p className="mt-2 text-[11px] font-bold text-muted-foreground uppercase">Location</p>
            <SplitFlapText value="TERMINAL 5 · GATE B42" className="mt-1 text-[13px] font-bold" />
          </div>
          <div className="rounded-2xl bg-accent p-4">
            <Clock className="size-4.5 text-muted-foreground" />
            <p className="mt-2 text-[11px] font-bold text-muted-foreground uppercase">Estimated walk</p>
            <p className="mt-1 text-sm font-bold">8 min</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-foreground p-4 text-paper">
          <p className="text-[11px] font-bold tracking-[0.1em] uppercase opacity-70">Recommended action</p>
          <p className="mt-1 text-[17px] font-extrabold">Go to Gate Now</p>
        </div>

        <div className="mt-6 flex gap-3 pb-3">
          <Button className="h-11 flex-1">
            <Navigation className="size-4" />
            Get directions
          </Button>
          <Button variant="outline" className="h-11 flex-1" onClick={onDismiss}>
            Dismiss
          </Button>
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
        <DialogContent showCloseButton={false} className="max-w-lg p-4">
          <DialogTitle className="sr-only">Urgent travel alert: gate closing countdown for BA117</DialogTitle>
          <GateAlertBody countdown={countdown} onDismiss={dismiss} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" showCloseButton={false} className="p-4 pb-6">
        <SheetTitle className="sr-only">Urgent travel alert: gate closing countdown for BA117</SheetTitle>
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-border" />
        <GateAlertBody countdown={countdown} onDismiss={dismiss} />
      </SheetContent>
    </Sheet>
  )
}
