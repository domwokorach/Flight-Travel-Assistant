import React from 'react'
import { WifiOff, RefreshCw } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import type { ConnectionState } from '@/hooks/useLivePolling'

export interface DataFreshnessBannerProps {
  connectionState: ConnectionState
  lastUpdated?: Date | null
}

/** Shown when a live panel's data has gone stale or offline (spec §30/§33) — never silently presented as current. */
export function DataFreshnessBanner({ connectionState, lastUpdated }: DataFreshnessBannerProps) {
  if (connectionState === 'live' || connectionState === 'reconnecting') return null

  const timeLabel = lastUpdated
    ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'an earlier point'

  return (
    <Alert variant="warning" className="mb-3">
      {connectionState === 'offline' ? <WifiOff className="size-5" /> : <RefreshCw className="size-5" />}
      <AlertTitle>{connectionState === 'offline' ? 'Offline' : 'Data may be outdated'}</AlertTitle>
      <AlertDescription>
        {connectionState === 'offline'
          ? `Showing information last updated at ${timeLabel}. Reconnecting automatically.`
          : 'Attempting to reconnect to live data.'}
      </AlertDescription>
    </Alert>
  )
}
