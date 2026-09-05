import type { WeatherSnapshot } from '@/types/weather'
import { fetchJson } from '@/lib/http'
import { withServerCache } from '@/lib/serverCache'
import { formatLocalTime } from '@/lib/timezone'
import type { WeatherProvider } from './types'

interface OpenMeteoResponse {
  current?: {
    temperature_2m?: number
    weather_code?: number
    wind_speed_10m?: number
  }
  daily?: {
    temperature_2m_max?: number[]
    temperature_2m_min?: number[]
    precipitation_probability_max?: number[]
  }
}

// WMO weather interpretation codes -> condition text + icon bucket.
function describeWeatherCode(code: number | undefined): { condition: string; icon: WeatherSnapshot['icon'] } {
  if (code === undefined) return { condition: 'Unknown', icon: 'cloud' }
  if (code === 0) return { condition: 'Clear sky', icon: 'sun' }
  if (code <= 2) return { condition: 'Partly cloudy', icon: 'cloud' }
  if (code === 3) return { condition: 'Overcast', icon: 'cloud' }
  if (code === 45 || code === 48) return { condition: 'Fog', icon: 'fog' }
  if (code >= 51 && code <= 67) return { condition: 'Rain', icon: 'rain' }
  if (code >= 71 && code <= 77) return { condition: 'Snow', icon: 'snow' }
  if (code >= 80 && code <= 82) return { condition: 'Rain showers', icon: 'rain' }
  if (code >= 85 && code <= 86) return { condition: 'Snow showers', icon: 'snow' }
  if (code >= 95) return { condition: 'Thunderstorm', icon: 'storm' }
  return { condition: 'Windy', icon: 'wind' }
}

export class OpenMeteoProvider implements WeatherProvider {
  readonly name = 'Open-Meteo'

  async getWeather(
    latitude: number,
    longitude: number,
    timezone: string,
    label: { city: string; country?: string; iata?: string }
  ): Promise<WeatherSnapshot> {
    const cacheKey = `weather:${latitude.toFixed(2)}:${longitude.toFixed(2)}`
    const data = await withServerCache(cacheKey, 10 * 60_000, async () => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=${encodeURIComponent(timezone)}&forecast_days=1`
      return fetchJson<OpenMeteoResponse>(url, { revalidate: 600, timeoutMs: 7000 })
    })

    const { condition, icon } = describeWeatherCode(data.current?.weather_code)

    return {
      city: label.city,
      country: label.country,
      iata: label.iata,
      timezone,
      localTime: formatLocalTime(timezone),
      temp: Math.round(data.current?.temperature_2m ?? 0),
      condition,
      icon,
      high: Math.round(data.daily?.temperature_2m_max?.[0] ?? 0),
      low: Math.round(data.daily?.temperature_2m_min?.[0] ?? 0),
      rainChance: Math.round(data.daily?.precipitation_probability_max?.[0] ?? 0),
      windKph: data.current?.wind_speed_10m ? Math.round(data.current.wind_speed_10m) : undefined,
      alerts: [],
      fetchedAt: new Date().toISOString(),
    }
  }
}
