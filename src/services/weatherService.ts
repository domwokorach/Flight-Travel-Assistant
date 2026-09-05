import type { WeatherSnapshot } from '@/types/weather'
import { OpenMeteoProvider } from '@/lib/providers/weather/openMeteo'
import { findAirport } from '@/data/airportDirectory'

const provider = new OpenMeteoProvider()

export async function getWeatherForAirport(iata: string): Promise<WeatherSnapshot | null> {
  const airport = findAirport(iata)
  if (!airport) return null
  return provider.getWeather(airport.latitude, airport.longitude, airport.timezone, {
    city: airport.city,
    country: airport.country,
    iata: airport.iata,
  })
}

export async function getWeatherForCities(iatas: string[]): Promise<WeatherSnapshot[]> {
  const results = await Promise.all(iatas.map((iata) => getWeatherForAirport(iata)))
  return results.filter((w): w is WeatherSnapshot => w !== null)
}
