# FlightPath — Departures, Arrivals & Connections

A responsive React + Tailwind CSS travel-assistant prototype for flight status, connections, airport services, weather/local time, transport, directions, and gate-closing alerts.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Key components

- `FlightSearch`
- `FlightTabs`
- `FlightCard`
- `FlightStatusBadge`
- `JourneyTimeline`
- `ConnectionCard`
- `GateAlert`
- `AirportInfo`
- `CityWeatherCard`
- `TransportCard`
- `DirectionsPanel`

## Demo behaviour

- Gate alert opens automatically and counts down from 14:32.
- Mobile gets a sticky gate/status/countdown action bar.
- Search filters mock flight data; try `BA117`, `London`, `JFK`, or `British Airways`.
- Search `error` to preview the API error state.
- Unmatched searches show the empty state.
- Search interaction includes a skeleton loading state.
- Departures, arrivals, and connecting tabs use distinct datasets/layouts.

## API integration structure

Mock data is isolated in `src/data/mockData.js`, allowing replacement with live flight-status, weather, airport, and transport services without changing the presentation components.
# Flight-Travel-Assistant
