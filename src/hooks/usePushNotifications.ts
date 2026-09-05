'use client'

import { useCallback, useEffect, useState } from 'react'
import { publicEnv } from '@/config/env'

export type PushStatus = 'unsupported' | 'unconfigured' | 'unsubscribed' | 'subscribed' | 'denied'

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const base64Safe = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = atob(base64Safe)
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)))
}

/** Real web push (server can notify even with the tab closed), backed by the VAPID keypair
 *  in PUSH_PUBLIC_KEY/PUSH_PRIVATE_KEY and the cron at /api/cron/flight-watch. */
export function usePushNotifications(flightNumber: string | null) {
  const [status, setStatus] = useState<PushStatus>('unconfigured')

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
      setStatus('unsupported')
      return
    }
    if (!publicEnv.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
      setStatus('unconfigured')
      return
    }
    if (Notification.permission === 'denied') {
      setStatus('denied')
      return
    }
    navigator.serviceWorker.register('/sw.js').then(async (registration) => {
      const existing = await registration.pushManager.getSubscription()
      setStatus(existing ? 'subscribed' : 'unsubscribed')
    })
  }, [])

  const subscribe = useCallback(async () => {
    if (!flightNumber || !publicEnv.NEXT_PUBLIC_VAPID_PUBLIC_KEY) return
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') {
      setStatus('denied')
      return
    }
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicEnv.NEXT_PUBLIC_VAPID_PUBLIC_KEY) as BufferSource,
    })
    await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription, flightNumber }),
    })
    setStatus('subscribed')
  }, [flightNumber])

  const unsubscribe = useCallback(async () => {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()
    if (!subscription) return
    await fetch('/api/push/subscribe', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint: subscription.endpoint }),
    })
    await subscription.unsubscribe()
    setStatus('unsubscribed')
  }, [])

  return { status, subscribe, unsubscribe }
}
