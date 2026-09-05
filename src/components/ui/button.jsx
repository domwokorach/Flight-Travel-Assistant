import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-dark',
        destructive: 'bg-destructive text-destructive-foreground hover:brightness-90',
        outline: 'border border-border bg-card text-foreground hover:bg-accent',
        secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
        ghost: 'text-foreground hover:bg-accent',
        link: 'text-primary underline-offset-4 hover:underline rounded-none',
      },
      size: {
        default: 'h-10 px-4.5 py-2 has-[>svg]:px-4',
        sm: 'h-9 px-3.5 text-[13px] has-[>svg]:px-3',
        lg: 'h-11 px-6 has-[>svg]:px-5',
        icon: 'size-10 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
