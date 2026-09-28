'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SectionHeading } from '../components/common/SectionHeading'
import FlightDirectionsHeader from '../components/directions/FlightDirectionsHeader'
import LocationPermissionPrompt from '../components/directions/LocationPermissionPrompt'
import JourneyTimeline from '../components/directions/JourneyTimeline'
import FlightDirectionsMap from '../components/directions/FlightDirectionsMap'
import DirectionsLoadingSkeleton from '../components/directions/DirectionsLoadingSkeleton'
import DirectionsErrorState from '../components/directions/DirectionsErrorState'
import { useGeolocation } from '@/hooks/useGeolocation'
import { findAirport } from '@/data/airportDirectory'
import { computeRecommendedDeparture } from '@/lib/journey/recommendedDeparture'
import { buildGoogleMapsUrl } from '@/lib/directions/googleMapsUrl'
import type { Flight } from '@/types/flight'
import type { GoogleTravelMode, GroundRoute, RecommendedDeparture, ResolvedPlace } from '@/types/directions'

type Origin = { lat: number; lon: number; label: string }

/** Straight-line distance in km — used only to decide which transport modes are worth offering, never shown as the routed distance. */
function haversineKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const R = 6371
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLon = ((b.lon - a.lon) * Math.PI) / 180
  const lat1 = (a.lat * Math.PI) / 180
  const lat2 = (b.lat * Math.PI) / 180
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

export default function FlightDirectionsPage({ flight }: { flight: Flight | null }) {
  const geo = useGeolocation()
  const [origin, setOrigin] = useState<Origin | null>(null)
  const [address, setAddress] = useState('')
  const [addressStatus, setAddressStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [mode, setMode] = useState<GoogleTravelMode>('DRIVE')
  const [groundRoute, setGroundRoute] = useState<GroundRoute | null>(null)
  const [routeStatus, setRouteStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  useEffect(() => {
    if (geo.status === 'granted' && geo.coords) {
      setOrigin({ lat: geo.coords.lat, lon: geo.coords.lon, label: 'Your location' })
    }
  }, [geo.status, geo.coords])

  const departureAirport = flight ? findAirport(flight.origin.iata) : undefined
  const arrivalAirport = flight ? findAirport(flight.destination.iata) : undefined

  const fetchRoute = useCallback(
    async (from: { lat: number; lon: number }, travelMode: GoogleTravelMode) => {
      if (!departureAirport) return
      setRouteStatus('loading')
      try {
        const params = new URLSearchParams({
          originLat: String(from.lat),
          originLon: String(from.lon),
          destinationIata: departureAirport.iata,
          mode: travelMode,
        })
        const res = await fetch(`/api/directions/google?${params}`)
        if (!res.ok) throw new Error('Directions request failed')
        const data = (await res.json()) as { route: GroundRoute }
        setGroundRoute(data.route)
        setRouteStatus('idle')
      } catch {
        setGroundRoute(null)
        setRouteStatus('error')
      }
    },
    [departureAirport]
  )

  useEffect(() => {
    if (origin) fetchRoute(origin, mode)
  }, [origin, mode, fetchRoute])

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) return
    setAddressStatus('loading')
    try {
      const res = await fetch(`/api/places/search?q=${encodeURIComponent(address.trim())}`)
      if (!res.ok) throw new Error('Place search failed')
      const data = (await res.json()) as { places: ResolvedPlace[] }
      const match = data.places[0]
      if (!match) {
        setAddressStatus('error')
        return
      }
      setOrigin({ lat: match.latitude, lon: match.longitude, label: match.name })
      setAddressStatus('idle')
    } catch {
      setAddressStatus('error')
    }
  }

  const availableModes = useMemo<GoogleTravelMode[]>(() => {
    if (!origin || !departureAirport) return ['DRIVE', 'TRANSIT', 'WALK']
    const km = haversineKm(origin, departureAirport)
    return km <= 5 ? ['DRIVE', 'TRANSIT', 'WALK'] : ['DRIVE', 'TRANSIT']
  }, [origin, departureAirport])

  const recommendedDeparture: RecommendedDeparture | null = useMemo(() => {
    if (!flight || !groundRoute) return null
    return computeRecommendedDeparture(flight, groundRoute)
  }, [flight, groundRoute])

  const handleOpenInGoogleMaps = () => {
    if (!origin || !departureAirport) return
    window.open(buildGoogleMapsUrl(origin, departureAirport, mode), '_blank', 'noopener,noreferrer')
  }

  const handleStartDirections = () => {
    if (!origin) {
      geo.request()
      return
    }
    handleOpenInGoogleMaps()
  }

  if (!flight || !departureAirport) return null

  return (
    <section id="directions" className="scroll-mt-24 pt-10">
      <SectionHeading eyebrow="Flight directions" title="One continuous journey" />
      <div className="mt-5 space-y-5 rounded-3xl border border-border-muted bg-card/40 p-5 sm:p-6">
        <FlightDirectionsHeader flight={flight} />

        {!origin && (
          <LocationPermissionPrompt
            status={geo.status}
            onUseLocation={geo.request}
            address={address}
            onAddressChange={setAddress}
            onAddressSubmit={handleAddressSubmit}
            addressStatus={addressStatus}
          />
        )}

        {origin && routeStatus === 'loading' && !groundRoute && <DirectionsLoadingSkeleton />}

        {origin && routeStatus === 'error' && (
          <DirectionsErrorState onRetry={() => fetchRoute(origin, mode)} onOpenInGoogleMaps={handleOpenInGoogleMaps} />
        )}

        {origin && routeStatus !== 'error' && (groundRoute || routeStatus === 'loading') && (
          <>
            <JourneyTimeline
              flight={flight}
              originLabel={origin.label}
              groundRoute={groundRoute}
              recommendedDeparture={recommendedDeparture}
              mode={mode}
              onModeChange={setMode}
              availableModes={availableModes}
              loading={routeStatus === 'loading'}
              onStartDirections={handleStartDirections}
              onOpenInGoogleMaps={handleOpenInGoogleMaps}
            />
            <FlightDirectionsMap
              departureAirport={departureAirport}
              arrivalAirport={arrivalAirport}
              origin={origin}
              groundRoute={groundRoute}
              directionsUrl={origin ? buildGoogleMapsUrl(origin, departureAirport, mode) : null}
            />
          </>
        )}
      </div>
    </section>
  )
}
