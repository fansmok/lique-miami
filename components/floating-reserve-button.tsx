'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'

export function FloatingReserveButton() {
  const [showDesktop, setShowDesktop] = useState(false)
  const [isContactVisible, setIsContactVisible] = useState(false)

  useEffect(() => {
    let currentContactVisible = false

    const handleScroll = () => {
      const isPastThreshold = window.scrollY > 600
      
      // Target the 'Reserve Your Table' header so the button vanishes when the form begins or when we're past it
      const formHeaderEl = document.getElementById('reservation-form-header')
      if (formHeaderEl) {
        const rect = formHeaderEl.getBoundingClientRect()
        // Determine if the header has entered the screen (or we are scrolled past it)
        currentContactVisible = rect.top <= window.innerHeight
      }
      
      setShowDesktop(isPastThreshold && !currentContactVisible)
      setIsContactVisible(currentContactVisible)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const formElement = document.getElementById('reservation-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      {/* Desktop Floating Button - shows after scroll and hides near contact section */}
      {showDesktop && (
        <div className="fixed bottom-8 right-8 z-50 hidden md:block animate-in fade-in zoom-in duration-300">
          <Button
            asChild
            size="lg"
            className="group bg-[#183247] px-6 py-6 text-sm font-medium uppercase tracking-widest text-[#F2EDE5] shadow-lg shadow-[#183247]/30 transition-all hover:bg-[#1e3f59] hover:shadow-xl hover:shadow-[#183247]/40"
          >
            <a href="#reservation-form" onClick={scrollToForm} className="flex items-center gap-3">
              <Calendar className="h-4 w-4 transition-transform group-hover:scale-110" />
              Reserve a Table
            </a>
          </Button>
        </div>
      )}

      {/* Mobile Sticky Bottom CTA - always visible unless contact section is in view */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 border-t border-[#B49567]/20 bg-[#0B0B0D]/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 md:hidden transform-gpu will-change-transform ${
          isContactVisible ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        <Button
          asChild
          className="w-full bg-[#B49567] py-5 text-sm font-semibold uppercase tracking-widest text-[#0B0B0D] hover:bg-[#C9A877]"
        >
          <a href="#reservation-form" onClick={scrollToForm} className="flex items-center justify-center gap-2">
            <Calendar className="h-4 w-4" />
            Reserve a Table
          </a>
        </Button>
      </div>
    </>
  )
}
