import { useMemo, useState } from 'react'
import { searchFlights } from '../services/flightService'

function matchesQuery(flight, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [flight.airline, flight.flightNumber, flight.from.city, flight.from.code, flight.to.city, flight.to.code]
    .some(value => value.toLowerCase().includes(q))
}

export function useFlightSearch(allFlights) {
  const [tab, setTab] = useState('departure')
  const [search, setSearch] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const visibleFlights = useMemo(() => {
    const items = allFlights.filter(f => f.type === tab)
    if (!search?.query) return items
    return items.filter(f => matchesQuery(f, search.query))
  }, [allFlights, tab, search])

  const changeTab = (next) => { setTab(next); setSearch(null); setError(false) }

  const doSearch = (criteria) => {
    setError(false)
    setLoading(true)
    if (criteria.filter === 'Departures') setTab('departure')
    if (criteria.filter === 'Arrivals') setTab('arrival')
    if (criteria.filter === 'Connections') setTab('connection')
    searchFlights(criteria)
      .then(() => setSearch(criteria))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  const clearSearch = () => { setSearch(null); setError(false) }

  return { tab, changeTab, search, loading, error, setError, visibleFlights, doSearch, clearSearch }
}
