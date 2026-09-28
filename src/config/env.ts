import { z } from 'zod'

/** Treats an unset-but-present `FOO=""` the same as a missing var, since .env files commonly
 *  ship optional keys as empty placeholders rather than omitting the line entirely. */
const optionalString = () => z.preprocess((value) => (value === '' ? undefined : value), z.string().min(1).optional())

const serverEnvSchema = z.object({
  // Which FlightProvider to construct. "aerodatabox" and "airlabs" are implemented;
  // selecting "cirium" or "flightaware" fails fast with a clear error (see providers/flight/index.ts).
  FLIGHT_PROVIDER: z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z.enum(['aerodatabox', 'airlabs', 'cirium', 'flightaware']).optional().default('aerodatabox'),
  ),
  AERODATABOX_API_KEY: optionalString(),
  AERODATABOX_BASE_URL: optionalString(),
  // AirLabs (https://airlabs.co) — free-tier schedules API, poll-only on the free plan
  // (webhook Flight Alerts require a paid plan). Selected via FLIGHT_PROVIDER=airlabs.
  AIRLABS_API_KEY: optionalString(),
  AIRLABS_BASE_URL: optionalString(),
  // Reserved for a future provider swap (see src/lib/providers/flight/types.ts). Not read by
  // any provider yet.
  CIRIUM_APP_ID: optionalString(),
  CIRIUM_APP_KEY: optionalString(),
  CIRIUM_BASE_URL: optionalString(),
  FLIGHTAWARE_API_KEY: optionalString(),
  FLIGHTAWARE_BASE_URL: optionalString(),
  // Open-Meteo needs no API key; the base URL is configurable for testing/self-hosting only.
  WEATHER_BASE_URL: optionalString(),
  // Reserved seam for a future GTFS transport provider — no adapter reads these yet.
  // TfL (src/lib/providers/transport/tfl.ts) remains the only implemented transport source.
  TRANSPORT_PROVIDER: optionalString(),
  LONDON_GTFS_URL: optionalString(),
  NEW_YORK_GTFS_URL: optionalString(),
  AMSTERDAM_GTFS_URL: optionalString(),
  ENABLE_MOCK_DATA: z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z.enum(['true', 'false']).optional().default('false'),
  ).transform((value) => value === 'true'),
  PUSH_PUBLIC_KEY: optionalString(),
  PUSH_PRIVATE_KEY: optionalString(),
  // Google Maps Platform server key (Routes API + Places API (New)). Server-only — never
  // exposed to the client, only used inside /api/directions/google and /api/places/search.
  // Absence degrades the Flight Directions screen to "Directions unavailable" rather than
  // failing startup, same as the other optional provider keys above.
  GOOGLE_MAPS_API_KEY: optionalString(),
})

const publicEnvSchema = z.object({
  NEXT_PUBLIC_MAPBOX_TOKEN: optionalString(),
  NEXT_PUBLIC_VAPID_PUBLIC_KEY: optionalString(),
  // MapLibre + OpenFreeMap — powers AirportMap.tsx tile rendering, no token needed.
  // Directions/geocoding stay on Mapbox's APIs (OpenFreeMap is tiles-only, no routing).
  NEXT_PUBLIC_MAP_STYLE_URL: optionalString(),
  // Logo.dev publishable token — powers real airline logos in AirlineLogo.tsx. This is
  // intentionally a publishable (client-safe) key, unlike the server-only provider keys
  // above; it's meant to be embedded in browser-rendered <img> URLs.
  NEXT_PUBLIC_LOGO_DEV_TOKEN: optionalString(),
})

/**
 * Validated at import time so a bad/missing var fails at startup, not on the
 * first request. AERODATABOX_API_KEY is optional: its absence (or
 * ENABLE_MOCK_DATA=true) is the documented switch to demo data, not an error.
 * The push and Mapbox vars are optional too: their features (web push, airport map)
 * degrade gracefully to "unavailable" rather than failing startup.
 */
export const serverEnv = serverEnvSchema.parse({
  FLIGHT_PROVIDER: process.env.FLIGHT_PROVIDER,
  AERODATABOX_API_KEY: process.env.AERODATABOX_API_KEY,
  AERODATABOX_BASE_URL: process.env.AERODATABOX_BASE_URL,
  AIRLABS_API_KEY: process.env.AIRLABS_API_KEY,
  AIRLABS_BASE_URL: process.env.AIRLABS_BASE_URL,
  CIRIUM_APP_ID: process.env.CIRIUM_APP_ID,
  CIRIUM_APP_KEY: process.env.CIRIUM_APP_KEY,
  CIRIUM_BASE_URL: process.env.CIRIUM_BASE_URL,
  FLIGHTAWARE_API_KEY: process.env.FLIGHTAWARE_API_KEY,
  FLIGHTAWARE_BASE_URL: process.env.FLIGHTAWARE_BASE_URL,
  WEATHER_BASE_URL: process.env.WEATHER_BASE_URL,
  TRANSPORT_PROVIDER: process.env.TRANSPORT_PROVIDER,
  LONDON_GTFS_URL: process.env.LONDON_GTFS_URL,
  NEW_YORK_GTFS_URL: process.env.NEW_YORK_GTFS_URL,
  AMSTERDAM_GTFS_URL: process.env.AMSTERDAM_GTFS_URL,
  ENABLE_MOCK_DATA: process.env.ENABLE_MOCK_DATA,
  PUSH_PUBLIC_KEY: process.env.PUSH_PUBLIC_KEY,
  PUSH_PRIVATE_KEY: process.env.PUSH_PRIVATE_KEY,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
})

export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  NEXT_PUBLIC_MAP_STYLE_URL: process.env.NEXT_PUBLIC_MAP_STYLE_URL,
  NEXT_PUBLIC_LOGO_DEV_TOKEN: process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN,
})
