import React from 'react'
import { motion } from 'framer-motion'
import { BatteryCharging, BriefcaseBusiness, Building2, CircleHelp, Coffee, Luggage, MapPin, ScanFace, ShieldCheck, ShoppingBag, Utensils, Wifi } from 'lucide-react'
import { Card } from '../ui/card'
import { fadeInUp } from '@/lib/motion'

const icons = {
  terminal: Building2, checkin: BriefcaseBusiness, security: ShieldCheck, passport: ScanFace,
  lounge: Coffee, shop: ShoppingBag, food: Utensils, baggage: Luggage, lost: CircleHelp, wifi: Wifi, charge: BatteryCharging,
}

export default function AirportServiceCard({ title, detail, icon }) {
  const Icon = icons[icon] || MapPin
  return (
    <motion.div variants={fadeInUp}>
      <Card className="p-4">
        <div className="flex gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-foreground/70"><Icon className="h-5 w-5"/></div>
          <div><h3 className="text-sm font-black text-foreground">{title}</h3><p className="mt-1 text-xs font-semibold leading-5 text-muted-foreground">{detail}</p></div>
        </div>
      </Card>
    </motion.div>
  )
}
