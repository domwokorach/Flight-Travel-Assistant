'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

type MapLibreModule = typeof import('maplibre-gl')
type MapLibreMap = import('maplibre-gl').Map

interface UseMapLibreMapOptions {
  styleUrl: string
  center: [number, number]
  zoom?: number
  /** Runs once the map instance exists — add markers/layers here. May return a cleanup function. */
  onReady?: (map: MapLibreMap, lib: MapLibreModule) => void | (() => void)
  /**
   * Extra values (besides styleUrl/center/zoom) that should trigger a full map rebuild when
   * they change — e.g. asynchronously-fetched route data that `onReady` draws but that isn't
   * known yet at first mount. Compared by reference/primitive equality per entry.
   */
  rebuildKey?: readonly unknown[]
}

/**
 * Shared MapLibre GL bootstrap (dynamic import, instance lifecycle, load-failure fallback)
 * extracted from AirportMap so FlightDirectionsMap can reuse it without duplicating the
 * ~40 lines of setup/teardown plumbing. Callers own what gets drawn via `onReady`.
 */
export function useMapLibreMap(containerRef: RefObject<HTMLDivElement | null>, options: UseMapLibreMapOptions) {
  const [loadError, setLoadError] = useState(false)
  const onReadyRef = useRef(options.onReady)
  onReadyRef.current = options.onReady

  const [lon, lat] = options.center
  const { styleUrl, zoom = 13, rebuildKey = [] } = options

  useEffect(() => {
    if (!containerRef.current) return
    let map: MapLibreMap | undefined
    let cleanup: (() => void) | void
    let cancelled = false

    import('maplibre-gl')
      .then((lib) => {
        if (cancelled || !containerRef.current) return
        const instance = new lib.Map({
          container: containerRef.current,
          style: styleUrl,
          center: [lon, lat],
          zoom,
        })
        map = instance
        instance.addControl(new lib.NavigationControl(), 'top-right')
        cleanup = onReadyRef.current?.(instance, lib)
      })
      .catch(() => setLoadError(true))

    return () => {
      cancelled = true
      cleanup?.()
      map?.remove()
    }
    // rebuildKey entries are serialized to a stable primitive below rather than spread here,
    // since the array itself is a fresh reference every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, styleUrl, lon, lat, zoom, rebuildKey.join('|')])

  return { loadError }
}
