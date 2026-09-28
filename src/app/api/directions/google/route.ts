import { NextRequest, NextResponse } from 'next/server'
import { computeGroundRoute } from '@/lib/providers/directions/google'
import { findAirport } from '@/data/airportDirectory'
import { apiErrorResponse } from '@/lib/apiError'
import { checkRateLimit } from '@/lib/rateLimit'
import type { GoogleTravelMode } from '@/types/directions'

const VALID_MODES: GoogleTravelMode[] = ['DRIVE', 'TRANSIT', 'WALK']

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const originLat = params.get('originLat')
  const originLon = params.get('originLon')
  const originPlaceId = params.get('originPlaceId')
  const destinationIata = params.get('destinationIata')
  const modeParam = params.get('mode') ?? 'DRIVE'
  const departureTime = params.get('departureTime') ?? undefined

  if (!originPlaceId && (!originLat || !originLon)) {
    return NextResponse.json({ error: 'origin (originLat/originLon or originPlaceId) is required' }, { status: 400 })
  }
  if (!destinationIata) {
    return NextResponse.json({ error: 'destinationIata is required' }, { status: 400 })
  }
  if (!VALID_MODES.includes(modeParam as GoogleTravelMode)) {
    return NextResponse.json({ error: `mode must be one of ${VALID_MODES.join(', ')}` }, { status: 400 })
  }

  const destinationAirport = findAirport(destinationIata)
  if (!destinationAirport) {
    return NextResponse.json({ error: `Unknown airport: ${destinationIata}` }, { status: 404 })
  }

  try {
    checkRateLimit(request, 'directions-google', { limit: 20, windowMs: 60_000 })

    const route = await computeGroundRoute({
      origin: originPlaceId ? { placeId: originPlaceId } : { lat: Number(originLat), lon: Number(originLon) },
      destination: { lat: destinationAirport.latitude, lon: destinationAirport.longitude },
      travelMode: modeParam as GoogleTravelMode,
      departureTime,
    })

    return NextResponse.json({ route })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
