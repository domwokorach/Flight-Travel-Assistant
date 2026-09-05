import { NextRequest, NextResponse } from 'next/server'
import { getWeatherForCities } from '@/services/weatherService'
import { apiErrorResponse } from '@/lib/apiError'

export async function GET(request: NextRequest) {
  const airports = request.nextUrl.searchParams.get('airports')
  const iatas = (airports ?? 'LHR,AMS,JFK').split(',').map((s) => s.trim().toUpperCase()).filter(Boolean)

  try {
    const cities = await getWeatherForCities(iatas)
    return NextResponse.json({ cities, fetchedAt: new Date().toISOString() })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
