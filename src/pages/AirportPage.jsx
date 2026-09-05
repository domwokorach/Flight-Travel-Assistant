import React, { useEffect, useState } from 'react'
import AirportInfo from '../components/airport/AirportInfo'
import { getAirportServices } from '../services/airportService'

export default function AirportPage() {
  const [services, setServices] = useState([])

  useEffect(() => {
    getAirportServices().then(setServices)
  }, [])

  return (
    <div className="mt-10">
      <AirportInfo services={services} />
    </div>
  )
}
