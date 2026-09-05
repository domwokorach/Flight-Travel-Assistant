import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DirectionsPanel from '../components/transport/DirectionsPanel'
import TransportCard from '../components/transport/TransportCard'
import { SectionHeading } from '../components/common/SectionHeading'
import { getTransportFrom, getTransportTo } from '../services/transportService'
import { staggerContainer } from '@/lib/motion'

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
          <div className="mb-4"><p className="eyebrow">To the airport</p><h3 className="mt-1 text-lg font-black text-foreground">Central London → Heathrow</h3></div>
          <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} className="grid gap-3 sm:grid-cols-2">
            {transportTo.map(item => <TransportCard key={item.mode} item={item} />)}
          </motion.div>
        </div>
        <div>
          <div className="mb-4"><p className="eyebrow">From the arrival airport</p><h3 className="mt-1 text-lg font-black text-foreground">JFK → Manhattan</h3></div>
          <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} className="grid gap-3 sm:grid-cols-2">
            {transportFrom.map(item => <TransportCard key={item.mode} item={item} />)}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
