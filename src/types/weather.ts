export interface WeatherAlert {
  event: string
  description: string
  severity?: string
}

export interface WeatherSnapshot {
  city: string
  country?: string
  iata?: string
  timezone: string
  localTime: string
  temp: number
  condition: string
  icon: 'sun' | 'cloud' | 'rain' | 'storm' | 'snow' | 'fog' | 'wind'
  high: number
  low: number
  rainChance: number
  windKph?: number
  alerts?: WeatherAlert[]
  fetchedAt: string
}
