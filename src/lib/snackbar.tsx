import React, { createContext, useContext, useMemo, type ReactNode } from 'react'
import { Toaster, toast } from 'sonner'

type ToastSeverity = 'success' | 'info' | 'error' | 'warning'

export interface NotifyOptions {
  description?: string
  severity?: ToastSeverity
  icon?: ReactNode
}

export interface SnackbarContextValue {
  notify: (message: string, options?: NotifyOptions) => void
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null)

/**
 * Thin adapter over sonner so call sites keep using notify(message, { description, severity, icon }).
 */
export function SnackbarProvider({ children }: { children: ReactNode }) {
  const notify = (message: string, options: NotifyOptions = {}) => {
    const { severity, icon, description } = options
    const fn = severity && typeof toast[severity] === 'function' ? toast[severity] : toast
    fn(message, { description, icon })
  }

  const value = useMemo<SnackbarContextValue>(() => ({ notify }), [])

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Toaster position="bottom-right" richColors closeButton />
    </SnackbarContext.Provider>
  )
}

export function useSnackbar(): SnackbarContextValue {
  const ctx = useContext(SnackbarContext)
  if (!ctx) throw new Error('useSnackbar must be used within SnackbarProvider')
  return ctx
}
