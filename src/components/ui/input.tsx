import * as React from 'react'
import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-11 w-full min-w-0 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30',
        className
      )}
      {...props}
    />
  )
}

export { Input }
