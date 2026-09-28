import { NextRequest, NextResponse } from 'next/server'
import { searchAirlines } from '@/services/airlineSearchService'
import { apiErrorResponse } from '@/lib/apiError'
import { checkRateLimit } from '@/lib/rateLimit'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim()
  if (!query) return NextResponse.json({ results: [], isLive: false })

  try {
    checkRateLimit(request, 'airlines-search', { limit: 20, windowMs: 60_000 })
    const { results, isLive } = await searchAirlines(query)
    return NextResponse.json({ results, isLive, fetchedAt: new Date().toISOString() })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
