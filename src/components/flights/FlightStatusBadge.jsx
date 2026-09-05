import React from 'react'
import { CheckCircle, PlaneTakeoff, DoorOpen, TriangleAlert, Clock, PlaneLanding, XCircle, ArrowLeftRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const styles = {
  'On Time': { bg: 'bg-[#E4F6EC]', fg: 'text-[#0B7A44]', icon: CheckCircle },
  Boarding: { bg: 'bg-[#E1F1FC]', fg: 'text-[#0B5FA5]', icon: PlaneTakeoff },
  'Gate Open': { bg: 'bg-[#E0F7FA]', fg: 'text-[#0F7C8A]', icon: DoorOpen },
  'Gate Closing': { bg: 'bg-[#FDECDD]', fg: 'text-[#B4530A]', icon: TriangleAlert },
  Delayed: { bg: 'bg-[#FDF2D8]', fg: 'text-[#8A5A05]', icon: Clock },
  Departed: { bg: 'bg-[#E8E7FB]', fg: 'text-[#463FAE]', icon: PlaneTakeoff },
  Arrived: { bg: 'bg-[#E4F6EC]', fg: 'text-[#0B7A44]', icon: PlaneLanding },
  Cancelled: { bg: 'bg-[#FBE7E9]', fg: 'text-[#8F1F2C]', icon: XCircle },
  'Gate Change': { bg: 'bg-[#EFE6FB]', fg: 'text-[#5B2D9E]', icon: ArrowLeftRight },
}

export default function FlightStatusBadge({ status, pulse = false }) {
  const style = styles[status] || { bg: 'bg-accent', fg: 'text-muted-foreground', icon: Clock }
  const Icon = style.icon
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-bold',
        style.bg,
        style.fg
      )}
    >
      {pulse ? (
        <span className={cn('size-2 rounded-full motion-safe:animate-[status-pulse_1.6s_ease-in-out_infinite]', style.fg.replace('text-', 'bg-'))} />
      ) : (
        <Icon className="size-4" />
      )}
      {status}
    </span>
  )
}
