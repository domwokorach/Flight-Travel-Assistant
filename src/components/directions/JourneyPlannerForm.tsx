import React from 'react'
import { ArrowRightLeft, LocateFixed, Loader2, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { GeolocationStatus } from '@/hooks/useGeolocation'
import type { GoogleTravelMode } from '@/types/directions'

const MODE_LABELS: Record<GoogleTravelMode, string> = {
  DRIVE: 'By car',
  TRANSIT: 'By public transport',
  WALK: 'On foot',
}

interface JourneyPlannerFormProps {
  destinationLabel: string
  address: string
  onAddressChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  addressStatus: 'idle' | 'loading' | 'error'
  geoStatus: GeolocationStatus
  onUseLocation: () => void
  mode: GoogleTravelMode
  onModeChange: (mode: GoogleTravelMode) => void
  availableModes?: GoogleTravelMode[]
}

/**
 * "Enter details to see your options and prices" journey-planner form — From/To fields and a
 * travel-mode preference, feeding the same real directions pipeline as the rest of the Flight
 * Directions screen (address search via Places API, or "Use my location" via the existing
 * geolocation hook — the real app supports both, so both stay).
 */
export default function JourneyPlannerForm({
  destinationLabel,
  address,
  onAddressChange,
  onSubmit,
  addressStatus,
  geoStatus,
  onUseLocation,
  mode,
  onModeChange,
  availableModes = ['DRIVE', 'TRANSIT', 'WALK'],
}: JourneyPlannerFormProps) {
  return (
    <Card className="gap-5 p-6 sm:p-7">
      <h4 className="font-heading text-lg font-bold text-foreground">Enter details to see your options</h4>

      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="journey-from">From</Label>
          <Input
            id="journey-from"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            placeholder="Enter postcode or address"
          />
        </div>
        <div className="hidden items-end justify-center pb-2.5 sm:flex">
          <ArrowRightLeft className="size-4 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="journey-to">To</Label>
          <Input id="journey-to" value={destinationLabel} disabled className="text-foreground disabled:opacity-100" />
        </div>

        <div className="sm:col-span-3">
          <Button type="button" variant="link" onClick={onUseLocation} disabled={geoStatus === 'requesting'} className="h-auto p-0 text-sm">
            {geoStatus === 'requesting' ? <Loader2 className="size-3.5 animate-spin" /> : <LocateFixed className="size-3.5" />}
            Use my location instead
          </Button>
        </div>

        <div className="sm:col-span-3">
          <Label>I prefer to travel</Label>
          <div role="radiogroup" aria-label="Preferred transport" className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            {availableModes.map((m) => (
              <label key={m} className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span
                  role="radio"
                  aria-checked={mode === m}
                  onClick={() => onModeChange(m)}
                  className={cn(
                    'grid size-4 shrink-0 cursor-pointer place-items-center rounded-full border-2 border-border-strong',
                    mode === m && 'border-primary'
                  )}
                >
                  {mode === m && <span className="size-2 rounded-full bg-primary" />}
                </span>
                {MODE_LABELS[m]}
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 sm:col-span-3">
          {geoStatus === 'denied' && <p className="text-xs font-medium text-error">Location permission was denied.</p>}
          {addressStatus === 'error' && <p className="text-xs font-medium text-error">Couldn&apos;t find that place.</p>}
          <Button type="submit" disabled={addressStatus === 'loading' || !address.trim()} className="ml-auto">
            {addressStatus === 'loading' ? <Loader2 className="size-4 animate-spin" /> : null}
            See journey
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </form>
    </Card>
  )
}
