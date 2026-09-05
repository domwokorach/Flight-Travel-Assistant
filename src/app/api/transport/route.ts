import { NextRequest, NextResponse } from 'next/server'
import { getTransportFromAirport, getTransportToAirport } from '@/services/transportService'
import { apiErrorResponse } from '@/lib/apiError'

export async function GET(request: NextRequest) {
  const airport = request.nextUrl.searchParams.get('airport') ?? 'LHR'
  const direction = request.nextUrl.searchParams.get('direction') ?? 'to'

  try {
    const options = direction === 'from' ? await getTransportFromAirport(airport) : await getTransportToAirport(airport)
    return NextResponse.json({ options, fetchedAt: new Date().toISOString() })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
