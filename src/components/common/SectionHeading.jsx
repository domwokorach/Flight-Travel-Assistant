import React from 'react'

export function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">{title}</h2>
      </div>
      {action}
    </div>
  )
}
