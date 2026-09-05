import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import AirportInfo from '../components/airport/AirportInfo'
import { getAirportServices } from '../services/airportService'

export default function AirportPage() {
  const [services, setServices] = useState([])

  useEffect(() => {
    getAirportServices().then(setServices)
  }, [])

  return (
    <Box sx={{ mt: 5 }}>
      <AirportInfo services={services} />
    </Box>
  )
}
