import React from 'react'
import { RefreshCw, Map as MapIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DirectionsErrorStateProps {
  onRetry: () => void
  onOpenInGoogleMaps?: () => void
}

export default function DirectionsErrorState({ onRetry, onOpenInGoogleMaps }: DirectionsErrorStateProps) {
  return (
    <Card className="items-center gap-2 py-10 text-center">
      <p className="font-heading text-lg font-bold text-foreground">Directions unavailable</p>
      <p className="max-w-sm text-sm font-medium text-text-secondary">We couldn&apos;t calculate this route right now.</p>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <Button onClick={onRetry}>
          <RefreshCw className="size-4" />
          Try again
        </Button>
        {onOpenInGoogleMaps && (
          <Button
            variant="outline"
            className="border-white/15 bg-white/5 text-foreground hover:border-white/25 hover:bg-white/10"
            onClick={onOpenInGoogleMaps}
          >
            <MapIcon className="size-4" />
            Open in Google Maps
          </Button>
        )}
      </div>
    </Card>
  )
}
