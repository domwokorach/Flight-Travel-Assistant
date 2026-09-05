import React from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { SectionHeading } from '../common/SectionHeading'
import YourJourney from './YourJourney'
import AirportServiceCard from './AirportServiceCard'

const categories = [
  { value: 'before', title: 'Before you fly', icons: ['terminal', 'checkin', 'security', 'passport'] },
  { value: 'facilities', title: 'Facilities & comfort', icons: ['lounge', 'shop', 'food', 'wifi', 'charge'] },
  { value: 'after', title: 'After you land', icons: ['baggage', 'lost'] },
]

export default function AirportInfo({ services }) {
  const byIcon = Object.fromEntries(services.map((s) => [s.icon, s]))
  const visibleValues = categories
    .filter((category) => category.icons.some((icon) => byIcon[icon]))
    .map((category) => category.value)

  return (
    <section id="airport" className="scroll-mt-24">
      <SectionHeading eyebrow="At the airport" title="Heathrow Terminal 5" />
      <YourJourney />
      <div className="flex flex-col gap-3">
        {categories.map((category) => {
          const items = category.icons.map((icon) => byIcon[icon]).filter(Boolean)
          if (!items.length) return null
          return (
            <Accordion key={category.value} type="multiple" defaultValue={visibleValues} className="rounded-3xl border border-border px-5">
              <AccordionItem value={category.value} className="border-b-0">
                <AccordionTrigger>
                  <span>
                    {category.title}
                    <span className="ml-2 text-xs font-semibold text-muted-foreground">{items.length} services</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {items.map((service) => (
                      <AirportServiceCard key={service.title} {...service} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        })}
      </div>
    </section>
  )
}
