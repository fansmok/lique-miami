import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://liquemiami.vercel.app'),
  title: 'LIQUE Miami | Premium Waterfront Restaurant & Lounge',
  description:
    'Experience LIQUE Miami, a premium waterfront restaurant and lounge in North Miami Beach. Enjoy refined dining and spectacular views at 3957 NE 163rd St. Call +1-305-705-2425 for reservations.',
  keywords: [
    'LIQUE Miami',
    'premium waterfront restaurant',
    'Miami lounge',
    'North Miami Beach dining',
    'Miami waterfront dining',
    'fine dining Miami',
    'private events Miami',
  ],
  authors: [{ name: 'LIQUE Miami' }],
  creator: 'LIQUE Miami',
  publisher: 'LIQUE Miami',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LIQUE Miami | Premium Waterfront Restaurant & Lounge',
    description:
      'Experience LIQUE Miami, a premium waterfront restaurant and lounge in North Miami Beach. Enjoy refined dining and spectacular views at 3957 NE 163rd St.',
    url: '/',
    siteName: 'LIQUE Miami',
    locale: 'en_US',
    type: 'website',
    emails: ['info@liquemiami.com'],
    phoneNumbers: ['+1-305-705-2425'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LIQUE Miami | Premium Waterfront Restaurant & Lounge',
    description: 'Experience LIQUE Miami, a premium waterfront restaurant and lounge in North Miami Beach.',
    creator: '@LiqueMiami', // Replace with actual Twitter handle if exists
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#0B0B0D',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}
      >
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
