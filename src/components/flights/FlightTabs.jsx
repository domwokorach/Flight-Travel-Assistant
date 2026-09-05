import React from 'react'
import { PlaneTakeoff, PlaneLanding, ArrowLeftRight } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const tabs = [
  { key: 'departure', label: 'Departures', icon: PlaneTakeoff },
  { key: 'arrival', label: 'Arrivals', icon: PlaneLanding },
  { key: 'connection', label: 'Connecting', icon: ArrowLeftRight },
]

export default function FlightTabs({ value, onChange }) {
  return (
    <Tabs value={value} onValueChange={onChange}>
      <TabsList aria-label="Flight views">
        {tabs.map(({ key, label, icon: Icon }) => (
          <TabsTrigger key={key} value={key}>
            <Icon />
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
