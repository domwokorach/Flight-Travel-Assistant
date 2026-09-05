import React from 'react'
import { Navigation, Map } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DirectionsPanel() {
  return (
    <Card className="overflow-hidden bg-[#0B1220] p-0 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px]">
        <div className="p-6 sm:p-8">
          <p className="text-xs font-bold tracking-[0.1em] text-[#7DD3FC] uppercase">Door to gate</p>
          <h3 className="mt-2 font-heading text-2xl font-bold text-white">Keep the journey moving</h3>
          <p className="mt-2 max-w-[480px] text-sm leading-relaxed font-medium text-[#CBD5E1]">
            Open step-by-step airport directions, check terminal transfers, or continue from JFK with the fastest available transport option.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="bg-[#0EA5E9] hover:bg-[#38BDF8]">
              <Navigation className="size-4" />
              Get directions
            </Button>
            <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:border-white/30 hover:bg-white/10">
              <Map className="size-4" />
              View airport map
            </Button>
          </div>
        </div>
        <div className="relative min-h-44 border-t border-white/10 bg-[radial-gradient(circle_at_20%_30%,rgba(14,165,233,.28),transparent_32%),radial-gradient(circle_at_75%_70%,rgba(59,130,246,.22),transparent_35%)] lg:border-t-0 lg:border-l">
          <div className="absolute inset-6 rounded-3xl border border-white/10">
            <div className="absolute top-[62%] left-[18%] size-3 rounded-full bg-white shadow-[0_0_0_8px_rgba(56,189,248,0.2)]" />
            <div className="absolute top-[28%] right-[18%] size-3 rounded-full bg-[#38BDF8] shadow-[0_0_0_8px_rgba(56,189,248,0.2)]" />
          </div>
        </div>
      </div>
    </Card>
  )
}
