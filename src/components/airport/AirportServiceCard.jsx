import React from 'react'
import {
  Building2,
  Briefcase,
  ShieldCheck,
  ScanFace,
  Coffee,
  ShoppingBag,
  UtensilsCrossed,
  Luggage,
  HelpCircle,
  Wifi,
  BatteryCharging,
  MapPin,
} from 'lucide-react'
import { Card } from '@/components/ui/card'

const icons = {
  terminal: Building2,
  checkin: Briefcase,
  security: ShieldCheck,
  passport: ScanFace,
  lounge: Coffee,
  shop: ShoppingBag,
  food: UtensilsCrossed,
  baggage: Luggage,
  lost: HelpCircle,
  wifi: Wifi,
  charge: BatteryCharging,
}

export default function AirportServiceCard({ title, detail, icon }) {
  const Icon = icons[icon] || MapPin
  return (
    <Card className="p-5">
      <div className="flex gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-accent text-muted-foreground">
          <Icon className="size-4.5" />
        </div>
        <div>
          <p className="text-sm font-extrabold">{title}</p>
          <p className="mt-1 text-xs leading-relaxed font-semibold text-muted-foreground">{detail}</p>
        </div>
      </div>
    </Card>
  )
}
