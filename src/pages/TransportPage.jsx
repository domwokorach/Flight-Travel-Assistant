import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
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
    <Box component="section" id="transport" sx={{ scrollMarginTop: 96, pt: 5 }}>
      <SectionHeading eyebrow="Transport & directions" title="Airport transfers without the guesswork" />
      <DirectionsPanel />
      <Box sx={{ mt: 3.5, display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', xl: '1fr 1fr' } }}>
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="overline" sx={{ fontSize: 11, color: 'text.secondary' }}>To the airport</Typography>
            <Typography variant="h6" sx={{ mt: 0.5 }}>Central London → Heathrow</Typography>
          </Box>
          <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
            {transportTo.map(item => <TransportCard key={item.mode} item={item} />)}
          </Box>
        </Box>
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="overline" sx={{ fontSize: 11, color: 'text.secondary' }}>From the arrival airport</Typography>
            <Typography variant="h6" sx={{ mt: 0.5 }}>JFK → Manhattan</Typography>
          </Box>
          <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
            {transportFrom.map(item => <TransportCard key={item.mode} item={item} />)}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
