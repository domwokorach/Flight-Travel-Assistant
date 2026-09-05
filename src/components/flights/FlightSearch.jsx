import React, { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { Search, RotateCcw, Clock, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AirlineLogo from './AirlineLogo'
import { getAirline } from '@/data/airlines'

const recent = ['BA117', 'VS103', 'London', 'JFK']

function airlineCodeFor(term) {
  const code = term.match(/^([A-Z]{2})\d+$/)?.[1]
  return code && getAirline(code) ? code : null
}

export default function FlightSearch({ onSearch, onClear, loading = false }) {
  const [date, setDate] = useState('2026-09-04')
  const [searchBy, setSearchBy] = useState('Flight number')
  const [query, setQuery] = useState('BA117')
  const [filter, setFilter] = useState('All')

  const submit = (e) => {
    e.preventDefault()
    onSearch({ query, searchBy, date: format(parseISO(date), 'yyyy-MM-dd'), filter })
  }
  const clear = () => {
    setQuery('')
    setFilter('All')
    onClear()
  }

  return (
    <Card className="relative overflow-hidden p-5 sm:p-6">
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#4F8CFF,#7DB3FF,#4F8CFF)]" />
      <form onSubmit={submit}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold text-muted-foreground">Find your flight</p>
            <h1 className="mt-0.5 font-heading text-2xl font-extrabold sm:text-[30px]">Departures, arrivals & connections</h1>
          </div>
          <Badge className="hidden bg-primary/15 text-primary-light sm:inline-flex">Live-style demo data</Badge>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="search-date">Date</Label>
            <Input id="search-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-10 lg:w-[170px]" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Search by</Label>
            <Select value={searchBy} onValueChange={setSearchBy}>
              <SelectTrigger size="sm" className="h-10 lg:w-[170px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['Airline', 'Flight number', 'City', 'Airport'].map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-1 flex-col gap-1.5">
            <Label htmlFor="search-query">Search</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search-query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="BA117, British Airways, London, LHR…"
                className="h-10 pl-10"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Flight type</Label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger size="sm" className="h-10 lg:w-[170px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['All', 'Departures', 'Arrivals', 'Connections'].map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="h-10 flex-1 lg:flex-none">
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
              Search
            </Button>
            <Button type="button" variant="outline" size="icon" onClick={clear} aria-label="Clear search" className="size-10 rounded-xl">
              <RotateCcw className="size-4" />
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
            <Clock className="size-3.5" />
            Recent:
          </span>
          {recent.map((item) => {
            const code = airlineCodeFor(item)
            return (
              <button
                key={item}
                type="button"
                onClick={() => setQuery(item)}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-accent px-3 text-xs font-bold transition-colors hover:bg-muted"
              >
                {code && <AirlineLogo airlineCode={code} size="sm" className="size-5" />}
                {item}
              </button>
            )
          })}
        </div>
      </form>
    </Card>
  )
}
