import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import UmbrellaIcon from '@mui/icons-material/Umbrella'
import LocalTimeCard from './LocalTimeCard'

function WeatherIcon({ type }) {
  if (type === 'sun') return <WbSunnyIcon sx={{ fontSize: 28, color: '#D9A441' }} />
  return <CloudQueueIcon sx={{ fontSize: 28, color: 'primary.main' }} />
}

export default function CityWeatherCard({ cities, selected, onSelect }) {
  const city = cities[selected]
  return (
    <Card sx={{ p: { xs: 2.5, sm: 3 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Box>
          <Typography variant="overline" sx={{ fontSize: 11, color: 'text.secondary' }}>City, weather & local time</Typography>
          <Typography variant="h6" sx={{ mt: 0.5 }}>{city.city}</Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'text.secondary' }}>{city.country} · {city.code}</Typography>
        </Box>
        <Box sx={{ width: 48, height: 48, borderRadius: 4, bgcolor: 'action.hover', display: 'grid', placeItems: 'center' }}>
          <WeatherIcon type={city.icon} />
        </Box>
      </Stack>

      <Box sx={{ mt: 2.5, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <LocalTimeCard offsetHours={city.offsetHours} offsetLabel={city.offset} />
        <Box sx={{ borderRadius: 4, bgcolor: 'primary.light', p: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'primary.dark' }}>
            <CloudQueueIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Weather</Typography>
          </Stack>
          <Typography sx={{ mt: 1, fontSize: 28, fontWeight: 800 }}>{city.temp}°C</Typography>
          <Typography sx={{ mt: 0.5, fontSize: 12, fontWeight: 600, color: 'text.secondary' }}>{city.condition}</Typography>
        </Box>
      </Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2, borderRadius: 4, border: '1px solid', borderColor: 'divider', px: 2, py: 1.5 }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'text.secondary' }}>
          High {city.high}° · Low {city.low}°
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ fontSize: 13, fontWeight: 700 }}>
          <UmbrellaIcon sx={{ fontSize: 16, color: 'primary.main' }} />
          <span>{city.rain}% rain</span>
        </Stack>
      </Stack>

      <Tabs
        value={selected}
        onChange={(_e, v) => onSelect(v)}
        variant="fullWidth"
        sx={{ mt: 2, bgcolor: 'action.hover', borderRadius: 999, p: 0.5, minHeight: 0 }}
        TabIndicatorProps={{ sx: { display: 'none' } }}
      >
        {Object.values(cities).map(item => (
          <Tab
            key={item.key}
            value={item.key}
            label={item.role}
            sx={{ minHeight: 36, fontSize: 12, '&.Mui-selected': { bgcolor: 'background.paper', borderRadius: 999, boxShadow: '0 1px 3px rgba(20,24,31,0.12)' } }}
          />
        ))}
      </Tabs>
    </Card>
  )
}
