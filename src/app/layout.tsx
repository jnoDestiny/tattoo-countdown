import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chainsaw Tattoo Countdown',
  description: '365 days until I get a chainsaw tattoo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-chainsaw">
        {children}
      </body>
    </html>
  )
} 