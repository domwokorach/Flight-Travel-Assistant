/** A single in-flight position sample from AirLabs' /flights tracker. Only meaningful while
 *  a flight's status is `in_air` — there's no position data before takeoff or after landing. */
export interface LiveFlightPosition {
  flightNumber: string
  latitude: number
  longitude: number
  /** Metres */
  altitude: number | null
  /** km/h */
  speed: number | null
  /** Degrees, 0-360 */
  direction: number | null
  updatedAt: string
}
