import React, { useEffect, useMemo, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import SearchIcon from '@mui/icons-material/Search'
import FlightIcon from '@mui/icons-material/Flight'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import TrainIcon from '@mui/icons-material/Train'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import MapIcon from '@mui/icons-material/Map'
import { useSnackbar } from '../../lib/snackbar'

const sections = [
  { label: 'Flights', href: '#flights', icon: FlightIcon },
  { label: 'At the Airport', href: '#airport', icon: VerifiedUserIcon },
  { label: 'Transport & Directions', href: '#transport', icon: TrainIcon },
]

const recentSearches = ['BA117', 'London', 'JFK']

/**
 * Rebuilt on MUI (Dialog + a filtered List) in place of the previous cmdk-based
 * command palette. Keeps the same entry points — sections, recent searches,
 * quick actions — with simple substring filtering instead of cmdk's fuzzy match.
 */
export default function CommandMenu({ open, onOpenChange, onOpenGateAlert }) {
  const [query, setQuery] = useState('')
  const { notify } = useSnackbar()

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(v => !v)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onOpenChange])

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const go = (href) => {
    onOpenChange(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const q = query.trim().toLowerCase()
  const filteredSections = useMemo(() => sections.filter(s => s.label.toLowerCase().includes(q)), [q])
  const filteredRecent = useMemo(() => recentSearches.filter(s => s.toLowerCase().includes(q)), [q])
  const showActions = 'gate alert'.includes(q) || 'view airport services'.includes(q) || !q
  const noResults = !filteredSections.length && !filteredRecent.length && !showActions

  return (
    <Dialog
      open={open}
      onClose={() => onOpenChange(false)}
      maxWidth="sm"
      fullWidth
      aria-label="Quick search"
      PaperProps={{ sx: { borderRadius: 5, overflow: 'hidden' } }}
    >
      <Box sx={{ p: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <TextField
          autoFocus
          fullWidth
          placeholder="Search flights, sections, actions…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box sx={{ maxHeight: 420, overflowY: 'auto', py: 1 }}>
        {noResults && (
          <Typography sx={{ px: 3, py: 4, textAlign: 'center', fontSize: 14, color: 'text.secondary' }}>
            No results found.
          </Typography>
        )}
        {filteredSections.length > 0 && (
          <List subheader={<ListSubheader sx={{ fontSize: 11, fontWeight: 700 }}>Sections</ListSubheader>}>
            {filteredSections.map(({ label, href, icon: Icon }) => (
              <ListItemButton key={href} onClick={() => go(href)} sx={{ minHeight: 44 }}>
                <ListItemIcon sx={{ minWidth: 36 }}><Icon fontSize="small" /></ListItemIcon>
                <ListItemText>{label}</ListItemText>
              </ListItemButton>
            ))}
          </List>
        )}
        {filteredRecent.length > 0 && (
          <>
            <Divider sx={{ my: 0.5 }} />
            <List subheader={<ListSubheader sx={{ fontSize: 11, fontWeight: 700 }}>Recent searches</ListSubheader>}>
              {filteredRecent.map(term => (
                <ListItemButton
                  key={term}
                  onClick={() => {
                    go('#flights')
                    notify(`Try "${term}" in Find your flight`)
                  }}
                  sx={{ minHeight: 44 }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}><SearchIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>{term}</ListItemText>
                </ListItemButton>
              ))}
            </List>
          </>
        )}
        {showActions && (
          <>
            <Divider sx={{ my: 0.5 }} />
            <List subheader={<ListSubheader sx={{ fontSize: 11, fontWeight: 700 }}>Quick actions</ListSubheader>}>
              <ListItemButton
                onClick={() => {
                  onOpenChange(false)
                  onOpenGateAlert?.()
                }}
                sx={{ minHeight: 44 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}><NotificationsActiveIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Open gate alert</ListItemText>
                <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'text.secondary' }}>BA117</Typography>
              </ListItemButton>
              <ListItemButton onClick={() => go('#airport')} sx={{ minHeight: 44 }}>
                <ListItemIcon sx={{ minWidth: 36 }}><MapIcon fontSize="small" /></ListItemIcon>
                <ListItemText>View airport services</ListItemText>
              </ListItemButton>
            </List>
          </>
        )}
      </Box>
    </Dialog>
  )
}
