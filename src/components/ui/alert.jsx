import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-2xl border p-4 grid grid-cols-[0_1fr] gap-x-3 gap-y-1 has-[>svg]:grid-cols-[auto_1fr] [&>svg]:size-5 [&>svg]:translate-y-0.5',
  {
    variants: {
      variant: {
        default: 'bg-card border-border text-foreground [&>svg]:text-foreground',
        error: 'bg-error-light border-transparent text-error-dark [&>svg]:text-error-dark',
        warning: 'bg-warning-light border-transparent text-warning-dark [&>svg]:text-warning-dark',
        success: 'bg-success-light border-transparent text-success-dark [&>svg]:text-success-dark',
        info: 'bg-info-light border-transparent text-info-dark [&>svg]:text-info-dark',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Alert({ className, variant, ...props }) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
}

function AlertTitle({ className, ...props }) {
  return <div data-slot="alert-title" className={cn('col-start-2 font-heading font-extrabold leading-tight', className)} {...props} />
}

function AlertDescription({ className, ...props }) {
  return (
    <div
      data-slot="alert-description"
      className={cn('col-start-2 text-sm font-medium leading-relaxed opacity-90', className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
