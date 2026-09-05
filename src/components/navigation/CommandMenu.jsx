import React, { useEffect } from 'react'
import { toast } from 'sonner'
import { BellRing, MapPinned, Plane, Search, ShieldCheck, TrainFront } from 'lucide-react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '../ui/command'

const sections = [
  { label: 'Flights', href: '#flights', icon: Plane },
  { label: 'At the Airport', href: '#airport', icon: ShieldCheck },
  { label: 'Transport & Directions', href: '#transport', icon: TrainFront },
]

const recentSearches = ['BA117', 'London', 'JFK']

export default function CommandMenu({ open, onOpenChange, onOpenGateAlert }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(v => !v)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onOpenChange])

  const go = (href) => {
    onOpenChange(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Quick search" description="Jump to a section, recent search, or quick action">
      <Command>
        <CommandInput placeholder="Search flights, sections, actions…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Sections">
            {sections.map(({ label, href, icon: Icon }) => (
              <CommandItem key={href} value={label} onSelect={() => go(href)}>
                <Icon className="h-4 w-4" />
                {label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Recent searches">
            {recentSearches.map(term => (
              <CommandItem
                key={term}
                value={term}
                onSelect={() => {
                  go('#flights')
                  toast(`Try "${term}" in Find your flight`, { icon: <Search className="h-4 w-4" /> })
                }}
              >
                <Search className="h-4 w-4" />
                {term}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Quick actions">
            <CommandItem
              value="gate alert"
              onSelect={() => {
                onOpenChange(false)
                onOpenGateAlert?.()
              }}
            >
              <BellRing className="h-4 w-4" />
              Open gate alert
              <CommandShortcut>BA117</CommandShortcut>
            </CommandItem>
            <CommandItem
              value="airport map"
              onSelect={() => go('#airport')}
            >
              <MapPinned className="h-4 w-4" />
              View airport services
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
