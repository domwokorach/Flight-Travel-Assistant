import React, { useState } from 'react'
import { format, parseISO } from 'date-fns'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'
import SearchIcon from '@mui/icons-material/Search'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import ScheduleIcon from '@mui/icons-material/Schedule'
import AirlineLogo from './AirlineLogo'
import { getAirline } from '../../data/airlines'

const recent = ['BA117', 'VS103', 'London', 'JFK']

function airlineCodeFor(term) {
  const code = term.match(/^([A-Z]{2})\d+$/)?.[1]
  return code && getAirline(code) ? code : null
}

export default function FlightSearch({ onSearch, onClear, loading = false }) {
  const [date, setDate] = useState('2026-09-04')
  const [searchBy, setSearchBy] = useState('Flight number')
  const [query, setQuery] = useState('BA117')
  const [filter, setFilter] = useState('All')

  const submit = (e) => {
    e.preventDefault()
    onSearch({ query, searchBy, date: format(parseISO(date), 'yyyy-MM-dd'), filter })
  }
  const clear = () => { setQuery(''); setFilter('All'); onClear() }

  return (
    <Card sx={{ position: 'relative', overflow: 'hidden', p: { xs: 2.5, sm: 3 } }}>
      <Box sx={{ position: 'absolute', inset: '0 0 auto 0', height: 4, background: 'linear-gradient(90deg, #0B5FA5, #38BDF8, #0B5FA5)' }} />
      <Box component="form" onSubmit={submit}>
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={1.5} sx={{ mb: 2.5 }}>
          <Box>
            <Typography variant="overline" sx={{ fontSize: 11, color: 'text.secondary' }}>Find your flight</Typography>
            <Typography variant="h4" component="h1" sx={{ mt: 0.5, fontSize: { xs: 24, sm: 30 } }}>
              Departures, arrivals & connections
            </Typography>
          </Box>
          <Chip label="Live-style demo data" size="small" sx={{ bgcolor: 'primary.light', color: 'primary.dark', display: { xs: 'none', sm: 'inline-flex' } }} />
        </Stack>

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={1.5} alignItems={{ lg: 'flex-end' }}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            size="small"
            sx={{ minWidth: 170 }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            select
            label="Search by"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            size="small"
            sx={{ minWidth: 170 }}
          >
            {['Airline', 'Flight number', 'City', 'Airport'].map(opt => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>

          <TextField
            label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="BA117, British Airways, London, LHR…"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            label="Flight type"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 170 }}
          >
            {['All', 'Departures', 'Arrivals', 'Connections'].map(opt => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>

          <Stack direction="row" spacing={1}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SearchIcon />}
              sx={{ flex: { xs: 1, lg: 'none' }, height: 40 }}
            >
              Search
            </Button>
            <IconButton
              type="button"
              onClick={clear}
              aria-label="Clear search"
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, width: 40, height: 40 }}
            >
              <RestartAltIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1} sx={{ mt: 2.5, rowGap: 1 }}>
          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: 'text.secondary', fontSize: 12, fontWeight: 700 }}>
            <ScheduleIcon sx={{ fontSize: 15 }} />
            <span>Recent:</span>
          </Stack>
          {recent.map(item => {
            const code = airlineCodeFor(item)
            return (
              <Chip
                key={item}
                onClick={() => setQuery(item)}
                avatar={code ? <AirlineLogo airlineCode={code} size="sm" sx={{ width: 20, height: 20, fontSize: 9 }} /> : undefined}
                label={item}
                variant="outlined"
                sx={{ bgcolor: 'action.hover', fontWeight: 700 }}
              />
            )
          })}
        </Stack>
      </Box>
    </Card>
  )
}
