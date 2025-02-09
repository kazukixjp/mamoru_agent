import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MAMORU_AGENT',
  description: 'まもる君: 労働に関するお悩み相談AI AGENT',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
