import React from 'react'
import { Car, Footprints, TrainFront } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GoogleTravelMode } from '@/types/directions'

const MODES: { mode: GoogleTravelMode; label: string; icon: typeof Car }[] = [
  { mode: 'DRIVE', label: 'Driving', icon: Car },
  { mode: 'TRANSIT', label: 'Transit', icon: TrainFront },
  { mode: 'WALK', label: 'Walking', icon: Footprints },
]

interface TransportModeToggleProps {
  mode: GoogleTravelMode
  onChange: (mode: GoogleTravelMode) => void
  /** Only these modes are shown — the caller filters out ones that don't make sense (e.g. walking beyond a few km). */
  availableModes?: GoogleTravelMode[]
  disabled?: boolean
}

export default function TransportModeToggle({ mode, onChange, availableModes = ['DRIVE', 'TRANSIT', 'WALK'], disabled }: TransportModeToggleProps) {
  return (
    <div role="radiogroup" aria-label="Transport mode" className="inline-flex gap-1 rounded-xl border border-border-muted bg-card/60 p-1">
      {MODES.filter((m) => availableModes.includes(m.mode)).map(({ mode: m, label, icon: Icon }) => (
        <button
          key={m}
          type="button"
          role="radio"
          aria-checked={mode === m}
          disabled={disabled}
          onClick={() => onChange(m)}
          className={cn(
            'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50',
            mode === m ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:bg-accent hover:text-foreground'
          )}
        >
          <Icon className="size-3.5" />
          {label}
        </button>
      ))}
    </div>
  )
}
