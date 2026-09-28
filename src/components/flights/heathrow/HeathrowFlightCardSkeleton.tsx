import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function HeathrowFlightCardSkeleton() {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-[72px_auto_1fr_auto_auto]">
      <Skeleton className="h-7 w-14" />
      <div className="flex items-center gap-2.5">
        <Skeleton className="size-8 rounded-full" />
        <div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-1.5 h-3 w-14" />
        </div>
      </div>
      <div className="col-span-2 sm:col-span-1">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-1.5 h-3 w-20" />
      </div>
      <Skeleton className="hidden h-10 w-20 sm:block" />
      <div className="col-span-3 flex justify-between sm:col-span-1 sm:flex-col sm:items-end sm:gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-7 w-16 rounded-full" />
      </div>
    </div>
  )
}
