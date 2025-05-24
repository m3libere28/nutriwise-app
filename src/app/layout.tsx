import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NutriWise',
  description: 'Professional nutrition management platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">{children}</body>
    </html>
  )
}
