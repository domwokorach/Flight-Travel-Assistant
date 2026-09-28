import { NextResponse } from 'next/server'
import { getAirlineInfo } from '@/services/referenceDataService'
import { apiErrorResponse } from '@/lib/apiError'

export async function GET(_request: Request, context: { params: Promise<{ iata: string }> }) {
  const { iata } = await context.params
  try {
    const airline = await getAirlineInfo(iata)
    if (!airline) return NextResponse.json({ error: 'Airline not found' }, { status: 404 })
    return NextResponse.json({ airline })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
