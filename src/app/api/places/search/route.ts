import { NextRequest, NextResponse } from 'next/server'
import { searchPlaceText } from '@/lib/providers/places/google'
import { apiErrorResponse } from '@/lib/apiError'
import { checkRateLimit } from '@/lib/rateLimit'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const query = params.get('q')?.trim()
  const biasLat = params.get('biasLat')
  const biasLon = params.get('biasLon')

  if (!query) return NextResponse.json({ error: 'q (search text) is required' }, { status: 400 })

  try {
    checkRateLimit(request, 'places-search', { limit: 20, windowMs: 60_000 })

    const places = await searchPlaceText(query, biasLat && biasLon ? { lat: Number(biasLat), lon: Number(biasLon) } : undefined)

    return NextResponse.json({ places })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
