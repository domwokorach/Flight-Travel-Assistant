import React, { useEffect, type Dispatch, type SetStateAction } from 'react'
import { Search, Plane, ShieldCheck, Train, BellRing, Map } from 'lucide-react'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command'
import { useSnackbar } from '@/lib/snackbar'
import { useRecentSearches } from '@/hooks/useRecentSearches'
import { FOLLOWED_FLIGHT_NUMBER } from '@/lib/followedFlight'

const sections = [
  { label: 'Flights', href: '#flights', icon: Plane },
  { label: 'At the Airport', href: '#airport', icon: ShieldCheck },
  { label: 'Transport & Directions', href: '#transport', icon: Train },
]

export interface CommandMenuProps {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  onOpenGateAlert?: () => void
}

export default function CommandMenu({ open, onOpenChange, onOpenGateAlert }: CommandMenuProps) {
  const { notify } = useSnackbar()
  const { items: recentSearches } = useRecentSearches()

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange((v) => !v)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onOpenChange])

  const go = (href: string) => {
    onOpenChange(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Quick search" description="Search flights, sections and actions">
      <CommandInput placeholder="Search flights, sections, actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Sections">
          {sections.map(({ label, href, icon: Icon }) => (
            <CommandItem key={href} value={label} onSelect={() => go(href)}>
              <Icon />
              {label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        {recentSearches.length > 0 && (
        <CommandGroup heading="Recent searches">
          {recentSearches.map((term) => (
            <CommandItem
              key={term}
              value={term}
              onSelect={() => {
                go('#flights')
                notify(`Try "${term}" in Find your flight`)
              }}
            >
              <Search />
              {term}
            </CommandItem>
          ))}
        </CommandGroup>
        )}
        <CommandSeparator />
        <CommandGroup heading="Quick actions">
          <CommandItem
            value="gate alert"
            onSelect={() => {
              onOpenChange(false)
              onOpenGateAlert?.()
            }}
          >
            <BellRing />
            Open gate alert
            <span className="ml-auto text-[11px] font-bold text-muted-foreground">{FOLLOWED_FLIGHT_NUMBER}</span>
          </CommandItem>
          <CommandItem value="view airport services" onSelect={() => go('#airport')}>
            <Map />
            View airport services
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
