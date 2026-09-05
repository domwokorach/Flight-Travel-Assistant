import React from 'react'
import { PlaneTakeoff, PlaneLanding, ArrowLeftRight } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { FlightTab } from '@/hooks/useFlightSearch'

const tabs: { key: FlightTab; label: string; icon: typeof PlaneTakeoff }[] = [
  { key: 'departure', label: 'Departures', icon: PlaneTakeoff },
  { key: 'arrival', label: 'Arrivals', icon: PlaneLanding },
  { key: 'connection', label: 'Connecting', icon: ArrowLeftRight },
]

interface FlightTabsProps {
  value: FlightTab
  onChange: (value: FlightTab) => void
}

export default function FlightTabs({ value, onChange }: FlightTabsProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as FlightTab)}>
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
