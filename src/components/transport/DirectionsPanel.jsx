import React from 'react'
import { Navigation, Map, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useGeolocation } from '@/hooks/useGeolocation'
import { findAirport } from '@/data/airportDirectory'

export default function DirectionsPanel({ airport = 'LHR' }) {
  const geo = useGeolocation()
  const meta = findAirport(airport)

  const handleDirections = () => {
    if (geo.status === 'granted' && geo.coords) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${geo.coords.lat},${geo.coords.lon}&destination=${meta?.latitude},${meta?.longitude}`,
        '_blank',
        'noopener,noreferrer'
      )
      return
    }
    geo.request()
  }

  const handleMap = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${meta?.latitude},${meta?.longitude}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <Card className="overflow-hidden bg-board-bg p-0 text-foreground">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px]">
        <div className="p-6 sm:p-8">
          <p className="text-xs font-bold tracking-[0.1em] text-primary-light uppercase">Door to gate</p>
          <h3 className="mt-2 font-heading text-2xl font-bold text-foreground">Keep the journey moving</h3>
          <p className="mt-2 max-w-[480px] text-sm leading-relaxed font-medium text-text-secondary">
            {geo.status === 'denied'
              ? 'Location permission was denied — directions will start from a general London location instead.'
              : geo.status === 'unavailable' || geo.status === 'timeout'
                ? 'Location unavailable — try directions again, or use the map below.'
                : `Get directions to ${meta?.name ?? airport}, or continue from JFK with the fastest available transport option.`}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={handleDirections} disabled={geo.status === 'requesting'}>
              {geo.status === 'requesting' ? <Loader2 className="size-4 animate-spin" /> : <Navigation className="size-4" />}
              Get directions
            </Button>
            <Button
              variant="outline"
              className="border-white/15 bg-white/5 text-foreground hover:border-white/25 hover:bg-white/10"
              onClick={handleMap}
            >
              <Map className="size-4" />
              View airport map
            </Button>
          </div>
        </div>
        <div className="relative min-h-44 border-t border-white/10 bg-[radial-gradient(circle_at_20%_30%,rgba(79,140,255,.22),transparent_32%),radial-gradient(circle_at_75%_70%,rgba(79,140,255,.16),transparent_35%)] lg:border-t-0 lg:border-l">
          <div className="absolute inset-6 rounded-3xl border border-white/10">
            <div className="absolute top-[62%] left-[18%] size-3 rounded-full bg-foreground shadow-[0_0_0_8px_rgba(79,140,255,0.18)]" />
            <div className="absolute top-[28%] right-[18%] size-3 rounded-full bg-primary-light shadow-[0_0_0_8px_rgba(79,140,255,0.18)]" />
          </div>
        </div>
      </div>
    </Card>
  )
}
