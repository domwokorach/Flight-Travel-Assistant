import { NextRequest, NextResponse } from 'next/server'
import { getFleet } from '@/services/referenceDataService'
import { apiErrorResponse } from '@/lib/apiError'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const limit = params.get('limit') ? Number(params.get('limit')) : 100
  const offset = params.get('offset') ? Number(params.get('offset')) : 0

  try {
    const { aircraft, isLive } = await getFleet(limit, offset)
    return NextResponse.json({ aircraft, isLive })
  } catch (err) {
    return apiErrorResponse(err)
  }
}
