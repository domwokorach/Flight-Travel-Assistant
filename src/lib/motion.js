export const fadeInUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

export const staggerContainer = (stagger = 0.06, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

export const springy = { type: 'spring', stiffness: 340, damping: 28, mass: 0.9 }
export const smooth = { duration: 0.28, ease: [0.22, 1, 0.36, 1] }

/** Visual urgency tiers, keyed to the same thresholds as useGateCountdown. */
export const urgencyMotion = {
  slate: { scale: 1, transition: smooth },
  sky: { scale: 1, transition: smooth },
  orange: { scale: [1, 1.015, 1], transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } },
  rose: { scale: [1, 1.035, 1], transition: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' } },
}
