'use client'

import React, { useMemo, useState } from 'react'
import { ChevronDown, Check, Clock } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'
import AirlineLogo from '@/components/flights/AirlineLogo'
import { airlines } from '@/data/airlines'
import { useRecentItems } from '@/hooks/useRecentItems'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

const AIRLINE_CODES = Object.keys(airlines)

interface AirlineComboboxProps {
  label?: string
  value: string | null
  onChange: (code: string) => void
  placeholder?: string
  className?: string
}

function AirlineRow({ code, selected }: { code: string; selected?: boolean }) {
  const airline = airlines[code as keyof typeof airlines]
  return (
    <>
      <AirlineLogo airlineCode={code} size="sm" className="size-8" />
      <span className="flex min-w-0 flex-1 flex-col text-left">
        <span className="truncate font-semibold text-foreground">{airline?.name ?? code}</span>
        <span className="truncate text-xs font-medium text-muted-foreground">{code}</span>
      </span>
      {selected && <Check className="size-4 shrink-0 text-primary" aria-hidden />}
    </>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-8 text-center">
      <p className="text-sm font-bold text-foreground">No airlines found</p>
      <p className="text-xs text-muted-foreground">Try an airline name or IATA code.</p>
    </div>
  )
}

/**
 * Searchable airline picker per spec: Popover + Command on desktop, a bottom sheet on
 * mobile. Mirrors AirportCombobox's structure — logo replaces the building icon.
 */
export function AirlineCombobox({ label = 'Choose Airline', value, onChange, placeholder = 'Search airlines…', className }: AirlineComboboxProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { items: recentCodes, add: addRecent } = useRecentItems('flightpath.recentAirlines')

  const selectedAirline = value ? airlines[value as keyof typeof airlines] : undefined
  const recentAirlines = useMemo(() => recentCodes.filter((code) => code in airlines), [recentCodes])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return AIRLINE_CODES
    return AIRLINE_CODES.filter((code) => code.toLowerCase().includes(q) || airlines[code as keyof typeof airlines].name.toLowerCase().includes(q))
  }, [query])

  const select = (code: string) => {
    onChange(code)
    addRecent(code)
    setOpen(false)
    setQuery('')
  }

  const renderList = (fullHeight: boolean) => (
    <Command shouldFilter={false} className={fullHeight ? 'h-full' : undefined}>
      <CommandInput placeholder={placeholder} value={query} onValueChange={setQuery} />
      <CommandList className={fullHeight ? 'max-h-none flex-1' : undefined}>
        <CommandEmpty>
          <EmptyState />
        </CommandEmpty>
        {!query && recentAirlines.length > 0 && (
          <CommandGroup heading="Recent">
            {recentAirlines.map((code) => (
              <CommandItem key={`recent-${code}`} value={`recent-${code}`} onSelect={() => select(code)} className="h-14">
                <Clock className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                <AirlineRow code={code} selected={code === value} />
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        <CommandGroup heading={query ? 'Results' : 'All airlines'}>
          {results.map((code) => (
            <CommandItem key={code} value={code} onSelect={() => select(code)} className="h-14">
              <AirlineRow code={code} selected={code === value} />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )

  const triggerLabel = selectedAirline ? `${selectedAirline.name} (${value})` : placeholder

  const trigger = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        'flex h-11 min-w-[220px] items-center justify-between gap-2 rounded-xl border border-border bg-card px-3 text-sm font-semibold text-foreground outline-none transition-colors',
        'hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
    >
      <span className="flex min-w-0 items-center gap-2 truncate">
        {value ? <AirlineLogo airlineCode={value} size="sm" className="size-6" /> : null}
        <span className={cn('truncate', !selectedAirline && 'text-muted-foreground')}>{triggerLabel}</span>
      </span>
      <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden />
    </button>
  )

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent className="w-[340px] p-0" align="start">
          {renderList(false)}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <>
      {trigger}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="flex h-[85vh] flex-col p-0">
          <SheetHeader className="border-b border-border px-4 py-3">
            <SheetTitle>{label}</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-hidden">{renderList(true)}</div>
        </SheetContent>
      </Sheet>
    </>
  )
}
