'use client'

import React, { useRef } from 'react'
import polyline from '@mapbox/polyline'
import { MapPinned } from 'lucide-react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Card } from '@/components/ui/card'
import { publicEnv } from '@/config/env'
import { useMapLibreMap } from '@/hooks/useMapLibreMap'
import type { AirportMeta } from '@/types/airport'
import type { GroundRoute } from '@/types/directions'

const DEFAULT_MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty'

interface FlightDirectionsMapProps {
  departureAirport: AirportMeta
  arrivalAirport?: AirportMeta
  origin?: { lat: number; lon: number } | null
  groundRoute?: GroundRoute | null
  directionsUrl?: string | null
}

/**
 * Draws the ground route (Google Routes polyline, decoded and rendered on the existing free
 * MapLibre setup) and the flight leg as two visually distinct lines: a solid line for the real
 * road route, a dashed line for the airborne leg — which is a straight line between airport
 * coordinates, never a fabricated road route (spec requirement).
 */
export default function FlightDirectionsMap({ departureAirport, arrivalAirport, origin, groundRoute, directionsUrl }: FlightDirectionsMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const styleUrl = publicEnv.NEXT_PUBLIC_MAP_STYLE_URL ?? DEFAULT_MAP_STYLE_URL

  const { loadError } = useMapLibreMap(containerRef, {
    styleUrl,
    center: [departureAirport.longitude, departureAirport.latitude],
    zoom: 9,
    rebuildKey: [groundRoute?.encodedPolyline, arrivalAirport?.iata, origin?.lat, origin?.lon],
    onReady: (map, { Marker, Popup }) => {
      new Marker({ color: '#2563eb' })
        .setLngLat([departureAirport.longitude, departureAirport.latitude])
        .setPopup(new Popup().setText(`${departureAirport.name} (${departureAirport.iata})`))
        .addTo(map)

      if (arrivalAirport) {
        new Marker({ color: '#7c3aed' })
          .setLngLat([arrivalAirport.longitude, arrivalAirport.latitude])
          .setPopup(new Popup().setText(`${arrivalAirport.name} (${arrivalAirport.iata})`))
          .addTo(map)
      }

      if (origin) {
        new Marker({ color: '#16a34a' }).setLngLat([origin.lon, origin.lat]).setPopup(new Popup().setText('Your location')).addTo(map)
      }

      map.on('load', () => {
        if (groundRoute?.encodedPolyline) {
          const geometry = polyline.toGeoJSON(groundRoute.encodedPolyline)
          map.addSource('ground-route', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry } })
          map.addLayer({
            id: 'ground-route-line',
            type: 'line',
            source: 'ground-route',
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: { 'line-color': '#2563eb', 'line-width': 4 },
          })
        }

        if (arrivalAirport) {
          map.addSource('flight-path', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [
                  [departureAirport.longitude, departureAirport.latitude],
                  [arrivalAirport.longitude, arrivalAirport.latitude],
                ],
              },
            },
          })
          map.addLayer({
            id: 'flight-path-line',
            type: 'line',
            source: 'flight-path',
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: { 'line-color': '#94a3b8', 'line-width': 2, 'line-dasharray': [2, 2] },
          })
        }
      })
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
