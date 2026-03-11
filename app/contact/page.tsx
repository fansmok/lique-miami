import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactSection } from '@/components/contact-section'
import { ChevronLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact & Reservations | LIQUE Miami',
  description: 'Contact LIQUE Miami for reservations, private events and dining inquiries in North Miami Beach.',
  openGraph: {
    title: 'Contact & Reservations | LIQUE Miami',
    description: 'Contact LIQUE Miami for reservations, private events and dining inquiries in North Miami Beach.',
    url: '/contact',
    type: 'website',
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'LIQUE Miami',
    image: 'https://liquemiami.vercel.app/og-image.jpg',
    '@id': 'https://liquemiami.vercel.app',
    url: 'https://liquemiami.vercel.app/contact',
    telephone: '+1-305-705-2425',
    email: 'info@liquemiami.com',
    menu: 'https://liquemiami.vercel.app/#menu',
    acceptsReservations: 'True',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3957 NE 163rd St',
      addressLocality: 'North Miami Beach',
      addressRegion: 'FL',
      postalCode: '33160',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.9311205,
      longitude: -80.1339512
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '18:00',
        closes: '01:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday', 'Saturday'],
        opens: '16:00',
        closes: '02:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '12:00',
        closes: '00:00'
      }
    ],
    priceRange: '$$$$',
    servesCuisine: 'Modern, Seafood, Steakhouse'
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#0B0B0D]">
      {/* Search Engine Native Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Navigation Link */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-start px-4 pt-8 sm:px-6">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#C9BFB5] transition-colors hover:text-[#B49567]"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Homepage
        </Link>
      </div>

      {/* Existing Component strictly reused! */}
      <ContactSection />
    </main>
  )
}
