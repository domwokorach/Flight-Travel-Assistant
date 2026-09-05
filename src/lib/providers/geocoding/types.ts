import type { GeocodingMatch } from '@/types/geocoding'

export interface GeocodingProvider {
  geocode(query: string): Promise<GeocodingMatch[]>
}
