import type { WeatherSnapshot } from '@/types/weather'

export interface WeatherProvider {
  readonly name: string
  getWeather(latitude: number, longitude: number, timezone: string, label: { city: string; country?: string; iata?: string }): Promise<WeatherSnapshot>
}
