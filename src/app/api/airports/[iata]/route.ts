import { NextResponse } from 'next/server'
import { getAirport } from '@/services/airportService'
import { apiErrorResponse } from '@/lib/apiError'

export async function GET(_request: Request, context: { params: Promise<{ iata: string }> }) {
  const { iata } = await context.params
  try {
    const airport = await getAirport(iata)
    if (!airport) return NextResponse.json({ error: 'Airport not found' }, { status: 404 })
    return NextResponse.json({ airport })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
