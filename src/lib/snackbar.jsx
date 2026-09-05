import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const SnackbarContext = createContext(null)

/**
 * Minimal MUI Snackbar+Alert replacement for the previous sonner toast API.
 * Exposes notify(message, { description, severity }) via useSnackbar().
 */
export function SnackbarProvider({ children }) {
  const [queue, setQueue] = useState([])
  const [current, setCurrent] = useState(null)
  const [open, setOpen] = useState(false)

  const notify = useCallback((message, options = {}) => {
    const item = { id: Date.now() + Math.random(), message, ...options }
    setQueue(q => [...q, item])
  }, [])

  const processQueue = useCallback(() => {
    if (queue.length) {
      setCurrent(queue[0])
      setQueue(q => q.slice(1))
      setOpen(true)
    } else {
      setCurrent(null)
    }
  }, [queue])

  React.useEffect(() => {
    if (queue.length && !open) processQueue()
  }, [queue, open, processQueue])

  const handleClose = (_e, reason) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4200}
        onClose={handleClose}
        onExited={processQueue}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {current ? (
          <Alert
            onClose={handleClose}
            severity={current.severity || 'info'}
            variant="filled"
            icon={current.icon}
            sx={{ width: '100%', maxWidth: 360 }}
          >
            {current.message}
            {current.description ? (
              <span style={{ display: 'block', fontWeight: 400, opacity: 0.9, fontSize: '0.8em' }}>
                {current.description}
              </span>
            ) : null}
          </Alert>
        ) : null}
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

export function useSnackbar() {
  const ctx = useContext(SnackbarContext)
  if (!ctx) throw new Error('useSnackbar must be used within SnackbarProvider')
  return ctx
}
