import { NextResponse } from 'next/server'
import { ProviderError } from './http'

export function apiErrorResponse(err: unknown) {
  if (err instanceof ProviderError) {
    const status = err.kind === 'rate_limit' ? 429 : err.kind === 'timeout' ? 504 : err.kind === 'not_found' ? 404 : 502
    return NextResponse.json({ error: err.message, kind: err.kind }, { status })
  }
  return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 })
}
