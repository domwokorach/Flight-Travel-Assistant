import React from 'react'
import { ArrowRight, ShieldCheck, DoorOpen, Timer } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SplitFlapText from '../board/SplitFlapText'

export default function AirportSnapshot() {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold text-muted-foreground">Airport snapshot</p>
          <p className="mt-1 text-lg font-extrabold">London Heathrow · T5</p>
        </div>
        <Badge className="bg-success-light text-success-dark">Operations normal</Badge>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center justify-between rounded-2xl bg-accent p-3.5">
          <div className="flex items-center gap-2 text-sm font-bold">
            <ShieldCheck className="size-4.5 text-muted-foreground" />
            <span>Security</span>
          </div>
          <p className="text-sm font-extrabold">8–12 min</p>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-accent p-3.5">
          <div className="flex items-center gap-2 text-sm font-bold">
            <DoorOpen className="size-4.5 text-muted-foreground" />
            <span>Gate</span>
          </div>
          <SplitFlapText value="B42" className="text-sm text-primary" />
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-warning/20 bg-warning-light p-3.5">
          <div className="flex items-center gap-2 text-sm font-bold text-warning-dark">
            <Timer className="size-4.5" />
            <span>Gate closes</span>
          </div>
          <SplitFlapText value="14:55" className="text-sm text-warning-dark" />
        </div>
      </div>
      <a href="#airport" className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-primary hover:underline">
        Airport services <ArrowRight className="size-4" />
      </a>
    </Card>
  )
}
