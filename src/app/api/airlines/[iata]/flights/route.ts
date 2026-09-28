import { NextResponse } from 'next/server'
import { getAirlineFlights } from '@/services/airlineSearchService'
import { apiErrorResponse } from '@/lib/apiError'

/** Lazy per-airline flight hydration — called when a user selects an airline-name search
 *  result that wasn't eagerly enriched (see airlineSearchService's quota note). */
export async function GET(_request: Request, context: { params: Promise<{ iata: string }> }) {
  const { iata } = await context.params
  try {
    const { flights, isLive } = await getAirlineFlights(iata)
    return NextResponse.json({ flights, isLive })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
