import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function DirectionsLoadingSkeleton() {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-muted-foreground">Finding the best route…</p>
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-1 pt-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <React.Fragment key={i}>
              <Skeleton className="size-3 rounded-full" />
              {i < 3 && <Skeleton className="h-10 w-px" />}
            </React.Fragment>
          ))}
        </div>
        <div className="flex-1 space-y-3">
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-16 w-full rounded-2xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
        </div>
      </div>
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  )
}
