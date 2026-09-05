import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import FlightLandIcon from '@mui/icons-material/FlightLand'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'

const tabs = [
  { key: 'departure', label: 'Departures', icon: FlightTakeoffIcon },
  { key: 'arrival', label: 'Arrivals', icon: FlightLandIcon },
  { key: 'connection', label: 'Connecting', icon: SwapHorizIcon },
]

export default function FlightTabs({ value, onChange }) {
  return (
    <Box sx={{ bgcolor: 'action.hover', borderRadius: 999, p: 0.5, display: 'inline-flex', maxWidth: '100%' }}>
      <Tabs
        value={value}
        onChange={(_e, v) => onChange(v)}
        variant="scrollable"
        scrollButtons={false}
        aria-label="Flight views"
        TabIndicatorProps={{ sx: { display: 'none' } }}
        sx={{ minHeight: 0 }}
      >
        {tabs.map(({ key, label, icon: Icon }) => (
          <Tab
            key={key}
            value={key}
            label={label}
            icon={<Icon sx={{ fontSize: 18 }} />}
            iconPosition="start"
            disableRipple={false}
            sx={{
              minHeight: 40,
              px: 2,
              '&.Mui-selected': { bgcolor: 'background.paper', boxShadow: '0 1px 3px rgba(20,24,31,0.12)' },
            }}
          />
        ))}
      </Tabs>
    </Box>
  )
}
