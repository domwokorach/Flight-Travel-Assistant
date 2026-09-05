import { z } from 'zod'

/** Treats an unset-but-present `FOO=""` the same as a missing var, since .env files commonly
 *  ship optional keys as empty placeholders rather than omitting the line entirely. */
const optionalString = () => z.preprocess((value) => (value === '' ? undefined : value), z.string().min(1).optional())

const serverEnvSchema = z.object({
  AERODATABOX_API_KEY: optionalString(),
  ENABLE_MOCK_DATA: z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z.enum(['true', 'false']).optional().default('false'),
  ).transform((value) => value === 'true'),
  PUSH_PUBLIC_KEY: optionalString(),
  PUSH_PRIVATE_KEY: optionalString(),
})

const publicEnvSchema = z.object({
  NEXT_PUBLIC_MAPBOX_TOKEN: optionalString(),
  NEXT_PUBLIC_VAPID_PUBLIC_KEY: optionalString(),
})

/**
 * Validated at import time so a bad/missing var fails at startup, not on the
 * first request. AERODATABOX_API_KEY is optional: its absence (or
 * ENABLE_MOCK_DATA=true) is the documented switch to demo data, not an error.
 * The push and Mapbox vars are optional too: their features (web push, airport map)
 * degrade gracefully to "unavailable" rather than failing startup.
 */
export const serverEnv = serverEnvSchema.parse({
  AERODATABOX_API_KEY: process.env.AERODATABOX_API_KEY,
  ENABLE_MOCK_DATA: process.env.ENABLE_MOCK_DATA,
  PUSH_PUBLIC_KEY: process.env.PUSH_PUBLIC_KEY,
  PUSH_PRIVATE_KEY: process.env.PUSH_PRIVATE_KEY,
})

export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
})
