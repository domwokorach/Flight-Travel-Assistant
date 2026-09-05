import React from 'react'
import { TrainFront, TramFront, Bus, CarTaxiFront, Car, Navigation, DollarSign, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const icons = { train: TrainFront, metro: TramFront, bus: Bus, taxi: CarTaxiFront, car: Car }

export default function TransportCard({ item }) {
  const Icon = icons[item.kind] || Navigation
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-light text-primary-dark">
            <Icon className="size-4.5" />
          </div>
          <div>
            <p className="font-extrabold">{item.mode}</p>
            <p className="mt-0.5 text-xs font-bold text-success-dark">{item.status}</p>
          </div>
        </div>
        <Badge variant="secondary">Next {item.next}</Badge>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-accent p-3.5 *:min-w-0">
        <div className="flex items-center gap-2 text-[13px] font-bold">
          <Clock className="size-4 text-muted-foreground" />
          <span>{item.time}</span>
        </div>
        <div className="flex items-center gap-2 text-[13px] font-bold">
          <DollarSign className="size-4 text-muted-foreground" />
          <span>{item.price}</span>
        </div>
      </div>
      <Button variant="outline" className="mt-4 w-full">
        <Navigation className="size-4" />
        Get directions
      </Button>
    </Card>
  )
}
