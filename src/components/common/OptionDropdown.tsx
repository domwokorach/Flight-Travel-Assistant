'use client'

import React, { useRef, useState } from 'react'
import { ChevronDown, Check, type LucideIcon } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export interface DropdownOption {
  value: string
  label: string
  icon?: LucideIcon
}

interface OptionDropdownProps {
  label: string
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  className?: string
  triggerClassName?: string
}

/**
 * Compact, premium single-select dropdown for short option lists (e.g. "Search by").
 * For long, searchable lists (airports, airlines) use AirportCombobox / AirlineCombobox
 * instead — this one intentionally has no search field.
 */
export function OptionDropdown({ label, options, value, onChange, className, triggerClassName }: OptionDropdownProps) {
  const [open, setOpen] = useState(false)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])
  const selected = options.find((o) => o.value === value) ?? options[0]

  const focusItem = (index: number) => {
    const count = options.length
    const next = ((index % count) + count) % count
    itemRefs.current[next]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      focusItem(index + 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      focusItem(index - 1)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <span className="text-xs font-bold text-muted-foreground">{label}</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'flex h-11 min-w-[170px] items-center justify-between gap-2 rounded-xl border border-border bg-card px-3.5 text-sm font-semibold text-foreground outline-none transition-colors',
              'hover:bg-accent',
              'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              triggerClassName
            )}
          >
            <span className="flex items-center gap-2 truncate">
              {selected?.icon && <selected.icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />}
              {selected?.label}
            </span>
            <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} aria-hidden />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-1.5" role="listbox" aria-label={label}>
          {options.map((option, index) => {
            const isSelected = option.value === value
            return (
              <button
                key={option.value}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                onKeyDown={(e) => onKeyDown(e, index)}
                className={cn(
                  'flex h-11 w-full items-center gap-2.5 rounded-lg px-2.5 text-sm font-semibold outline-none transition-colors',
                  isSelected ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-accent'
                )}
              >
                {option.icon && <option.icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />}
                <span className="flex-1 truncate text-left">{option.label}</span>
                {isSelected && <Check className="size-4 shrink-0" aria-hidden />}
              </button>
            )
          })}
        </PopoverContent>
      </Popover>
    </div>
  )
}
