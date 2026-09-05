import { NextRequest, NextResponse } from 'next/server'
import { getDepartures } from '@/services/flightService'
import { apiErrorResponse } from '@/lib/apiError'

export async function GET(request: NextRequest) {
  const airport = request.nextUrl.searchParams.get('airport') ?? 'LHR'
  try {
    const { flights, isLive } = await getDepartures(airport)
    return NextResponse.json({ flights, isLive, fetchedAt: new Date().toISOString() })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
