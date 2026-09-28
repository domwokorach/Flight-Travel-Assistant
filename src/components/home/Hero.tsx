'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Pause, Play, Sun, Cloud, CloudRain, CloudLightning, CloudSnow, CloudFog, Wind } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { WeatherSnapshot } from '@/types/weather'
import type { LucideIcon } from 'lucide-react'

const WEATHER_ICONS: Record<WeatherSnapshot['icon'], LucideIcon> = {
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
  storm: CloudLightning,
  snow: CloudSnow,
  fog: CloudFog,
  wind: Wind,
}

const SLIDES = [
  {
    eyebrow: 'Live flight tracking',
    heading: 'Gate to gate, all in one place',
    body: 'Departures, arrivals, connections and gate alerts for your flight — updated in real time.',
    image:
      'https://res.cloudinary.com/dkkuwmr42/image/upload/v1790633368/Flight%20-%20Images/ChatGPT_Image_Sep_28_2026_11_07_40_PM_quknx9.png',
  },
  {
    eyebrow: 'Never miss a gate change',
    heading: 'Know exactly when to leave',
    body: 'Live gate countdowns and push alerts, so a closing gate or a delay never catches you out.',
    image:
      'https://res.cloudinary.com/dkkuwmr42/image/upload/v1790633380/Flight%20-%20Images/ChatGPT_Image_Sep_28_2026_11_09_30_PM_lygjcv.png',
  },
  {
    eyebrow: 'Door to gate',
    heading: 'One journey, start to finish',
    body: 'Traffic-aware directions to the airport, plus your flight and connection details in one timeline.',
    image:
      'https://res.cloudinary.com/dkkuwmr42/image/upload/v1790633368/Flight%20-%20Images/ChatGPT_Image_Sep_28_2026_11_05_57_PM_matkje.png',
  },
]

interface HeroProps {
  weather?: WeatherSnapshot
  isLive?: boolean
}

/**
 * Homepage hero — rotating slides + a CTA that scrolls to the real flight search below, and a
 * live-data strip (this airport's local time + weather, from the same useWeather data the rest
 * of the app uses) standing in for a decorative stats bar. No fabricated imagery or copy.
 */
export default function Hero({ weather, isLive }: HeroProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000)
    return () => clearInterval(timer)
  }, [paused])

  const slide = SLIDES[index]
  const WeatherIcon = weather ? (WEATHER_ICONS[weather.icon] ?? Cloud) : null

  const scrollToSearch = () => {
    document.getElementById('flights')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-board-bg text-board-text">
      <div className="relative isolate px-4 pt-14 pb-24 sm:px-6 sm:pt-20 sm:pb-28">
        <div aria-hidden className="absolute inset-0 -z-20">
          {SLIDES.map((s, i) => (
            <Image
              key={s.image}
              src={s.image}
              alt=""
              fill
              priority={i === 0}
              className={`object-cover transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-board-bg/70" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.08),transparent_38%),radial-gradient(circle_at_85%_75%,rgba(255,255,255,0.06),transparent_42%)]"
        />
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold tracking-[0.16em] text-white/60 uppercase">{slide.eyebrow}</p>
          <h1 className="mt-3 max-w-xl font-heading text-4xl font-extrabold sm:text-5xl">{slide.heading}</h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed font-medium text-white/70 sm:text-base">{slide.body}</p>
          <Button variant="secondary" onClick={scrollToSearch} className="mt-7 bg-white text-board-bg hover:bg-white/90">
            Find your flight
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl items-center gap-3">
          {SLIDES.map((s, i) => (
            <button
              key={s.heading}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`size-2 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/30 hover:bg-white/50'}`}
            />
          ))}
          <button
            type="button"
            aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}
            onClick={() => setPaused((p) => !p)}
            className="ml-2 grid size-7 place-items-center rounded-full border border-white/20 text-white/70 hover:text-white"
          >
            {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
          </button>
        </div>
      </div>

      <div className="relative -mt-10 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Badge className="bg-white/10 text-white">{isLive ? 'Live flight data' : 'Demo data · add an API key for live flights'}</Badge>
          {weather && (
            <div className="flex items-center gap-2 text-sm font-bold text-white/85">
              <span>{weather.city}</span>
              <span className="text-white/40">·</span>
              <span className="font-mono">{weather.localTime}</span>
              {WeatherIcon && (
                <>
                  <span className="text-white/40">·</span>
                  <WeatherIcon className="size-4" />
                  <span>{Math.round(weather.temp)}°C</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
