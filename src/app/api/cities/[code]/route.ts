import { NextResponse } from 'next/server'
import { getCityInfo } from '@/services/referenceDataService'
import { apiErrorResponse } from '@/lib/apiError'

export async function GET(_request: Request, context: { params: Promise<{ code: string }> }) {
  const { code } = await context.params
  try {
    const city = await getCityInfo(code)
    if (!city) return NextResponse.json({ error: 'City not found' }, { status: 404 })
    return NextResponse.json({ city })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
