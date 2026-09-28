import { NextRequest, NextResponse } from 'next/server'
import { getLiveFlightPosition } from '@/services/liveFlightService'
import { apiErrorResponse } from '@/lib/apiError'

export async function GET(request: NextRequest) {
  const flightNumber = request.nextUrl.searchParams.get('flight_iata')?.trim()
  if (!flightNumber) return NextResponse.json({ error: 'flight_iata is required' }, { status: 400 })

  try {
    const position = await getLiveFlightPosition(flightNumber)
    return NextResponse.json({ position })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
