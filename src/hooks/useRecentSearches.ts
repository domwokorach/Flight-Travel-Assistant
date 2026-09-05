'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'flightpath.recentSearches'
const MAX_ITEMS = 8

export function useRecentSearches() {
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // localStorage unavailable — recent searches simply won't persist
    }
  }, [])

  const add = useCallback((value: string) => {
    setItems((prev) => {
      const next = [value, ...prev.filter((v) => v.toLowerCase() !== value.toLowerCase())].slice(0, MAX_ITEMS)
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore persistence failure
      }
      return next
    })
  }, [])

  const clear = useCallback(() => {
    setItems([])
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  return { items, add, clear }
}
