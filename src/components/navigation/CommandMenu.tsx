import React, { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react'
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
import { AirlineSearchResults, AirlineDetailPanel } from './AirlineSearchResults'
import { useSnackbar } from '@/lib/snackbar'
import { useRecentSearches } from '@/hooks/useRecentSearches'
import { useAirlineSearch } from '@/hooks/useAirlineSearch'
import { useAirlineFlights } from '@/hooks/useAirlineFlights'
import { FOLLOWED_FLIGHT_NUMBER } from '@/lib/followedFlight'
import type { AirlineSearchResult } from '@/types/airlineSearch'

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
  const [query, setQuery] = useState('')
  const [selectedAirline, setSelectedAirline] = useState<AirlineSearchResult | null>(null)

  const airlineSearch = useAirlineSearch(query)
  const airlineFlights = useAirlineFlights(selectedAirline?.airline.iata ?? null)

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

  // Reset to a clean slate whenever the palette closes, so it doesn't reopen mid-search.
  useEffect(() => {
    if (!open) {
      setQuery('')
      setSelectedAirline(null)
    }
  }, [open])

  const go = (href: string) => {
    onOpenChange(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const selectAirline = (result: AirlineSearchResult) => {
    setSelectedAirline(result)
    // Already-enriched top matches (flight-number/airline-code/first name match) don't need
    // a network round trip; only hydrate when the result was rendered without flights.
    if (result.flights.length === 0) airlineFlights.load()
  }

  // shouldFilter is off (see AirlineSearchResults) since airline results are server-filtered
  // and their `value` wouldn't fuzzy-match the typed query — so the static groups below
  // filter themselves the same way cmdk's built-in filter would have.
  const q = query.trim().toLowerCase()
  const filteredSections = q ? sections.filter((s) => s.label.toLowerCase().includes(q)) : sections
  const filteredRecent = q ? recentSearches.filter((term) => term.toLowerCase().includes(q)) : recentSearches
  const showGateAlert = !q || 'gate alert'.includes(q) || FOLLOWED_FLIGHT_NUMBER.toLowerCase().includes(q)
  const showAirportServices = !q || 'view airport services'.includes(q)

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Quick search"
      description="Search flights, airlines, sections and actions"
      shouldFilter={false}
    >
      <CommandInput placeholder="Search airlines, flights, sections…" value={query} onValueChange={setQuery} />
      <CommandList>
        {selectedAirline ? (
          <AirlineDetailPanel
            result={selectedAirline}
            flights={selectedAirline.flights.length > 0 ? selectedAirline.flights : airlineFlights.flights}
            loading={airlineFlights.loading}
            error={airlineFlights.error}
            onBack={() => setSelectedAirline(null)}
          />
        ) : (
          <>
            <AirlineSearchResults query={query} status={airlineSearch.status} results={airlineSearch.results} onSelect={selectAirline} />
            {query.trim().length < 2 && filteredSections.length === 0 && filteredRecent.length === 0 && !showGateAlert && !showAirportServices && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            {filteredSections.length > 0 && (
              <CommandGroup heading="Sections">
                {filteredSections.map(({ label, href, icon: Icon }) => (
                  <CommandItem key={href} value={label} onSelect={() => go(href)}>
                    <Icon />
                    {label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {filteredSections.length > 0 && (filteredRecent.length > 0 || showGateAlert || showAirportServices) && <CommandSeparator />}
            {filteredRecent.length > 0 && (
              <CommandGroup heading="Recent searches">
                {filteredRecent.map((term) => (
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
            {filteredRecent.length > 0 && (showGateAlert || showAirportServices) && <CommandSeparator />}
            {(showGateAlert || showAirportServices) && (
              <CommandGroup heading="Quick actions">
                {showGateAlert && (
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
                )}
                {showAirportServices && (
                  <CommandItem value="view airport services" onSelect={() => go('#airport')}>
                    <Map />
                    View airport services
                  </CommandItem>
                )}
              </CommandGroup>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  )
}
