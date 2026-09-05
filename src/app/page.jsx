'use client'

import App from '@/App'
import { SnackbarProvider } from '@/lib/snackbar'

export default function Page() {
  return (
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  )
}
