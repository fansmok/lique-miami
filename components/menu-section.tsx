'use client'

import { ExternalLink, Coffee, UtensilsCrossed, Cake, Clock, Wine, Users, Sparkles } from 'lucide-react'

const menuItems = [
  {
    title: 'Sunday Brunch',
    description: 'Weekend signature experience with fresh, seasonal selections.',
    icon: Coffee,
    link: 'https://www.liquemiami.com/_files/ugd/3bc1bc_5dd7a551c07f45a4be19a039f5996e26.pdf',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop',
    accent: 'from-amber-500/20 to-orange-600/20',
    featured: false,
  },
  {
    title: 'Dinner Menu',
    description: 'Mediterranean-inspired evening offerings with the finest ingredients.',
    icon: UtensilsCrossed,
    link: 'https://www.liquemiami.com/_files/ugd/544fc7_e0e0036b1c9a46aca84f6af9d2da60d3.pdf',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop',
    accent: 'from-[#B49567]/30 to-[#5E473D]/30',
    featured: true,
  },
  {
    title: 'Desserts',
    description: 'Artisanal sweet creations for the perfect finale.',
    icon: Cake,
    link: 'https://www.liquemiami.com/_files/ugd/544fc7_defdd078d567411dac393241e081b7d6.pdf',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop',
    accent: 'from-pink-500/20 to-rose-600/20',
    featured: false,
  },
  {
    title: 'Happy Hour',
    description: 'Carefully crafted specials in an inviting atmosphere.',
    icon: Clock,
    link: 'https://www.liquemiami.com/_files/ugd/3bc1bc_01b01971ee2e4ffbb70a184da2ebec29.pdf',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&auto=format&fit=crop',
    accent: 'from-violet-500/20 to-purple-600/20',
    featured: false,
  },
  {
    title: 'Drinks',
    description: 'Premium craft cocktails, fine wines, and spirits.',
    icon: Wine,
    link: 'https://www.liquemiami.com/_files/ugd/544fc7_e9382a053b79433fb1c26fe93af6c0ee.pdf',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop',
    accent: 'from-emerald-500/20 to-teal-600/20',
    featured: false,
  },
  {
    title: "Banquet Menu's",
    description: 'Exclusive offerings for private events and celebrations.',
    icon: Users,
    link: 'https://a9022679-bf08-4a2b-a799-e73f9f498d71.filesusr.com/ugd/544fc7_c5a1a072263f4da882fdf02af7b9dee4.pdf',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&auto=format&fit=crop',
    accent: 'from-[#183247]/40 to-[#B49567]/20',
    featured: false,
  },
]

export function MenuSection() {
  return (
    <section
      id="menu"
      className="relative w-full overflow-hidden bg-[#0B0B0D] py-20 sm:py-28 lg:py-32"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#B49567]/5 blur-3xl" />
        <div className="absolute -left-40 bottom-20 h-[400px] w-[400px] rounded-full bg-[#183247]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-16 text-center sm:mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B49567]/30 bg-[#B49567]/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-[#B49567]" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#B49567]">
              Culinary Excellence
            </span>
          </div>
          <h2 className="font-serif text-4xl font-semibold tracking-wide text-[#F2EDE5] sm:text-5xl lg:text-6xl">
            Our Menus
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#C9BFB5] sm:text-lg">
            From refined dinner service to weekend brunch, explore our carefully
            curated menus designed to delight every palate.
          </p>
        </div>

        {/* Uniform Grid Layout */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, index) => (
            <a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/60 to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100`} />
              </div>

              {/* Hover Glow Effect */}
              <div className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100">
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#B49567]/40" />
              </div>

              {/* Content */}
              <div className="relative flex h-full flex-col justify-between p-6">
                {/* Top - Icon Badge */}
                <div className="flex justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#B49567]/20 backdrop-blur-md transition-all duration-300 lg:bg-[#0B0B0D]/60 lg:group-hover:border-[#B49567]/50 lg:group-hover:bg-[#B49567]/20">
                    <item.icon className="h-5 w-5 text-[#B49567] transition-colors lg:text-[#F2EDE5] lg:group-hover:text-[#B49567]" />
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B0B0D]/60 opacity-100 backdrop-blur-md transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                    <ExternalLink className="h-4 w-4 text-[#F2EDE5]" />
                  </div>
                </div>

                {/* Bottom - Text */}
                <div className="transform transition-transform duration-300 translate-y-[-4px] lg:translate-y-0 lg:group-hover:translate-y-[-4px]">
                  <h3 className="mb-2 font-serif text-2xl font-medium text-[#F2EDE5] drop-shadow-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#C9BFB5]/90">
                    {item.description}
                  </p>
                  
                  {/* View Menu Button */}
                  <div className="mt-4 inline-flex translate-y-0 items-center gap-2 rounded-full border border-[#B49567] bg-[#B49567] px-5 py-2.5 text-[#0B0B0D] opacity-100 shadow-lg shadow-[#B49567]/25 transition-all duration-300 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                    <span className="text-sm font-semibold tracking-wide">View Menu</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Number Badge */}
              <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#0B0B0D]/40 font-serif text-sm text-[#F2EDE5]/60 backdrop-blur-sm">
                {String(index + 1).padStart(2, '0')}
              </div>
            </a>
          ))}
        </div>

        {/* Bottom accent line */}
        <div className="mx-auto mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#B49567]/40" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#B49567]" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#B49567]/40" />
        </div>
      </div>
    </section>
  )
}
