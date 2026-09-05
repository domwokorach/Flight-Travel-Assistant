import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import FlightIcon from '@mui/icons-material/Flight'

export default function MobileNavigation({ items }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
        sx={{ display: { xs: 'inline-flex', md: 'none' }, color: 'rgba(255,255,255,0.85)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { bgcolor: '#0F172A', color: '#fff', width: 280, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } }}
      >
        <Box sx={{ p: 2.5 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ width: 32, height: 32, borderRadius: 3, bgcolor: '#38BDF8', display: 'grid', placeItems: 'center' }}>
                <FlightIcon sx={{ fontSize: 16, transform: 'rotate(-12deg)' }} />
              </Box>
              <Typography sx={{ fontWeight: 800 }}>FlightPath</Typography>
            </Stack>
            <IconButton aria-label="Close navigation" onClick={() => setOpen(false)} sx={{ color: 'rgba(255,255,255,0.8)' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
        <List component="nav" aria-label="Mobile navigation" sx={{ px: 1 }}>
          {items.map(([label, href]) => (
            <ListItemButton
              key={href}
              component="a"
              href={href}
              onClick={() => setOpen(false)}
              sx={{ borderRadius: 3, mx: 1, minHeight: 44, '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              <ListItemText primaryTypographyProps={{ sx: { fontWeight: 700, fontSize: 14 } }}>{label}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  )
}
