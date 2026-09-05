import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Info, RefreshCw, TriangleAlert } from 'lucide-react'
import FlightSearch from '../components/flights/FlightSearch'
import FlightTabs from '../components/flights/FlightTabs'
import FlightCard from '../components/flights/FlightCard'
import ConnectionCard from '../components/flights/ConnectionCard'
import CityWeatherCard from '../components/location/CityWeatherCard'
import AirportSnapshot from '../components/airport/AirportSnapshot'
import AlertEscalation from '../components/alerts/AlertEscalation'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
import { SkeletonFlightCard } from '../components/flights/FlightCardSkeleton'
import { SectionHeading } from '../components/common/SectionHeading'
import { useFlightSearch } from '../hooks/useFlightSearch'
import { getFlights, getConnectionJourney } from '../services/flightService'
import { getCityInfo } from '../services/weatherService'
import { staggerContainer } from '@/lib/motion'

function EmptyState({ query, onReset }) {
  return (
    <Card className="p-8 text-center sm:p-12">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-muted"><Info className="h-5 w-5 text-muted-foreground"/></div>
      <h3 className="mt-4 text-lg font-black text-foreground">No matching flights</h3>
      <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-muted-foreground">We couldn't find a demo flight matching “{query}”. Try BA117, London, JFK, British Airways, or clear the search.</p>
      <Button variant="outline" onClick={onReset} className="mt-5">Clear search</Button>
    </Card>
  )
}

function ErrorState({ onRetry }) {
  return (
    <Alert variant="destructive" className="p-5">
      <TriangleAlert className="h-5 w-5" />
      <AlertTitle className="text-base">Flight data couldn't be refreshed</AlertTitle>
      <AlertDescription>
        The interface is ready for API error handling. Retry to restore the mock feed.
        <div className="mt-3"><Button variant="destructive" onClick={onRetry}><RefreshCw className="h-4 w-4" />Retry</Button></div>
      </AlertDescription>
    </Alert>
  )
}

export default function FlightsPage({ countdown }) {
  const [allFlights, setAllFlights] = useState([])
  const [connectionJourney, setConnectionJourney] = useState(null)
  const [cityInfo, setCityInfo] = useState(null)
  const [selectedCity, setSelectedCity] = useState('destination')

  useEffect(() => {
    getFlights().then(setAllFlights)
    getConnectionJourney().then(setConnectionJourney)
    getCityInfo().then(setCityInfo)
  }, [])

  const { tab, changeTab, search, loading, error, setError, visibleFlights, doSearch, clearSearch } = useFlightSearch(allFlights)

  return (
    <section id="flights" className="scroll-mt-24 pt-7">
      <FlightSearch onSearch={doSearch} onClear={clearSearch} loading={loading} />

      <div className="mb-5 mt-7 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <SectionHeading eyebrow="Flights" title="Your travel day at a glance" />
        <FlightTabs value={tab} onChange={changeTab} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,.8fr)]">
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" className="space-y-4" exit={{ opacity: 0 }}>
                <SkeletonFlightCard /><SkeletonFlightCard />
              </motion.div>
            ) : error ? (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ErrorState onRetry={() => setError(false)} />
              </motion.div>
            ) : tab === 'connection' ? (
              connectionJourney && <motion.div key="connection">{<ConnectionCard journey={connectionJourney} />}</motion.div>
            ) : visibleFlights.length ? (
              <motion.div key={tab + (search?.query || '')} variants={staggerContainer(0.08)} initial="hidden" animate="show" className="space-y-4">
                {visibleFlights.map((flight, i) => <FlightCard key={flight.id} flight={flight} featured={flight.id === 'ba117' && i === 0} />)}
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <EmptyState query={search?.query || ''} onReset={clearSearch} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <aside className="space-y-4">
          {cityInfo && <CityWeatherCard cities={cityInfo} selected={selectedCity} onSelect={setSelectedCity} />}
          <AirportSnapshot />
          <AlertEscalation countdown={countdown} />
        </aside>
      </div>
    </section>
  )
}
