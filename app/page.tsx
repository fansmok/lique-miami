import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { MenuSection } from '@/components/menu-section'
import { ReviewsSection } from '@/components/reviews-section'
import { ContactSection } from '@/components/contact-section'
import { FloatingReserveButton } from '@/components/floating-reserve-button'
import { Footer } from '@/components/footer'

export default function LiqueMiamiPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#0B0B0D]">
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
      <FloatingReserveButton />
    </main>
  )
}
