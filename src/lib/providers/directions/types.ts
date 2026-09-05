import type { DirectionsRoute } from '@/types/transport'

export interface DirectionsProvider {
  getDirections(
    from: { lat: number; lon: number },
    to: { lat: number; lon: number },
    mode: DirectionsRoute['mode']
  ): Promise<DirectionsRoute>
}
