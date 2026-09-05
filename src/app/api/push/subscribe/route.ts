import { NextRequest, NextResponse } from 'next/server'
import type { PushSubscription as WebPushSubscription } from 'web-push'
import { addSubscription, dropSubscriptionByEndpoint } from '@/lib/pushStore'
import { serverEnv } from '@/config/env'

interface SubscribeBody {
  subscription: WebPushSubscription
  flightNumber: string
}

export async function POST(request: NextRequest) {
  if (!serverEnv.PUSH_PUBLIC_KEY || !serverEnv.PUSH_PRIVATE_KEY) {
    return NextResponse.json({ error: 'Push notifications are not configured' }, { status: 503 })
  }

  const body = (await request.json()) as SubscribeBody
  if (!body?.subscription?.endpoint || !body.flightNumber) {
    return NextResponse.json({ error: 'subscription and flightNumber are required' }, { status: 400 })
  }

  addSubscription(body.subscription, body.flightNumber)
  return NextResponse.json({ ok: true })
}

export async function DELETE(request: NextRequest) {
  const { endpoint } = (await request.json()) as { endpoint: string }
  if (!endpoint) return NextResponse.json({ error: 'endpoint is required' }, { status: 400 })
  dropSubscriptionByEndpoint(endpoint)
  return NextResponse.json({ ok: true })
}
