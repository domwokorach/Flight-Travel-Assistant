import React from 'react'
import { Plane, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import MobileNavigation from './MobileNavigation'

const nav = [
  ['Flights', '#flights'],
  ['At the Airport', '#airport'],
  ['Transport & Directions', '#transport'],
]

export default function Header({ onOpenCommandMenu }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(15,23,42,0.97)] text-white backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center px-4 sm:px-6">
        <a href="#top" aria-label="FlightPath home" className="flex flex-grow items-center gap-3 text-inherit no-underline">
          <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#38BDF8] shadow-[0_8px_20px_rgba(56,189,248,0.25)]">
            <Plane className="size-5 -rotate-12 text-[#0F172A]" />
          </div>
          <div>
            <p className="font-heading text-sm font-extrabold">FlightPath</p>
            <p className="text-[10px] font-bold tracking-[0.15em] text-white/55 uppercase">Travel assistant</p>
          </div>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {nav.map(([label, href]) => (
            <Button key={href} asChild variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white">
              <a href={href}>{label}</a>
            </Button>
          ))}
        </nav>

        <div className="ml-2 flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onOpenCommandMenu}
                variant="ghost"
                className="hidden text-white/80 hover:bg-white/10 hover:text-white sm:inline-flex"
              >
                <Search className="size-4.5" />
                Quick search
                <kbd className="ml-1 rounded-md border border-white/15 bg-white/10 px-1.5 py-0.5 text-[10px] font-bold">⌘K</kbd>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Search flights, sections & actions</TooltipContent>
          </Tooltip>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Quick search"
            onClick={onOpenCommandMenu}
            className="text-white/80 hover:bg-white/10 hover:text-white sm:hidden"
          >
            <Search className="size-4.5" />
          </Button>
          <MobileNavigation items={nav} />
        </div>
      </div>
    </header>
  )
}
