import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RyaFlix ',
  description: 'Stream the latest movies, TV series and anime on RianFlix.',
  icons: {
    icon: '/icon.jpg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-brand-dark text-white antialiased">
        {children}
      </body>
    </html>
  )
}