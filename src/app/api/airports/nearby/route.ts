import { NextRequest, NextResponse } from 'next/server'
import { getNearbyAirports } from '@/services/nearbyAirportsService'
import { apiErrorResponse } from '@/lib/apiError'
import { checkRateLimit } from '@/lib/rateLimit'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const lat = Number(params.get('lat'))
  const lng = Number(params.get('lng'))
  const distance = params.get('distance') ? Number(params.get('distance')) : undefined

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ error: 'lat and lng are required' }, { status: 400 })
  }

  try {
    checkRateLimit(request, 'airports-nearby', { limit: 20, windowMs: 60_000 })
    const { airports, isLive } = await getNearbyAirports(lat, lng, distance)
    return NextResponse.json({ airports, isLive })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
