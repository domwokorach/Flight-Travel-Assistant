export type JourneyStage =
  | 'check_in'
  | 'security'
  | 'passport_control'
  | 'lounge'
  | 'gate'
  | 'boarding'
  | 'in_flight'
  | 'connection'
  | 'baggage_reclaim'
  | 'ground_transport'
  | 'destination'

export interface GateCountdownState {
  minutesRemaining: number | null
  label: string
  tone: 'green' | 'blue' | 'orange' | 'rose' | 'neutral'
  escalation: 'announced' | 'boarding' | 'closing_soon' | 'urgent' | 'closed' | 'none'
}

export interface JourneyState {
  stage: JourneyStage
  headline: string
  subline: string
  ctaLabel: string
  ctaHref?: string | null
  isLive: boolean
  updatedAt: string
}
