import React from 'react'
import { Command, Plane } from 'lucide-react'
import MobileNavigation from './MobileNavigation'
import ThemeToggle from './ThemeToggle'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

const nav = [
  ['Flights', '#flights'],
  ['At the Airport', '#airport'],
  ['Transport & Directions', '#transport'],
]

export default function Header({ onOpenCommandMenu }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="FlightPath home">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-sky-500 shadow-lg shadow-sky-500/20"><Plane className="h-5 w-5 -rotate-12" /></span>
          <span><span className="block text-sm font-black tracking-tight">FlightPath</span><span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Travel assistant</span></span>
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {nav.map(([label, href]) => <a key={href} href={href} className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white">{label}</a>)}
        </nav>
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={onOpenCommandMenu}
                className="hidden items-center gap-2 text-slate-300 hover:bg-white/10 hover:text-white sm:inline-flex"
              >
                <Command className="h-4 w-4" />
                Quick search
                <kbd className="ml-1 rounded-md border border-white/15 bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-slate-300">⌘K</kbd>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Search flights, sections & actions</TooltipContent>
          </Tooltip>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Quick search"
            onClick={onOpenCommandMenu}
            className="text-slate-300 hover:bg-white/10 hover:text-white sm:hidden"
          >
            <Command className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          <MobileNavigation items={nav} />
        </div>
      </div>
    </header>
  )
}
