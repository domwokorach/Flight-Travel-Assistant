import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export function SectionHeading({ eyebrow, title, action }) {
  return (
    <Stack direction="row" alignItems="flex-end" justifyContent="space-between" spacing={2} flexWrap="wrap" sx={{ mb: 2.5, rowGap: 1.5 }}>
      <Box>
        {eyebrow ? (
          <Typography
            component="p"
            variant="overline"
            sx={{ color: 'text.secondary', fontSize: 11, lineHeight: 1.4 }}
          >
            {eyebrow}
          </Typography>
        ) : null}
        <Typography variant="h5" component="h2" sx={{ mt: 0.5 }}>
          {title}
        </Typography>
      </Box>
      {action}
    </Stack>
  )
}
