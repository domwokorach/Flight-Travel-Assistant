'use client'

import { useCallback, useEffect, useState } from 'react'

/** Generic "recently picked" list of string keys (IATA codes, airline codes, …)
 *  persisted to localStorage under `storageKey`, most-recent first. */
export function useRecentItems(storageKey: string, maxItems = 5) {
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // localStorage unavailable — recents simply won't persist
    }
  }, [storageKey])

  const add = useCallback(
    (value: string) => {
      setItems((prev) => {
        const next = [value, ...prev.filter((v) => v !== value)].slice(0, maxItems)
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(next))
        } catch {
          // ignore persistence failure
        }
        return next
      })
    },
    [storageKey, maxItems]
  )

  return { items, add }
}
