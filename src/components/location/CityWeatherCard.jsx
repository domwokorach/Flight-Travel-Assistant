import React from 'react'
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, CloudFog, Wind, Umbrella } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LocalTimeCard from './LocalTimeCard'
import { LiveIndicator } from '@/components/common/LiveIndicator'
import { describeOffsetDifference } from '@/lib/timezone'

const ICONS = {
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
  storm: CloudLightning,
  snow: Snowflake,
  fog: CloudFog,
  wind: Wind,
}

function WeatherIcon({ type }) {
  const Icon = ICONS[type] ?? Cloud
  return <Icon className="size-7 text-primary" />
}

export default function CityWeatherCard({ cities, selected, onSelect, baseTimezone, connectionState, lastUpdated }) {
  const city = cities.find((c) => c.iata === selected) ?? cities[0]
  if (!city) return null

  const offsetLabel = baseTimezone ? describeOffsetDifference(baseTimezone, city.timezone) : city.timezone

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold text-muted-foreground">City, weather & local time</p>
          <h3 className="mt-0.5 font-heading text-lg font-bold">{city.city}</h3>
          <p className="text-[13px] font-semibold text-muted-foreground">
            {city.country} · {city.iata}
          </p>
        </div>
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent">
          <WeatherIcon type={city.icon} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 *:min-w-0">
        <LocalTimeCard timezone={city.timezone} offsetLabel={offsetLabel} />
        <div className="rounded-2xl border border-primary/20 bg-primary/12 p-4">
          <div className="flex items-center gap-1.5 text-primary-light">
            <Cloud className="size-4" />
            <p className="text-[11px] font-bold uppercase">Weather</p>
          </div>
          <p className="mt-1 text-2xl font-extrabold text-foreground">{city.temp}°C</p>
          <p className="mt-0.5 text-xs font-semibold text-muted-foreground">{city.condition}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-border px-4 py-3">
        <p className="text-[13px] font-semibold text-muted-foreground">
          High {city.high}° · Low {city.low}°
        </p>
        <div className="flex items-center gap-1 text-[13px] font-bold">
          <Umbrella className="size-4 text-primary" />
          <span>{city.rainChance}% rain</span>
        </div>
      </div>

      {connectionState && (
        <div className="mt-3">
          <LiveIndicator state={connectionState} lastUpdated={lastUpdated} />
        </div>
      )}

      <Tabs value={city.iata} onValueChange={onSelect} className="mt-4">
        <TabsList className="w-full">
          {cities.map((item) => (
            <TabsTrigger key={item.iata} value={item.iata} className="flex-1">
              {item.iata}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </Card>
  )
}
