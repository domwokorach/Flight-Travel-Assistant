import { NextResponse } from 'next/server'
import { getFlightByNumber } from '@/services/flightService'
import { apiErrorResponse } from '@/lib/apiError'

export async function GET(_request: Request, context: { params: Promise<{ flightNumber: string }> }) {
  const { flightNumber } = await context.params
  try {
    const { flight, isLive } = await getFlightByNumber(decodeURIComponent(flightNumber))
    if (!flight) return NextResponse.json({ error: 'Flight not found' }, { status: 404 })
    return NextResponse.json({ flight, isLive, fetchedAt: new Date().toISOString() })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
