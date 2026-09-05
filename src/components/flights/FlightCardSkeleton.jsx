import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

export function SkeletonFlightCard() {
  return (
    <Card sx={{ p: 3 }} aria-label="Loading flight data">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Skeleton variant="rounded" width={48} height={48} sx={{ borderRadius: 3 }} />
          <Box>
            <Skeleton width={140} height={20} />
            <Skeleton width={80} height={16} sx={{ mt: 1 }} />
          </Box>
        </Box>
        <Skeleton variant="rounded" width={80} height={28} sx={{ borderRadius: 999 }} />
      </Box>
      <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 2.5 }}>
        <Skeleton variant="rounded" height={48} />
        <Skeleton width={40} height={8} />
        <Skeleton variant="rounded" height={48} />
      </Box>
      <Skeleton variant="rounded" height={96} sx={{ mt: 3.5, borderRadius: 4 }} />
    </Card>
  )
}
