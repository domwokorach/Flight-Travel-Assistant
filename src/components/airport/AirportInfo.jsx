import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { SectionHeading } from '../common/SectionHeading'
import YourJourney from './YourJourney'
import AirportServiceCard from './AirportServiceCard'

const categories = [
  { value: 'before', title: 'Before you fly', icons: ['terminal', 'checkin', 'security', 'passport'] },
  { value: 'facilities', title: 'Facilities & comfort', icons: ['lounge', 'shop', 'food', 'wifi', 'charge'] },
  { value: 'after', title: 'After you land', icons: ['baggage', 'lost'] },
]

export default function AirportInfo({ services }) {
  const byIcon = Object.fromEntries(services.map(s => [s.icon, s]))

  return (
    <Box component="section" id="airport" sx={{ scrollMarginTop: 96 }}>
      <SectionHeading eyebrow="At the airport" title="Heathrow Terminal 5" />
      <YourJourney />
      <Stack spacing={1.5}>
        {categories.map(category => {
          const items = category.icons.map(icon => byIcon[icon]).filter(Boolean)
          if (!items.length) return null
          return (
            <Accordion
              key={category.value}
              defaultExpanded
              disableGutters
              sx={{
                borderRadius: 5,
                border: '1px solid',
                borderColor: 'divider',
                '&:before': { display: 'none' },
                '&.Mui-expanded': { margin: 0 },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2.5 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 14 }}>
                  {category.title}
                  <Typography component="span" sx={{ ml: 1, fontSize: 12, fontWeight: 600, color: 'text.secondary' }}>
                    {items.length} services
                  </Typography>
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pb: 2.5 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', xl: 'repeat(3, 1fr)' }, gap: 1.5 }}>
                  {items.map(service => <AirportServiceCard key={service.title} {...service} />)}
                </Box>
              </AccordionDetails>
            </Accordion>
          )
        })}
      </Stack>
    </Box>
  )
}
