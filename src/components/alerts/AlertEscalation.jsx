import React from 'react'
import { BellRing } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

const stages = [
  { time: '30 min', label: 'Gate announced', dot: 'rgba(20,24,31,0.35)', min: 20 },
  { time: '20 min', label: 'Boarding', dot: '#0B5FA5', min: 15 },
  { time: '15 min', label: 'Gate closing soon', dot: '#F0851A', min: 5 },
  { time: '5 min', label: 'Proceed immediately', dot: '#C0293A', min: 0 },
  { time: '0 min', label: 'Gate closed', dot: '#14181F', min: -1 },
]

export default function AlertEscalation({ countdown }) {
  const activeIndex = countdown ? stages.findIndex((s) => countdown.minutes > s.min) : -1

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#FDECDD] text-[#B4530A]">
          <BellRing className="size-4.5" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-muted-foreground">Gate alert logic</p>
          <p className="font-extrabold">Escalates as departure approaches</p>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-1">
        {stages.map((stage, i) => {
          const active = i === activeIndex
          return (
            <div
              key={stage.time}
              className={cn('grid grid-cols-[48px_12px_1fr] items-center gap-3 rounded-2xl px-2 py-1', active && 'bg-[#FDECDD]')}
            >
              <p className="text-xs font-extrabold text-muted-foreground">{stage.time}</p>
              <span
                className={cn('size-2.5 rounded-full', active && 'motion-safe:animate-[status-pulse_1.6s_ease-in-out_infinite]')}
                style={{ backgroundColor: stage.dot }}
              />
              <p className={cn('text-sm font-bold', active ? 'text-[#B4530A]' : 'text-foreground')}>{stage.label}</p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
