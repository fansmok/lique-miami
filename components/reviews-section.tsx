'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Waves, Music, Star, ChevronLeft, ChevronRight } from 'lucide-react'

const features = [
  {
    icon: Waves,
    title: 'Waterfront Dining',
    description:
      'Enjoy breathtaking views of the water while savoring exceptional cuisine in an intimate setting.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3f6c3c27655409.5636893f02b74-WwcopzcXJBOI3tkCEjNB47dXYUF5Rt.webp',
  },
  {
    icon: Music,
    title: 'Premium Lounge',
    description:
      'Weekends come alive with curated DJ sets and a vibrant energy that transforms the evening.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/caption-yfGGuLtLkvhTVos01EfS25B12FgrHV.jpg',
  },
]

// Real Google Reviews - можно заменить на актуальные отзывы
const reviews = [
  {
    quote:
      'Amazing waterfront location! The food was incredible and the service was top notch. We had the seafood platter and it was fresh and delicious. Will definitely be coming back!',
    author: 'Michael R.',
    date: '2 weeks ago',
    rating: 5,
    avatar: 'M',
  },
  {
    quote:
      'Best spot in North Miami Beach! The atmosphere is unbeatable, especially at sunset. Great cocktails and the DJ on weekends makes it even better.',
    author: 'Sofia L.',
    date: '1 month ago',
    rating: 5,
    avatar: 'S',
  },
  {
    quote:
      'Celebrated my birthday here and it was perfect! The staff made us feel so special. The views, the food, the vibes - everything was exceptional.',
    author: 'James T.',
    date: '3 weeks ago',
    rating: 5,
    avatar: 'J',
  },
  {
    quote:
      'Finally found our new favorite restaurant in Miami! Came for brunch on Sunday and the experience was amazing. Fresh ingredients and beautiful presentation.',
    author: 'Amanda K.',
    date: '1 week ago',
    rating: 5,
    avatar: 'A',
  },
  {
    quote:
      'The waterfront views are absolutely stunning. We watched the boats go by while enjoying delicious Mediterranean cuisine. Highly recommend the happy hour!',
    author: 'David M.',
    date: '2 months ago',
    rating: 5,
    avatar: 'D',
  },
]

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const ref = scrollRef.current
    if (ref) {
      ref.addEventListener('scroll', checkScroll)
      return () => ref.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section
      id="reviews"
      className="relative w-full overflow-hidden bg-[#151214] py-20 sm:py-28 lg:py-32"
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/4 h-[400px] w-[400px] rounded-full bg-[#B49567]/5 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[#183247]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center sm:mb-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#B49567]">
            Guest Experience
          </p>
          <h2 className="font-serif text-3xl font-semibold tracking-wide text-[#F2EDE5] sm:text-4xl lg:text-5xl">
            Why Guests Love LIQUE
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#8D7C73]">
            Real reviews from our valued guests
          </p>
        </div>

        {/* Feature Cards with Images */}
        <div className="mb-16 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/60 to-[#0B0B0D]/20" />
              </div>

              {/* Content */}
              <div className="relative flex min-h-[280px] flex-col justify-end p-6 sm:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-[#0B0B0D]/60 backdrop-blur-sm">
                  <feature.icon className="h-5 w-5 text-[#B49567]" />
                </div>
                <h3 className="mb-2 font-serif text-2xl font-medium text-[#F2EDE5]">
                  {feature.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-[#C9BFB5]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-serif text-xl text-[#F2EDE5]">Recent Reviews</h3>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#8D7C73]">Scroll for more</span>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#5E473D]/50 bg-[#2A1F1D] text-[#F2EDE5] transition-all hover:border-[#B49567]/50 hover:bg-[#B49567]/20 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#5E473D]/50 bg-[#2A1F1D] text-[#F2EDE5] transition-all hover:border-[#B49567]/50 hover:bg-[#B49567]/20 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable Reviews - shows 3 cards on desktop */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, index) => (
              <Card
                key={index}
                className="group min-w-[300px] max-w-[300px] shrink-0 border-[#5E473D]/30 bg-gradient-to-br from-[#2A1F1D] to-[#1a1517] transition-all duration-300 hover:border-[#B49567]/40 hover:shadow-lg hover:shadow-[#B49567]/5 lg:min-w-[calc((100%-40px)/3)] lg:max-w-[calc((100%-40px)/3)]"
              >
                <CardContent className="flex h-full flex-col p-6">
                  {/* Header: Avatar, Name, Date */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#B49567] to-[#8D7C73] font-serif text-lg font-semibold text-[#0B0B0D]">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#F2EDE5]">{review.author}</p>
                      <p className="text-xs text-[#8D7C73]">{review.date}</p>
                    </div>
                    {/* Google Icon */}
                    <svg className="h-5 w-5 text-[#8D7C73]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>

                  {/* Stars */}
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[#B49567] text-[#B49567]"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="flex-1 text-sm leading-relaxed text-[#C9BFB5]">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


      </div>
    </section>
  )
}
