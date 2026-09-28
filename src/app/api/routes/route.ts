import { NextRequest, NextResponse } from 'next/server'
import { getRoutes } from '@/services/referenceDataService'
import { apiErrorResponse } from '@/lib/apiError'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const depIata = params.get('dep_iata') ?? undefined
  const arrIata = params.get('arr_iata') ?? undefined
  const airlineIata = params.get('airline_iata') ?? undefined

  try {
    const { routes, isLive } = await getRoutes({ depIata, arrIata, airlineIata })
    return NextResponse.json({ routes, isLive })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
