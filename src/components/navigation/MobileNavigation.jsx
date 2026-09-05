import React from 'react'
import { Menu, Plane, X } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

export default function MobileNavigation({ items }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open navigation" className="text-slate-200 hover:bg-white/10 hover:text-white md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" showCloseButton={false} className="border-l border-white/10 bg-slate-950 text-white">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-white">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-sky-500 shadow-lg shadow-sky-500/20">
              <Plane className="h-4 w-4 -rotate-12" />
            </span>
            FlightPath
          </SheetTitle>
        </SheetHeader>
        <SheetClose asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Close navigation" className="absolute top-3 right-3 text-slate-300 hover:bg-white/10 hover:text-white">
            <X className="h-4 w-4" />
          </Button>
        </SheetClose>
        <nav className="flex flex-col gap-1 px-4" aria-label="Mobile navigation">
          {items.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              {label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
