import React from 'react'
import { Card } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export function SkeletonFlightCard() {
  return (
    <Card className="p-6" aria-label="Loading flight data">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Skeleton className="h-12 w-12 rounded-2xl" />
          <div><Skeleton className="h-4 w-36" /><Skeleton className="mt-2 h-3 w-20" /></div>
        </div>
        <Skeleton className="h-7 w-20 rounded-full" />
      </div>
      <div className="mt-8 grid grid-cols-3 items-center gap-5">
        <Skeleton className="h-12" />
        <Skeleton className="h-2" />
        <Skeleton className="h-12" />
      </div>
      <Skeleton className="mt-7 h-24 rounded-2xl" />
    </Card>
  )
}
