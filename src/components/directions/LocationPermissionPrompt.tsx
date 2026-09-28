import React from 'react'
import { LocateFixed, Loader2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { GeolocationStatus } from '@/hooks/useGeolocation'

interface LocationPermissionPromptProps {
  status: GeolocationStatus
  onUseLocation: () => void
  address: string
  onAddressChange: (value: string) => void
  onAddressSubmit: (e: React.FormEvent) => void
  addressStatus: 'idle' | 'loading' | 'error'
}

/** Location is opt-in (useGeolocation never runs until requested); the app works fine if denied. */
export default function LocationPermissionPrompt({
  status,
  onUseLocation,
  address,
  onAddressChange,
  onAddressSubmit,
  addressStatus,
}: LocationPermissionPromptProps) {
  return (
    <div className="rounded-2xl border border-border-muted bg-card/60 p-5">
      <p className="text-sm font-medium text-text-secondary">
        {status === 'denied'
          ? 'Location permission was denied — enter a starting point instead.'
          : status === 'unavailable' || status === 'timeout'
            ? 'Location unavailable — enter a starting point instead.'
            : 'Use your location to calculate directions to the airport.'}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button onClick={onUseLocation} disabled={status === 'requesting'}>
          {status === 'requesting' ? <Loader2 className="size-4 animate-spin" /> : <LocateFixed className="size-4" />}
          Use my location
        </Button>
        <form onSubmit={onAddressSubmit} className="flex max-w-md flex-1 gap-2">
          <Input
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            placeholder="Enter starting point"
            aria-label="Starting point"
          />
          <Button type="submit" variant="outline" disabled={addressStatus === 'loading' || !address.trim()}>
            {addressStatus === 'loading' ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
          </Button>
        </form>
      </div>
      {addressStatus === 'error' && <p className="mt-2 text-sm font-medium text-error">Couldn&apos;t find that place — try a different search.</p>}
    </div>
  )
}
