import React, { useEffect, useState } from 'react'
import DirectionsPanel from '../components/transport/DirectionsPanel'
import TransportCard from '../components/transport/TransportCard'
import { SectionHeading } from '../components/common/SectionHeading'
import { getTransportFrom, getTransportTo } from '../services/transportService'

export default function TransportPage() {
  const [transportTo, setTransportTo] = useState([])
  const [transportFrom, setTransportFrom] = useState([])

  useEffect(() => {
    getTransportTo().then(setTransportTo)
    getTransportFrom().then(setTransportFrom)
  }, [])

  return (
    <section id="transport" className="scroll-mt-24 pt-10">
      <SectionHeading eyebrow="Transport & directions" title="Airport transfers without the guesswork" />
      <DirectionsPanel />
      <div className="mt-7 grid gap-8 xl:grid-cols-2">
        <div>
          <div className="mb-4">
            <p className="text-[11px] font-bold text-muted-foreground">To the airport</p>
            <h3 className="mt-0.5 font-heading text-lg font-bold">Central London → Heathrow</h3>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {transportTo.map((item) => (
              <TransportCard key={item.mode} item={item} />
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4">
            <p className="text-[11px] font-bold text-muted-foreground">From the arrival airport</p>
            <h3 className="mt-0.5 font-heading text-lg font-bold">JFK → Manhattan</h3>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {transportFrom.map((item) => (
              <TransportCard key={item.mode} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
