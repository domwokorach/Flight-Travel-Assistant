import React from 'react'
import { ArrowDownToLine, ArrowUpFromLine, Shuffle } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'

const tabs = [
  { key: 'departure', label: 'Departures', icon: ArrowUpFromLine },
  { key: 'arrival', label: 'Arrivals', icon: ArrowDownToLine },
  { key: 'connection', label: 'Connecting', icon: Shuffle },
]

export default function FlightTabs({ value, onChange }) {
  return (
    <Tabs value={value} onValueChange={onChange}>
      <TabsList className="h-auto w-full gap-1 bg-muted p-1 sm:w-auto">
        {tabs.map(({ key, label, icon: Icon }) => (
          <TabsTrigger key={key} value={key} className="gap-2 px-3 py-2.5 text-sm font-bold data-active:shadow-sm">
            <Icon className="hidden h-4 w-4 sm:block" />
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
