import React from 'react'
import { Plane, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import SplitFlapTitle from '@/components/board/SplitFlapTitle'
import MobileNavigation, { type NavItem } from './MobileNavigation'
import ThemeToggle from './ThemeToggle'

const nav: NavItem[] = [
  ['Flights', '#flights'],
  ['Directions', '#directions'],
  ['At the Airport', '#airport'],
  ['Transport & Directions', '#transport'],
]

export interface HeaderProps {
  onOpenCommandMenu: () => void
}

export default function Header({ onOpenCommandMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border-muted bg-background/90 text-foreground backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center px-4 sm:px-6">
        <a href="#top" aria-label="Travel Assistant home" className="flex flex-grow items-center gap-3 text-inherit no-underline">
          <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary">
            <Plane className="size-5 -rotate-12 text-primary-foreground" />
          </div>
          <SplitFlapTitle
            lines={['TRAVEL ASSISTANT']}
            className="hidden gap-0 sm:flex"
            cellClassName="h-6 w-[15px] text-[13px] md:h-7 md:w-[17px] md:text-[15px]"
          />
          <SplitFlapTitle
            lines={['TRAVEL', 'ASSISTANT']}
            className="gap-[2px] sm:hidden"
            rowClassName="gap-[2px]"
            cellClassName="h-3.5 w-[9px] text-[9px]"
          />
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {nav.map(([label, href]) => (
            <Button key={href} asChild variant="ghost" className="text-text-secondary hover:bg-accent hover:text-foreground">
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
                className="hidden text-text-secondary hover:bg-accent hover:text-foreground sm:inline-flex"
              >
                <Search className="size-4.5" />
                Quick search
                <kbd className="ml-1 rounded-md border border-border bg-accent px-1.5 py-0.5 text-[10px] font-bold">⌘K</kbd>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Search flights, sections & actions</TooltipContent>
          </Tooltip>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Quick search"
            onClick={onOpenCommandMenu}
            className="text-text-secondary hover:bg-accent hover:text-foreground sm:hidden"
          >
            <Search className="size-4.5" />
          </Button>
          <ThemeToggle />
          <MobileNavigation items={nav} />
        </div>
      </div>
    </header>
  )
}
