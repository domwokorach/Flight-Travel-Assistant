import { NextRequest, NextResponse } from 'next/server'
import { compareAirportTimezones, getAirportTimezone } from '@/services/timezoneService'
import { apiErrorResponse } from '@/lib/apiError'

export async function GET(request: NextRequest) {
  const iata = request.nextUrl.searchParams.get('iata')
  const base = request.nextUrl.searchParams.get('base')
  if (!iata) return NextResponse.json({ error: 'iata is required' }, { status: 400 })

  try {
    const result = await getAirportTimezone(iata)
    if (!result) return NextResponse.json({ error: 'Airport not found' }, { status: 404 })
    const comparedTo = base ? await compareAirportTimezones(base, iata) : null
    return NextResponse.json({ ...result, comparedTo })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
