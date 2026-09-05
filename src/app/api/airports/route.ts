import { NextRequest, NextResponse } from 'next/server'
import { findAirports, getAirportServices } from '@/services/airportService'
import { apiErrorResponse } from '@/lib/apiError'
import { checkRateLimit } from '@/lib/rateLimit'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')
  const servicesFor = request.nextUrl.searchParams.get('services')

  try {
    checkRateLimit(request, 'airports/search', { limit: 40, windowMs: 60_000 })

    if (servicesFor) {
      const services = await getAirportServices(servicesFor)
      return NextResponse.json({ services })
    }
    const airports = await findAirports(query ?? '')
    return NextResponse.json({ airports })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
