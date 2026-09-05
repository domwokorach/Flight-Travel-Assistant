import React from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../common/SectionHeading'
import YourJourney from './YourJourney'
import AirportServiceCard from './AirportServiceCard'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { staggerContainer } from '@/lib/motion'

const categories = [
  { value: 'before', title: 'Before you fly', icons: ['terminal', 'checkin', 'security', 'passport'] },
  { value: 'facilities', title: 'Facilities & comfort', icons: ['lounge', 'shop', 'food', 'wifi', 'charge'] },
  { value: 'after', title: 'After you land', icons: ['baggage', 'lost'] },
]

export default function AirportInfo({ services }) {
  const byIcon = Object.fromEntries(services.map(s => [s.icon, s]))

  return (
    <section id="airport" className="scroll-mt-24">
      <SectionHeading eyebrow="At the airport" title="Heathrow Terminal 5" />
      <YourJourney />
      <Accordion type="multiple" defaultValue={categories.map(c => c.value)} className="space-y-3">
        {categories.map(category => {
          const items = category.icons.map(icon => byIcon[icon]).filter(Boolean)
          if (!items.length) return null
          return (
            <AccordionItem key={category.value} value={category.value} className="rounded-3xl border border-border bg-card px-5 shadow-card">
              <AccordionTrigger className="text-sm font-black text-foreground hover:no-underline">
                {category.title}
                <span className="ml-2 text-xs font-semibold text-muted-foreground">{items.length} services</span>
              </AccordionTrigger>
              <AccordionContent>
                <motion.div
                  variants={staggerContainer(0.05)}
                  initial="hidden"
                  animate="show"
                  className="grid gap-3 pb-1 sm:grid-cols-2 xl:grid-cols-3"
                >
                  {items.map(service => <AirportServiceCard key={service.title} {...service} />)}
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </section>
  )
}
