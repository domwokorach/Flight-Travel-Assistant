import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Menu, X, Plane } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetClose } from '@/components/ui/sheet'

export default function MobileNavigation({ items }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
        className="text-text-secondary hover:bg-white/5 md:hidden"
      >
        <Menu className="size-5" />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" showCloseButton={false} className="w-70 max-w-[80vw] rounded-none border-l border-white/8 bg-background-alt p-0 text-foreground">
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <SheetTitle className="sr-only">Mobile navigation</SheetTitle>
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="grid size-8 place-items-center rounded-xl bg-primary">
                  <Plane className="size-4 -rotate-12 text-primary-foreground" />
                </div>
                <p className="font-extrabold">FlightPath</p>
              </div>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" aria-label="Close navigation" className="text-text-secondary hover:bg-white/5">
                  <X className="size-4.5" />
                </Button>
              </SheetClose>
            </div>
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-3.5">
              {items.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="min-h-11 rounded-2xl px-3.5 py-3 text-sm font-bold hover:bg-white/5"
                >
                  {label}
                </a>
              ))}
            </nav>
          </motion.div>
        </SheetContent>
      </Sheet>
    </>
  )
}
