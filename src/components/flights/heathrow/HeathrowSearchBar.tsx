import React from 'react'
import { Search, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TERMINAL_OPTIONS, type TerminalFilter } from './terminal'

interface HeathrowSearchBarProps {
  date: string
  onDateChange: (value: string) => void
  query: string
  onQueryChange: (value: string) => void
  onSubmit: () => void
  terminal: TerminalFilter
  onTerminalChange: (value: TerminalFilter) => void
}

export default function HeathrowSearchBar({
  date,
  onDateChange,
  query,
  onQueryChange,
  onSubmit,
  terminal,
  onTerminalChange,
}: HeathrowSearchBarProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)] sm:p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="flex flex-col gap-2.5 md:flex-row md:items-center"
      >
        <label className="relative flex h-11 shrink-0 items-center rounded-xl border border-border bg-background px-3 md:w-[160px]">
          <Calendar className="mr-2 size-4 text-muted-foreground" />
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            aria-label="Date"
            className="h-full w-full bg-transparent text-sm font-semibold text-foreground outline-none"
          />
        </label>

        <label className="relative flex h-11 flex-1 items-center rounded-xl border border-border bg-background px-3">
          <Search className="mr-2 size-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Flight number, airline, or city…"
            aria-label="Search flights"
            className="h-full w-full bg-transparent text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground placeholder:font-medium"
          />
        </label>

        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98]"
        >
          <Search className="size-4" />
          Search
        </button>
      </form>

      <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="mr-1 shrink-0 text-[11px] font-bold tracking-wide text-muted-foreground uppercase">Terminal</span>
        {TERMINAL_OPTIONS.map((option) => {
          const active = terminal === option
          return (
            <button
              key={option}
              type="button"
              onClick={() => onTerminalChange(option)}
              aria-pressed={active}
              className={cn(
                'h-8 shrink-0 rounded-full border px-3.5 text-[13px] font-bold whitespace-nowrap transition-colors',
                active
                  ? 'border-transparent bg-[var(--hrw-magenta)] text-white'
                  : 'border-border bg-background text-muted-foreground hover:border-border-strong hover:text-foreground'
              )}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}
