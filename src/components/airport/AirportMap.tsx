'use client'

import React, { useEffect, useRef, useState } from 'react'
import { MapPinned } from 'lucide-react'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Card } from '@/components/ui/card'
import { publicEnv } from '@/config/env'
import type { AirportMeta } from '@/types/airport'
import type { TransportOption } from '@/types/transport'

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
 */
export default function AirportMap({ airport, transportStops = [], directionsUrl }: AirportMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loadError, setLoadError] = useState(false)
  const token = publicEnv.NEXT_PUBLIC_MAPBOX_TOKEN

  useEffect(() => {
    if (!token || !containerRef.current) return
    let map: import('mapbox-gl').Map | undefined
    let cancelled = false

    import('mapbox-gl')
      .then((mapboxgl) => {
        if (cancelled || !containerRef.current) return
        mapboxgl.default.accessToken = token
        map = new mapboxgl.default.Map({
          container: containerRef.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [airport.longitude, airport.latitude],
          zoom: 13,
        })
        map.addControl(new mapboxgl.default.NavigationControl(), 'top-right')

        new mapboxgl.default.Marker({ color: '#2563eb' })
          .setLngLat([airport.longitude, airport.latitude])
          .setPopup(new mapboxgl.default.Popup().setText(`${airport.name} (${airport.iata})`))
          .addTo(map)

        for (const stop of transportStops) {
          if (stop.latitude == null || stop.longitude == null) continue
          new mapboxgl.default.Marker({ color: '#16a34a' })
            .setLngLat([stop.longitude, stop.latitude])
            .setPopup(new mapboxgl.default.Popup().setText(stop.mode))
            .addTo(map)
        }
      })
      .catch(() => setLoadError(true))

    return () => {
      cancelled = true
      map?.remove()
    }
  }, [token, airport, transportStops])

  if (!token) {
    return (
      <Card className="flex flex-col items-center justify-center gap-2 p-8 text-center">
        <MapPinned className="size-6 text-muted-foreground" />
        <p className="text-sm font-semibold">Map not yet available</p>
        <p className="text-xs text-muted-foreground">Add a Mapbox token to enable the interactive airport map.</p>
      </Card>
    )
  }

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
