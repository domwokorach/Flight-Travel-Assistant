import React from 'react'

export function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="mb-2.5 flex flex-row flex-wrap items-end justify-between gap-x-4 gap-y-1.5">
      <div>
        {eyebrow ? (
          <p className="text-[11px] font-bold leading-snug tracking-[0.14em] text-muted-foreground uppercase">{eyebrow}</p>
        ) : null}
        <h2 className="mt-0.5 font-heading text-xl font-bold sm:text-2xl">{title}</h2>
      </div>
      {action}
    </div>
  )
}
