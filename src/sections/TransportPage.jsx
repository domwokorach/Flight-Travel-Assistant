import React from 'react'
import DirectionsPanel from '../components/transport/DirectionsPanel'
import TransportCard from '../components/transport/TransportCard'
import { SectionHeading } from '../components/common/SectionHeading'
import { LiveIndicator } from '../components/common/LiveIndicator'
import { useTransportOptions } from '@/hooks/useTransport'

export default function TransportPage() {
  const toAirport = useTransportOptions('LHR', 'to')
  const fromAirport = useTransportOptions('JFK', 'from')

  return (
    <section id="transport" className="scroll-mt-24 pt-10">
      <SectionHeading eyebrow="Transport & directions" title="Airport transfers without the guesswork" />
      <DirectionsPanel />
      <div className="mt-7 grid gap-8 xl:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold text-muted-foreground">To the airport</p>
              <h3 className="mt-0.5 font-heading text-lg font-bold">Central London → Heathrow</h3>
            </div>
            <LiveIndicator state={toAirport.connectionState} lastUpdated={toAirport.lastUpdated} />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {toAirport.options.map((item) => (
              <TransportCard key={item.mode} item={item} originQuery="Central London" destinationQuery="Heathrow Airport" />
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold text-muted-foreground">From the arrival airport</p>
              <h3 className="mt-0.5 font-heading text-lg font-bold">JFK → Manhattan</h3>
            </div>
            <LiveIndicator state={fromAirport.connectionState} lastUpdated={fromAirport.lastUpdated} />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {fromAirport.options.map((item) => (
              <TransportCard key={item.mode} item={item} originQuery="JFK Airport" destinationQuery="Manhattan, New York" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
