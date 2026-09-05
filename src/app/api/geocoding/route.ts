import { NextRequest, NextResponse } from 'next/server'
import { searchAddress } from '@/services/geocodingService'
import { apiErrorResponse } from '@/lib/apiError'
import { checkRateLimit } from '@/lib/rateLimit'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim()
  if (!query) return NextResponse.json({ error: 'q (address or place) is required' }, { status: 400 })

  try {
    checkRateLimit(request, 'geocoding', { limit: 20, windowMs: 60_000 })

    const matches = await searchAddress(query)
    if (matches === null) return NextResponse.json({ error: 'Address search is unavailable' }, { status: 501 })
    return NextResponse.json({ matches })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
