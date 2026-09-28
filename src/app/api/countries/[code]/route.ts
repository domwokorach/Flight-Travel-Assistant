import { NextResponse } from 'next/server'
import { getCountryInfo } from '@/services/referenceDataService'
import { apiErrorResponse } from '@/lib/apiError'

export async function GET(_request: Request, context: { params: Promise<{ code: string }> }) {
  const { code } = await context.params
  try {
    const country = await getCountryInfo(code)
    if (!country) return NextResponse.json({ error: 'Country not found' }, { status: 404 })
    return NextResponse.json({ country })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
