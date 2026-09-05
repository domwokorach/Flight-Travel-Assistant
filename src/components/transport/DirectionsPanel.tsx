'use client'

import React, { useState } from 'react'
import { Navigation, Map, Loader2, Search } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useGeolocation } from '@/hooks/useGeolocation'
import { findAirport } from '@/data/airportDirectory'
import { publicEnv } from '@/config/env'
import type { DirectionsRoute } from '@/types/transport'

interface DirectionsPanelProps {
  airport?: string
}

type Origin = { lat: number; lon: number; label?: string }

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`
}

function formatDistance(meters: number): string {
  return meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${meters} m`
}

export default function DirectionsPanel({ airport = 'LHR' }: DirectionsPanelProps) {
  const geo = useGeolocation()
  const meta = findAirport(airport)
  const addressSearchEnabled = Boolean(publicEnv.NEXT_PUBLIC_MAPBOX_TOKEN)

  const [address, setAddress] = useState('')
  const [origin, setOrigin] = useState<Origin | null>(null)
  const [route, setRoute] = useState<DirectionsRoute | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  const fetchRoute = async (from: Origin) => {
    if (!meta) return
    setStatus('loading')
    try {
      const params = new URLSearchParams({ to: airport, lat: String(from.lat), lon: String(from.lon), mode: 'driving' })
      const res = await fetch(`/api/directions?${params}`)
      if (!res.ok) throw new Error('Directions request failed')
      const data = (await res.json()) as { route: DirectionsRoute }
      setRoute(data.route)
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }

  const handleDirections = async () => {
    if (geo.status === 'granted' && geo.coords) {
      const from = { lat: geo.coords.lat, lon: geo.coords.lon }
      setOrigin(from)
      await fetchRoute(from)
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${from.lat},${from.lon}&destination=${meta?.latitude},${meta?.longitude}`,
        '_blank',
        'noopener,noreferrer'
      )
      return
    }
    geo.request()
  }

  const handleAddressSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) return
    setStatus('loading')
    try {
      const res = await fetch(`/api/geocoding?q=${encodeURIComponent(address.trim())}`)
      if (!res.ok) throw new Error('Address search failed')
      const data = (await res.json()) as { matches: { label: string; lat: number; lon: number }[] }
      const match = data.matches[0]
      if (!match) {
        setStatus('error')
        return
      }
      const from = { lat: match.lat, lon: match.lon, label: match.label }
      setOrigin(from)
      await fetchRoute(from)
    } catch {
      setStatus('error')
    }
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
              ? 'Location permission was denied — try entering an address instead, or use the map below.'
              : geo.status === 'unavailable' || geo.status === 'timeout'
                ? 'Location unavailable — try directions again, or use the map below.'
                : `Get directions to ${meta?.name ?? airport}, or continue from JFK with the fastest available transport option.`}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={handleDirections} disabled={geo.status === 'requesting' || status === 'loading'}>
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

          {addressSearchEnabled && (
            <form onSubmit={handleAddressSearch} className="mt-5 flex max-w-md gap-2">
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Or enter a home/hotel address"
                aria-label="Starting address"
              />
              <Button type="submit" variant="outline" disabled={status === 'loading' || !address.trim()}>
                {status === 'loading' ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
              </Button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-sm font-medium text-error">Couldn&apos;t find a route for that — try a different address.</p>
          )}

          {route && origin && (
            <p className="mt-4 text-sm font-medium text-text-secondary">
              {origin.label ? `From ${origin.label}: ` : ''}
              {formatDistance(route.distanceMeters)} · {formatDuration(route.durationMinutes)} · {route.summary}
            </p>
          )}
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
