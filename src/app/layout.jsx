import { Inter, Manrope, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata = {
  title: 'FlightPath — Travel Assistant',
  description: 'Flight departures, arrivals and connections travel assistant',
}

export const viewport = {
  themeColor: '#08111F',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
