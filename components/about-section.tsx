'use client'

import { useCallback, useState } from 'react'
import { Utensils, Wine, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Utensils,
    title: 'Refined Dining',
    description:
      'Exquisite cuisine crafted by our executive chef, blending Mediterranean influences with contemporary flair.',
  },
  {
    icon: Wine,
    title: 'Premium Lounge',
    description:
      'An intimate atmosphere where craft cocktails meet sophisticated ambiance, perfect for evening gatherings.',
  },
  {
    icon: Sparkles,
    title: 'Private Events',
    description:
      'Host unforgettable celebrations with personalized service and stunning waterfront backdrops.',
  },
]

const venueImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/872-xXGaqhRzsnll0JW8ImoSShIkqijoRo.jpg'

export function AboutSection() {

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#151214] py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-16 text-center sm:mb-20">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#B49567]">
            The Experience
          </p>
          <h2 className="font-serif text-3xl font-semibold tracking-wide text-[#F2EDE5] sm:text-4xl lg:text-5xl">
            About the Venue
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-[#B49567]/40" />
        </div>

        {/* Two Column Layout */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h3 className="font-serif text-2xl font-medium leading-relaxed text-[#F2EDE5] sm:text-3xl">
              Where Waterfront Elegance Meets Miami Nightlife
            </h3>
            <p className="mt-6 text-base leading-relaxed text-[#C9BFB5]">
              LIQUE Miami is more than a restaurant — it&apos;s a destination.
              Nestled along the serene waterfront of North Miami Beach, we offer
              an elevated dining experience that seamlessly transitions from
              refined dinner service to a vibrant lounge atmosphere as the
              evening unfolds.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#C9BFB5]">
              Our carefully curated menu showcases the finest ingredients,
              prepared with precision and artistry. Whether you&apos;re
              celebrating a special occasion, hosting an intimate gathering, or
              simply seeking an exceptional night out, LIQUE delivers an
              unforgettable experience.
            </p>

            {/* Feature Grid */}
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="group">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[#2A1F1D] transition-colors group-hover:border-[#B49567]/40">
                    <feature.icon className="h-5 w-5 text-[#B49567]" />
                  </div>
                  <h4 className="mb-2 text-sm font-medium uppercase tracking-wider text-[#F2EDE5]">
                    {feature.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-[#8D7C73]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-lg border border-[#B49567]/20 bg-[#2A1F1D] overflow-hidden">
                <img
                  src={venueImage}
                  alt="LIQUE Miami Venue"
                  className="h-full w-full object-cover pointer-events-none"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Accent Card */}
              <div className="absolute -bottom-6 -left-4 hidden rounded-lg border border-[#B49567]/20 bg-[#2A1F1D]/95 p-6 shadow-2xl backdrop-blur-sm sm:block lg:-left-8 z-30 pointer-events-none">
                <p className="font-serif text-3xl font-semibold text-[#B49567]">
                  Est. 2019
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-[#8D7C73]">
                  North Miami Beach
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
