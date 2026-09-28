import { NextRequest, NextResponse } from 'next/server'
import { suggestAirports } from '@/services/airportSearchService'
import { apiErrorResponse } from '@/lib/apiError'
import { checkRateLimit } from '@/lib/rateLimit'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim()
  if (!query) return NextResponse.json({ error: 'q is required' }, { status: 400 })

  try {
    checkRateLimit(request, 'search-suggest', { limit: 30, windowMs: 60_000 })
    const { results, isLive } = await suggestAirports(query)
    return NextResponse.json({ results, isLive })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
