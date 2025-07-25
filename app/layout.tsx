import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Abhinav Portfolio',
  description: 'Showcasing my work and skills.',
  generator: 'Next.js',
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
