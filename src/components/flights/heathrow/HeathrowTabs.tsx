import React from 'react'
import { PlaneTakeoff, PlaneLanding, Radar } from 'lucide-react'
import { cn } from '@/lib/utils'

export type HeathrowTab = 'departure' | 'arrival' | 'track'

const TABS: { key: HeathrowTab; label: string; icon: typeof PlaneTakeoff }[] = [
  { key: 'departure', label: 'Departures', icon: PlaneTakeoff },
  { key: 'arrival', label: 'Arrivals', icon: PlaneLanding },
  { key: 'track', label: 'Track Flight Live', icon: Radar },
]

interface HeathrowTabsProps {
  value: HeathrowTab
  onChange: (value: HeathrowTab) => void
}

export default function HeathrowTabs({ value, onChange }: HeathrowTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Flight views"
      className="flex w-full items-center gap-1 overflow-x-auto rounded-full border border-border bg-muted p-1 no-scrollbar sm:w-fit"
    >
      {TABS.map(({ key, label, icon: Icon }) => {
        const active = value === key
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(key)}
            className={cn(
              'relative inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-bold whitespace-nowrap transition-colors sm:px-4',
              active ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        )
      })}
    </div>
  )
}
