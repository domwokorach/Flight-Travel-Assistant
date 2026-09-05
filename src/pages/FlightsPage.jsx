import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import RefreshIcon from '@mui/icons-material/Refresh'
import GridViewIcon from '@mui/icons-material/GridView'
import ViewListIcon from '@mui/icons-material/ViewList'
import FlightSearch from '../components/flights/FlightSearch'
import FlightTabs from '../components/flights/FlightTabs'
import FlightCard from '../components/flights/FlightCard'
import ConnectionCard from '../components/flights/ConnectionCard'
import DepartureBoard from '../components/board/DepartureBoard'
import CityWeatherCard from '../components/location/CityWeatherCard'
import AirportSnapshot from '../components/airport/AirportSnapshot'
import AlertEscalation from '../components/alerts/AlertEscalation'
import { SkeletonFlightCard } from '../components/flights/FlightCardSkeleton'
import { SectionHeading } from '../components/common/SectionHeading'
import { useFlightSearch } from '../hooks/useFlightSearch'
import { getFlights, getConnectionJourney } from '../services/flightService'
import { getCityInfo } from '../services/weatherService'

function EmptyState({ query, onReset }) {
  return (
    <Card sx={{ p: { xs: 4, sm: 6 }, textAlign: 'center' }}>
      <Box sx={{ mx: 'auto', width: 48, height: 48, borderRadius: 4, bgcolor: 'action.hover', display: 'grid', placeItems: 'center' }}>
        <InfoOutlinedIcon sx={{ color: 'text.secondary' }} />
      </Box>
      <Typography variant="h6" sx={{ mt: 2 }}>No matching flights</Typography>
      <Typography sx={{ mx: 'auto', mt: 1, maxWidth: 420, fontSize: 14, fontWeight: 500, lineHeight: 1.6, color: 'text.secondary' }}>
        We couldn't find a demo flight matching "{query}". Try BA117, London, JFK, British Airways, or clear the search.
      </Typography>
      <Button variant="outlined" onClick={onReset} sx={{ mt: 2.5 }}>Clear search</Button>
    </Card>
  )
}

function ErrorState({ onRetry }) {
  return (
    <Alert severity="error" icon={<InfoOutlinedIcon />} sx={{ p: 2.5 }}>
      <AlertTitle sx={{ fontWeight: 800 }}>Flight information unavailable</AlertTitle>
      The interface is ready for API error handling. Retry to restore the mock feed.
      <Box sx={{ mt: 1.5 }}>
        <Button variant="contained" color="error" size="small" startIcon={<RefreshIcon />} onClick={onRetry}>
          Try Again
        </Button>
      </Box>
    </Alert>
  )
}

export default function FlightsPage({ countdown }) {
  const [allFlights, setAllFlights] = useState([])
  const [connectionJourney, setConnectionJourney] = useState(null)
  const [cityInfo, setCityInfo] = useState(null)
  const [selectedCity, setSelectedCity] = useState('destination')
  const [view, setView] = useState('cards')

  useEffect(() => {
    getFlights().then(setAllFlights)
    getConnectionJourney().then(setConnectionJourney)
    getCityInfo().then(setCityInfo)
  }, [])

  const { tab, changeTab, search, loading, error, setError, visibleFlights, doSearch, clearSearch } = useFlightSearch(allFlights)

  return (
    <Box component="section" id="flights" sx={{ scrollMarginTop: 96, pt: 3.5 }}>
      <FlightSearch onSearch={doSearch} onClear={clearSearch} loading={loading} />

      <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="flex-end" gap={2} sx={{ mb: 2.5, mt: 3.5 }}>
        <SectionHeading eyebrow="Flights" title="Your travel day at a glance" />
        <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1}>
          <FlightTabs value={tab} onChange={changeTab} />
          {tab !== 'connection' && (
            <Box sx={{ bgcolor: 'action.hover', borderRadius: 999, p: 0.5 }}>
              <Tabs
                value={view}
                onChange={(_e, v) => setView(v)}
                TabIndicatorProps={{ sx: { display: 'none' } }}
                sx={{ minHeight: 0 }}
              >
                <Tab
                  value="cards"
                  label="Cards"
                  icon={<GridViewIcon sx={{ fontSize: 15 }} />}
                  iconPosition="start"
                  sx={{ minHeight: 36, fontSize: 12, px: 1.5, '&.Mui-selected': { bgcolor: 'background.paper', boxShadow: '0 1px 3px rgba(20,24,31,0.12)' } }}
                />
                <Tab
                  value="board"
                  label="Board"
                  icon={<ViewListIcon sx={{ fontSize: 15 }} />}
                  iconPosition="start"
                  sx={{ minHeight: 36, fontSize: 12, px: 1.5, '&.Mui-selected': { bgcolor: 'background.paper', boxShadow: '0 1px 3px rgba(20,24,31,0.12)' } }}
                />
              </Tabs>
            </Box>
          )}
        </Stack>
      </Stack>

      <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', lg: 'minmax(0,1.7fr) minmax(320px,.8fr)' } }}>
        <Stack spacing={2}>
          {loading ? (
            <>
              <SkeletonFlightCard />
              <SkeletonFlightCard />
            </>
          ) : error ? (
            <ErrorState onRetry={() => setError(false)} />
          ) : tab === 'connection' ? (
            connectionJourney && <ConnectionCard journey={connectionJourney} />
          ) : !visibleFlights.length ? (
            <EmptyState query={search?.query || ''} onReset={clearSearch} />
          ) : view === 'board' ? (
            <DepartureBoard heading={tab === 'arrival' ? 'ARRIVALS' : 'DEPARTURES'} flights={visibleFlights} />
          ) : (
            visibleFlights.map((flight, i) => (
              <FlightCard key={flight.id} flight={flight} featured={flight.id === 'ba117' && i === 0} />
            ))
          )}
        </Stack>
        <Stack component="aside" spacing={2}>
          {cityInfo && <CityWeatherCard cities={cityInfo} selected={selectedCity} onSelect={setSelectedCity} />}
          <AirportSnapshot />
          <AlertEscalation countdown={countdown} />
        </Stack>
      </Box>
    </Box>
  )
}
