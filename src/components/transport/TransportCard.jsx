import React from 'react'
import { TrainFront, TramFront, Bus, CarTaxiFront, Car, Navigation, DollarSign, Clock, TriangleAlert } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LiveIndicator } from '@/components/common/LiveIndicator'

const icons = { train: TrainFront, metro: TramFront, bus: Bus, taxi: CarTaxiFront, car: Car }

const STATUS_TEXT_CLASS = {
  good_service: 'text-success-dark',
  minor_delays: 'text-warning-dark',
  severe_delays: 'text-error-dark',
  part_suspended: 'text-error-dark',
  service_closed: 'text-error-dark',
  unknown: 'text-muted-foreground',
}

function openDirections(originQuery, destinationQuery) {
  const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(originQuery)}&destination=${encodeURIComponent(destinationQuery)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

export default function TransportCard({ item, originQuery, destinationQuery }) {
  const Icon = icons[item.kind] || Navigation
  const disrupted = item.status !== 'good_service' && item.status !== 'unknown'

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary-light">
            <Icon className="size-4.5" />
          </div>
          <div>
            <p className="font-extrabold">{item.mode}</p>
            <p className={`mt-0.5 text-xs font-bold ${STATUS_TEXT_CLASS[item.status] ?? 'text-muted-foreground'}`}>{item.statusText}</p>
          </div>
        </div>
        <Badge variant="secondary">{item.next ? `Next ${item.next}` : 'On demand'}</Badge>
      </div>

      {disrupted && item.alternative && (
        <div className="mt-3 flex items-start gap-2 rounded-2xl border border-warning/25 bg-warning-light p-3 text-warning-dark">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          <p className="text-xs font-semibold">
            Alternative: <span className="font-extrabold">{item.alternative.mode}</span> · {item.alternative.journeyTime}
          </p>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-accent p-3.5 *:min-w-0">
        <div className="flex items-center gap-2 text-[13px] font-bold">
          <Clock className="size-4 text-muted-foreground" />
          <span>{item.journeyTime}</span>
        </div>
        <div className="flex items-center gap-2 text-[13px] font-bold">
          <DollarSign className="size-4 text-muted-foreground" />
          <span>{item.price}</span>
        </div>
      </div>

      {item.isLive && (
        <div className="mt-3">
          <LiveIndicator state="live" />
        </div>
      )}

      <Button variant="outline" className="mt-4 w-full" onClick={() => openDirections(originQuery, destinationQuery)}>
        <Navigation className="size-4" />
        Get directions
      </Button>
    </Card>
  )
}
