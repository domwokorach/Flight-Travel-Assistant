import { NextRequest, NextResponse } from 'next/server'
import { getConnectionJourney } from '@/services/flightService'
import { apiErrorResponse } from '@/lib/apiError'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const arrival = params.get('arrival') ?? 'KL1002'
  const departure = params.get('departure') ?? 'KL641'
  const walk = Number(params.get('walk') ?? '20')

  try {
    const { journey, isLive } = await getConnectionJourney(arrival, departure, walk)
    if (!journey) return NextResponse.json({ error: 'Connection flights not found' }, { status: 404 })
    return NextResponse.json({ journey, isLive, fetchedAt: new Date().toISOString() })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
