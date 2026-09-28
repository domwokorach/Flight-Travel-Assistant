import type { ResolvedPlace } from '@/types/directions'

export interface PlacesProvider {
  searchText(query: string, opts?: { locationBias?: { lat: number; lon: number } }): Promise<ResolvedPlace[]>
}
