import React, { createContext, useContext, useMemo } from 'react'
import { Toaster, toast } from 'sonner'

const SnackbarContext = createContext(null)

/**
 * Thin adapter over sonner so call sites keep using notify(message, { description, severity, icon }).
 */
export function SnackbarProvider({ children }) {
  const notify = (message, options = {}) => {
    const { severity, icon, description } = options
    const fn = severity && typeof toast[severity] === 'function' ? toast[severity] : toast
    fn(message, { description, icon })
  }

  const value = useMemo(() => ({ notify }), [])

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Toaster position="bottom-right" richColors closeButton />
    </SnackbarContext.Provider>
  )
}

export function useSnackbar() {
  const ctx = useContext(SnackbarContext)
  if (!ctx) throw new Error('useSnackbar must be used within SnackbarProvider')
  return ctx
}
