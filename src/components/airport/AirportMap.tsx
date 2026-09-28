'use client'

import React, { useRef } from 'react'
import { MapPinned } from 'lucide-react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Card } from '@/components/ui/card'
import { publicEnv } from '@/config/env'
import { useMapLibreMap } from '@/hooks/useMapLibreMap'
import type { AirportMeta } from '@/types/airport'
import type { TransportOption } from '@/types/transport'

// OpenFreeMap's "liberty" style — free, no API key, no request limits.
// https://openfreemap.org
const DEFAULT_MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty'

interface AirportMapProps {
  airport: AirportMeta
  /** Ground-transport options to pin, where coordinates are known (transportService doesn't
   *  return coordinates for every mode today, so this only plots the ones that have them). */
  transportStops?: (TransportOption & { latitude?: number; longitude?: number })[]
  /** Deep link for "Get Directions" — directionsService returns a mapUrl, not raw route
   *  geometry (the free OSRM/Google Maps setup this app uses doesn't expose a polyline). */
  directionsUrl?: string | null
}

/**
 * Airport-location map (spec §26), scoped to what real data supports: the airport itself,
 * any ground-transport stops we have coordinates for, and a directions deep link. There's no
 * free/available data source for indoor terminal/gate/lounge/shop layouts, so those aren't
 * fabricated here — see AirportInfo's terminal/facilities accordion for that content instead.
 *
 * Renders on MapLibre GL + OpenFreeMap vector tiles — no API key required. (Directions and
 * geocoding still use Mapbox's APIs elsewhere, since OpenFreeMap is tiles-only.)
 */
export default function AirportMap({ airport, transportStops = [], directionsUrl }: AirportMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const styleUrl = publicEnv.NEXT_PUBLIC_MAP_STYLE_URL ?? DEFAULT_MAP_STYLE_URL

  const { loadError } = useMapLibreMap(containerRef, {
    styleUrl,
    center: [airport.longitude, airport.latitude],
    onReady: (map, { Marker, Popup }) => {
      new Marker({ color: '#2563eb' })
        .setLngLat([airport.longitude, airport.latitude])
        .setPopup(new Popup().setText(`${airport.name} (${airport.iata})`))
        .addTo(map)

      for (const stop of transportStops) {
        if (stop.latitude == null || stop.longitude == null) continue
        new Marker({ color: '#16a34a' })
          .setLngLat([stop.longitude, stop.latitude])
          .setPopup(new Popup().setText(stop.mode))
          .addTo(map)
      }
    },
  })

  if (loadError) {
    return (
      <Card className="flex flex-col items-center justify-center gap-2 p-8 text-center">
        <MapPinned className="size-6 text-muted-foreground" />
        <p className="text-sm font-semibold">Map temporarily unavailable</p>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden p-0">
      <div ref={containerRef} className="h-72 w-full" />
      {directionsUrl && (
        <a href={directionsUrl} target="_blank" rel="noreferrer" className="block px-4 py-3 text-center text-sm font-semibold text-primary hover:underline">
          Get Directions
        </a>
      )}
    </Card>
  )
}
