import { NextRequest, NextResponse } from 'next/server'
import { getDirectionsToAirport, getDirectionsBetweenAirports } from '@/services/directionsService'
import { apiErrorResponse } from '@/lib/apiError'
import type { DirectionsRoute } from '@/types/transport'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const to = params.get('to')
  const from = params.get('from')
  const lat = params.get('lat')
  const lon = params.get('lon')
  const mode = (params.get('mode') ?? 'driving') as DirectionsRoute['mode']

  if (!to) return NextResponse.json({ error: 'to (airport IATA) is required' }, { status: 400 })

  try {
    const route =
      lat && lon
        ? await getDirectionsToAirport({ lat: Number(lat), lon: Number(lon) }, to, mode)
        : from
          ? await getDirectionsBetweenAirports(from, to, mode)
          : null

    if (!route) return NextResponse.json({ error: 'Directions unavailable' }, { status: 404 })
    return NextResponse.json({ route })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
