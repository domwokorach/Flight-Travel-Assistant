import React from 'react'
import AirportInfo from '../components/airport/AirportInfo'
import { useAirportServices } from '@/hooks/useAirport'

export default function AirportPage() {
  const { services } = useAirportServices('LHR')

  return (
    <div className="mt-10">
      <AirportInfo services={services} />
    </div>
  )
}
