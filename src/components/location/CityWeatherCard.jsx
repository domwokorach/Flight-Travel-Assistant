import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CloudSun, Sun, CloudRain, Cloud, Umbrella } from 'lucide-react'
import { Card } from '../ui/card'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import LocalTimeCard from './LocalTimeCard'
import { fadeIn } from '@/lib/motion'

function WeatherIcon({ type }) {
  if (type === 'sun') return <Sun className="h-7 w-7 text-amber-500" />
  if (type === 'rain') return <CloudRain className="h-7 w-7 text-sky-600" />
  return <CloudSun className="h-7 w-7 text-sky-500" />
}

export default function CityWeatherCard({ cities, selected, onSelect }) {
  const city = cities[selected]
  return (
    <Card className="p-5 sm:p-6">
      <AnimatePresence mode="wait">
        <motion.div key={selected} variants={fadeIn} initial="hidden" animate="show" exit="hidden" transition={{ duration: 0.18 }}>
          <div className="flex items-start justify-between gap-4">
            <div><p className="eyebrow">City, weather & local time</p><h3 className="mt-1 text-xl font-black text-foreground">{city.city}</h3><p className="text-sm font-semibold text-muted-foreground">{city.country} · {city.code}</p></div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-muted"><WeatherIcon type={city.icon}/></div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <LocalTimeCard offsetHours={city.offsetHours} offsetLabel={city.offset} />
            <div className="rounded-2xl bg-accent p-4">
              <div className="flex items-center gap-2 text-accent-foreground"><Cloud className="h-4 w-4"/><span className="text-xs font-bold uppercase tracking-wide">Weather</span></div>
              <div className="mt-2 text-3xl font-black tracking-tight text-foreground">{city.temp}°C</div>
              <div className="mt-1 text-xs font-semibold text-muted-foreground">{city.condition}</div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-border px-4 py-3 text-sm">
            <span className="font-semibold text-muted-foreground">High {city.high}° · Low {city.low}°</span>
            <span className="flex items-center gap-1.5 font-bold text-foreground/80"><Umbrella className="h-4 w-4 text-sky-500"/>{city.rain}% rain</span>
          </div>
        </motion.div>
      </AnimatePresence>
      <Tabs value={selected} onValueChange={onSelect} className="mt-4">
        <TabsList className="w-full gap-1 bg-muted p-1">
          {Object.values(cities).map(item => (
            <TabsTrigger key={item.key} value={item.key} className="flex-1 text-xs font-bold data-active:shadow-sm">
              {item.role}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </Card>
  )
}
