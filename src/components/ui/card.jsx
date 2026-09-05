import * as React from 'react'
import { cn } from '@/lib/utils'

function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card/60 text-card-foreground backdrop-blur-sm flex flex-col gap-4 rounded-2xl border border-border-muted p-5',
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }) {
  return <div data-slot="card-header" className={cn('flex flex-col gap-1.5', className)} {...props} />
}

function CardTitle({ className, ...props }) {
  return <div data-slot="card-title" className={cn('font-heading font-bold leading-none', className)} {...props} />
}

function CardDescription({ className, ...props }) {
  return <div data-slot="card-description" className={cn('text-muted-foreground text-sm', className)} {...props} />
}

function CardContent({ className, ...props }) {
  return <div data-slot="card-content" className={cn(className)} {...props} />
}

function CardFooter({ className, ...props }) {
  return <div data-slot="card-footer" className={cn('flex items-center', className)} {...props} />
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
