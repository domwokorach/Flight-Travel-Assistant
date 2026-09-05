import React from 'react'
import { Sun, Cloud, CloudSun, Umbrella } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LocalTimeCard from './LocalTimeCard'

function WeatherIcon({ type }) {
  if (type === 'sun') return <Sun className="size-7 text-[#D9A441]" />
  return <CloudSun className="size-7 text-primary" />
}

export default function CityWeatherCard({ cities, selected, onSelect }) {
  const city = cities[selected]
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold text-muted-foreground">City, weather & local time</p>
          <h3 className="mt-0.5 font-heading text-lg font-bold">{city.city}</h3>
          <p className="text-[13px] font-semibold text-muted-foreground">
            {city.country} · {city.code}
          </p>
        </div>
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent">
          <WeatherIcon type={city.icon} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 *:min-w-0">
        <LocalTimeCard offsetHours={city.offsetHours} offsetLabel={city.offset} />
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
          <span>{city.rain}% rain</span>
        </div>
      </div>

      <Tabs value={selected} onValueChange={onSelect} className="mt-4">
        <TabsList className="w-full">
          {Object.values(cities).map((item) => (
            <TabsTrigger key={item.key} value={item.key} className="flex-1">
              {item.role}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </Card>
  )
}
