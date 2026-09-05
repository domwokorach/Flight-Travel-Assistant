import React, { useMemo } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Info, RotateCcw, LayoutGrid, List } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { LiveIndicator } from '../components/common/LiveIndicator'
import { DataFreshnessBanner } from '../components/common/DataFreshness'
import { useFlightSearch } from '../hooks/useFlightSearch'
import { useDepartures, useArrivals, useConnectionJourney } from '../hooks/useFlights'
import { useWeather } from '../hooks/useWeather'
import { toLegacyFlight } from '../lib/adapters/legacyFlight'
import { findAirport } from '../data/airportDirectory'

const AIRPORT = 'LHR'

function EmptyState({ query, onReset }) {
  return (
    <Card className="p-8 text-center sm:p-12">
      <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-accent">
        <Info className="size-5 text-muted-foreground" />
      </div>
      <h3 className="mt-4 font-heading text-lg font-bold">No matching flights</h3>
      <p className="mx-auto mt-2 max-w-[420px] text-sm leading-relaxed font-medium text-muted-foreground">
        We couldn't find a flight matching "{query}". Try a flight number, city, or airline, or clear the search.
      </p>
      <Button variant="outline" onClick={onReset} className="mt-4">
        Clear search
      </Button>
    </Card>
  )
}

function ErrorState({ onRetry }) {
  return (
    <Alert variant="error">
      <Info className="size-5" />
      <AlertTitle>Flight information unavailable</AlertTitle>
      <AlertDescription>The provider didn't respond in time. Retry to reconnect.</AlertDescription>
      <div className="col-start-2 mt-2">
        <Button size="sm" className="bg-error hover:brightness-90" onClick={onRetry}>
          <RotateCcw className="size-4" />
          Try Again
        </Button>
      </div>
    </Alert>
  )
}

export default function FlightsPage({ countdown }) {
  const [view, setView] = React.useState('cards')
  const [selectedCity, setSelectedCity] = React.useState('destination')

  const departures = useDepartures(AIRPORT)
  const arrivals = useArrivals(AIRPORT)
  const connection = useConnectionJourney('KL1002', 'KL641')
  const weather = useWeather(['LHR', 'AMS', 'JFK'])

  const { tab, changeTab, search, error, setError, visibleFlights, doSearch, clearSearch } = useFlightSearch(
    useMemo(() => [...departures.flights, ...arrivals.flights], [departures.flights, arrivals.flights])
  )
  const visibleLegacy = useMemo(() => visibleFlights.map(toLegacyFlight), [visibleFlights])

  const boardConnectionState = tab === 'arrival' ? arrivals.connectionState : departures.connectionState
  const boardLastUpdated = tab === 'arrival' ? arrivals.lastUpdated : departures.lastUpdated
  const loading =
    tab === 'arrival' ? arrivals.lastUpdated === null && !arrivals.error : departures.lastUpdated === null && !departures.error

  const originTimezone = findAirport(AIRPORT)?.timezone
  const boardingFlight = useMemo(
    () => departures.flights.find((f) => f.status === 'boarding' || f.status === 'gate_open') ?? null,
    [departures.flights]
  )
  const hasDisruption = useMemo(
    () => departures.flights.some((f) => f.status === 'cancelled' || f.status === 'delayed'),
    [departures.flights]
  )

  return (
    <section id="flights" className="scroll-mt-24 pt-3.5">
      <FlightSearch onSearch={doSearch} onClear={clearSearch} loading={false} isLive={departures.isLive} />

      <div className="mt-7 mb-4 flex flex-row flex-wrap items-end justify-between gap-2">
        <div>
          <SectionHeading eyebrow="Flights" title="Your travel day at a glance" />
          <div className="mt-1.5">
            <LiveIndicator state={boardConnectionState} lastUpdated={boardLastUpdated} />
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-2">
          <FlightTabs value={tab} onChange={changeTab} />
          {tab !== 'connection' && (
            <Tabs value={view} onValueChange={setView}>
              <TabsList aria-label="Flight display">
                <TabsTrigger value="cards">
                  <LayoutGrid />
                  Cards
                </TabsTrigger>
                <TabsTrigger value="board">
                  <List />
                  Board
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${tab}-${view}-${loading}-${error}`}
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <DataFreshnessBanner connectionState={boardConnectionState} lastUpdated={boardLastUpdated} />
            {loading ? (
              <>
                <SkeletonFlightCard />
                <SkeletonFlightCard />
              </>
            ) : error ? (
              <ErrorState onRetry={() => setError(false)} />
            ) : tab === 'connection' ? (
              connection.journey && <ConnectionCard journey={connection.journey} />
            ) : !visibleLegacy.length ? (
              <EmptyState query={search?.query || ''} onReset={clearSearch} />
            ) : view === 'board' ? (
              <DepartureBoard heading={tab === 'arrival' ? 'ARRIVALS' : 'DEPARTURES'} flights={visibleLegacy} />
            ) : (
              visibleLegacy.map((flight, i) => (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04, ease: 'easeOut' }}
                >
                  <FlightCard flight={flight} featured={flight.status === 'boarding' && i === 0} />
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-col gap-4">
          {weather.cities.length > 0 && (
            <CityWeatherCard
              cities={weather.cities}
              selected={selectedCity === 'destination' ? 'JFK' : selectedCity === 'connection' ? 'AMS' : 'LHR'}
              onSelect={(iata) => setSelectedCity(iata === 'JFK' ? 'destination' : iata === 'AMS' ? 'connection' : 'departure')}
              baseTimezone={originTimezone}
              connectionState={weather.connectionState}
              lastUpdated={weather.lastUpdated}
            />
          )}
          <AirportSnapshot airport={AIRPORT} boardingFlight={boardingFlight} hasDisruption={hasDisruption} />
          <AlertEscalation countdown={countdown} />
        </div>
      </div>
    </section>
  )
}
