import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FlightIcon from '@mui/icons-material/Flight'
import SearchIcon from '@mui/icons-material/Search'
import MobileNavigation from './MobileNavigation'

const nav = [
  ['Flights', '#flights'],
  ['At the Airport', '#airport'],
  ['Transport & Directions', '#transport'],
]

export default function Header({ onOpenCommandMenu }) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: 'rgba(15,23,42,0.97)', color: '#fff', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
    >
      <Toolbar sx={{ maxWidth: 1280, width: '100%', mx: 'auto', px: { xs: 2, sm: 3 } }}>
        <Box
          component="a"
          href="#top"
          aria-label="FlightPath home"
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', color: 'inherit', flexGrow: 1 }}
        >
          <Box sx={{ width: 40, height: 40, borderRadius: 4, bgcolor: '#38BDF8', display: 'grid', placeItems: 'center', boxShadow: '0 8px 20px rgba(56,189,248,0.25)' }}>
            <FlightIcon sx={{ fontSize: 20, transform: 'rotate(-12deg)' }} />
          </Box>
          <Box>
            <Typography sx={{ fontFamily: "'Manrope Variable', sans-serif", fontSize: 14, fontWeight: 800, letterSpacing: '-0.01em' }}>
              FlightPath
            </Typography>
            <Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.55)' }}>
              Travel assistant
            </Typography>
          </Box>
        </Box>

        <Stack component="nav" aria-label="Primary navigation" direction="row" spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {nav.map(([label, href]) => (
            <Button
              key={href}
              href={href}
              sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', color: '#fff' } }}
            >
              {label}
            </Button>
          ))}
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ ml: 1 }}>
          <Tooltip title="Search flights, sections & actions">
            <Button
              onClick={onOpenCommandMenu}
              startIcon={<SearchIcon sx={{ fontSize: 18 }} />}
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, color: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', color: '#fff' } }}
            >
              Quick search
              <Box
                component="kbd"
                sx={{ ml: 1, borderRadius: 1.5, border: '1px solid rgba(255,255,255,0.15)', bgcolor: 'rgba(255,255,255,0.1)', px: 0.75, py: 0.25, fontSize: 10, fontWeight: 700 }}
              >
                ⌘K
              </Box>
            </Button>
          </Tooltip>
          <IconButton
            aria-label="Quick search"
            onClick={onOpenCommandMenu}
            sx={{ display: { xs: 'inline-flex', sm: 'none' }, color: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            <SearchIcon fontSize="small" />
          </IconButton>
          <MobileNavigation items={nav} />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
