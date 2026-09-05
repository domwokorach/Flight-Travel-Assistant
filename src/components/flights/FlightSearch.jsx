import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import { CalendarIcon, Clock3, Loader2, RotateCcw, Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { fadeInUp } from '@/lib/motion'

const recent = ['BA117', 'London', 'JFK']

export default function FlightSearch({ onSearch, onClear, loading = false }) {
  const [date, setDate] = useState(parseISO('2026-09-04'))
  const [searchBy, setSearchBy] = useState('Flight number')
  const [query, setQuery] = useState('BA117')
  const [filter, setFilter] = useState('All')

  const submit = (e) => {
    e.preventDefault()
    onSearch({ query, searchBy, date: format(date, 'yyyy-MM-dd'), filter })
  }
  const clear = () => { setQuery(''); setFilter('All'); onClear() }

  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="show" transition={{ duration: 0.4 }}>
      <Card className="relative overflow-hidden p-4 sm:p-6">
        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-sky-500 via-cyan-400 to-blue-600" />
        <form onSubmit={submit}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div><p className="eyebrow">Find your flight</p><h1 className="mt-1 text-2xl font-black tracking-tight text-foreground sm:text-3xl">Departures, arrivals & connections</h1></div>
            <div className="hidden rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground sm:block">Live-style demo data</div>
          </div>
          <div className="grid gap-3 lg:grid-cols-[170px_170px_1fr_170px_auto]">
            <div>
              <Label className="metric-label">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button type="button" variant="outline" className="mt-1.5 w-full justify-start gap-2 font-semibold">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    {format(date, 'd MMM yyyy')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={d => d && setDate(d)} autoFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="metric-label">Search by</Label>
              <Select value={searchBy} onValueChange={setSearchBy}>
                <SelectTrigger className="mt-1.5 w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Airline">Airline</SelectItem>
                  <SelectItem value="Flight number">Flight number</SelectItem>
                  <SelectItem value="City">City</SelectItem>
                  <SelectItem value="Airport">Airport</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="metric-label">Search</Label>
              <div className="relative mt-1.5">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="BA117, British Airways, London, LHR…" className="h-9 pl-9" />
              </div>
            </div>

            <div>
              <Label className="metric-label">Flight type</Label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="mt-1.5 w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Departures">Departures</SelectItem>
                  <SelectItem value="Arrivals">Arrivals</SelectItem>
                  <SelectItem value="Connections">Connections</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button type="submit" disabled={loading} className="h-9 flex-1 lg:flex-none">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                Search
              </Button>
              <Button type="button" variant="outline" onClick={clear} className="h-9 px-3" aria-label="Clear search">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 font-semibold"><Clock3 className="h-3.5 w-3.5" />Recent:</span>
            {recent.map(item => (
              <button
                type="button"
                key={item}
                onClick={() => setQuery(item)}
                className="rounded-full border border-border bg-muted px-3 py-1.5 font-semibold transition hover:border-sky-300 hover:bg-accent hover:text-accent-foreground"
              >
                {item}
              </button>
            ))}
          </div>
        </form>
      </Card>
    </motion.div>
  )
}
