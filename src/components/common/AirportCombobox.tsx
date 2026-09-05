'use client'

import React, { useMemo, useState } from 'react'
import { Building2, ChevronDown, Check, Clock } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'
import { AIRPORT_DIRECTORY } from '@/data/airportDirectory'
import { useRecentItems } from '@/hooks/useRecentItems'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import type { AirportMeta } from '@/types/airport'

interface AirportComboboxProps {
  label?: string
  value: string | null
  onChange: (iata: string) => void
  placeholder?: string
  className?: string
}

function AirportRow({ airport, selected }: { airport: AirportMeta; selected?: boolean }) {
  return (
    <>
      <Building2 className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      <span className="flex min-w-0 flex-1 flex-col text-left">
        <span className="truncate font-semibold text-foreground">{airport.name}</span>
        <span className="truncate text-xs font-medium text-muted-foreground">
          {airport.iata} · {airport.city}, {airport.country}
        </span>
      </span>
      {selected && <Check className="size-4 shrink-0 text-primary" aria-hidden />}
    </>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-8 text-center">
      <p className="text-sm font-bold text-foreground">No airports found</p>
      <p className="text-xs text-muted-foreground">Try a city, airport name, or IATA code.</p>
    </div>
  )
}

/**
 * Searchable airport picker per spec: Popover + Command on desktop, a full-height
 * bottom sheet on mobile (complex list, needs large touch targets and room to search).
 */
export function AirportCombobox({ label = 'Choose Airport', value, onChange, placeholder = 'Search airports…', className }: AirportComboboxProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { items: recentCodes, add: addRecent } = useRecentItems('flightpath.recentAirports')

  const selected = useMemo(() => AIRPORT_DIRECTORY.find((a) => a.iata === value) ?? null, [value])
  const recentAirports = useMemo(
    () => recentCodes.map((code) => AIRPORT_DIRECTORY.find((a) => a.iata === code)).filter((a): a is AirportMeta => Boolean(a)),
    [recentCodes]
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return AIRPORT_DIRECTORY
    return AIRPORT_DIRECTORY.filter(
      (a) => a.name.toLowerCase().includes(q) || a.city.toLowerCase().includes(q) || a.country.toLowerCase().includes(q) || a.iata.toLowerCase().includes(q)
    )
  }, [query])

  const select = (airport: AirportMeta) => {
    onChange(airport.iata)
    addRecent(airport.iata)
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
        {!query && recentAirports.length > 0 && (
          <CommandGroup heading="Recent">
            {recentAirports.map((airport) => (
              <CommandItem key={`recent-${airport.iata}`} value={`recent-${airport.iata}`} onSelect={() => select(airport)} className="h-14">
                <Clock className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                <AirportRow airport={airport} selected={airport.iata === value} />
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        <CommandGroup heading={query ? 'Results' : 'All airports'}>
          {results.map((airport) => (
            <CommandItem key={airport.iata} value={airport.iata} onSelect={() => select(airport)} className="h-14">
              <AirportRow airport={airport} selected={airport.iata === value} />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )

  const triggerLabel = selected ? `${selected.name} (${selected.iata})` : placeholder

  const trigger = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        'flex h-11 min-w-[220px] items-center justify-between gap-2 rounded-xl border border-border bg-card px-3.5 text-sm font-semibold text-foreground outline-none transition-colors',
        'hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
    >
      <span className="flex min-w-0 items-center gap-2 truncate">
        <Building2 className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <span className={cn('truncate', !selected && 'text-muted-foreground')}>{triggerLabel}</span>
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
