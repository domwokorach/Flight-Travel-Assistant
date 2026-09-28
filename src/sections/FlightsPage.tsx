import React, { useMemo } from "react";
import Hero from "../components/home/Hero";
import HeathrowFlightsSection from "../components/flights/heathrow/HeathrowFlightsSection";
import CityWeatherCard from "../components/location/CityWeatherCard";
import AirportSnapshot from "../components/airport/AirportSnapshot";
import AlertEscalation from "../components/alerts/AlertEscalation";
import { useDepartures } from "../hooks/useFlights";
import { useWeather } from "../hooks/useWeather";
import { useLiveGateCountdown } from "../hooks/useLiveGateCountdown";
import { findAirport } from "../data/airportDirectory";

const AIRPORT = "LHR";

type FlightsPageProps = {
  countdown: ReturnType<typeof useLiveGateCountdown>;
};

type SelectedCity = "destination" | "connection" | "departure";

export default function FlightsPage({ countdown }: FlightsPageProps) {
  const [selectedCity, setSelectedCity] =
    React.useState<SelectedCity>("destination");

  const departures = useDepartures(AIRPORT);
  const weather = useWeather(["LHR", "AMS", "JFK"]);

  const originTimezone = findAirport(AIRPORT)?.timezone;
  const boardingFlight = useMemo(
    () =>
      departures.flights.find(
        (f) => f.status === "boarding" || f.status === "gate_open",
      ) ?? null,
    [departures.flights],
  );
  const hasDisruption = useMemo(
    () =>
      departures.flights.some(
        (f) => f.status === "cancelled" || f.status === "delayed",
      ),
    [departures.flights],
  );

  const originWeather = weather.cities.find((c) => c.iata === AIRPORT);

  return (
    <>
      <Hero weather={originWeather} isLive={departures.isLive} />
      <section id="flights" className="scroll-mt-24 pt-3.5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
          <HeathrowFlightsSection />
          <div className="flex flex-col gap-4">
            {weather.cities.length > 0 && (
              <CityWeatherCard
                cities={weather.cities}
                selected={
                  selectedCity === "destination"
                    ? "JFK"
                    : selectedCity === "connection"
                      ? "AMS"
                      : "LHR"
                }
                onSelect={(iata: string) =>
                  setSelectedCity(
                    iata === "JFK"
                      ? "destination"
                      : iata === "AMS"
                        ? "connection"
                        : "departure",
                  )
                }
                baseTimezone={originTimezone}
                connectionState={weather.connectionState}
                lastUpdated={weather.lastUpdated}
              />
            )}
            <AirportSnapshot
              airport={AIRPORT}
              boardingFlight={boardingFlight}
              hasDisruption={hasDisruption}
            />
            <AlertEscalation countdown={countdown} />
          </div>
        </div>
      </section>
    </>
  );
}
