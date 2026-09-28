import { NextRequest, NextResponse } from 'next/server'
import { getDelays, type DelayType } from '@/services/delaysService'
import { apiErrorResponse } from '@/lib/apiError'

// AirLabs' /delays requires `delay` to be strictly greater than 30 — it rejects 30 itself.
const MIN_DELAY_MINUTES = 31

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const minimum = params.get('minimum') ? Number(params.get('minimum')) : 60
  const typeParam = params.get('type')
  const type: DelayType = typeParam === 'arrivals' ? 'arrivals' : 'departures'

  if (!Number.isFinite(minimum) || minimum <= MIN_DELAY_MINUTES) {
    return NextResponse.json({ error: `minimum must be greater than ${MIN_DELAY_MINUTES}` }, { status: 400 })
  }

  try {
    const { flights, isLive } = await getDelays(minimum, type)
    return NextResponse.json({ flights, isLive })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
