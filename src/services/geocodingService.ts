import type { GeocodingMatch } from '@/types/geocoding'
import { getGeocodingProvider } from '@/lib/providers/geocoding'

export async function searchAddress(query: string): Promise<GeocodingMatch[] | null> {
  const provider = getGeocodingProvider()
  if (!provider) return null
  return provider.geocode(query)
}
