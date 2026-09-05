import React from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonFlightCard() {
  return (
    <Card aria-label="Loading flight data">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Skeleton className="size-12 rounded-xl" />
          <div>
            <Skeleton className="h-5 w-35" />
            <Skeleton className="mt-2 h-4 w-20" />
          </div>
        </div>
        <Skeleton className="h-7 w-20 rounded-full" />
      </div>
      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2.5">
        <Skeleton className="h-12 rounded-xl" />
        <Skeleton className="h-2 w-10" />
        <Skeleton className="h-12 rounded-xl" />
      </div>
      <Skeleton className="mt-3.5 h-24 rounded-2xl" />
    </Card>
  )
}
