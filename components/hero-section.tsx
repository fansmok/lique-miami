'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Phone, MapPin, Menu, X, Waves, Calendar, Music, Clock } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

const trustBadges = [
  { icon: Waves, label: 'Waterfront Views' },
  { icon: Calendar, label: 'Private Events' },
  { icon: Music, label: 'Weekend Lounge' },
]

const hoursData = [
  { day: 0, label: 'Sunday', hours: '12 pm - 12 am' },
  { day: 1, label: 'Monday', hours: '6 pm - 1 am' },
  { day: 2, label: 'Tuesday', hours: '6 pm - 1 am' },
  { day: 3, label: 'Wednesday', hours: '6 pm - 1 am' },
  { day: 4, label: 'Thursday', hours: '6 pm - 1 am' },
  { day: 5, label: 'Friday', hours: '4 pm - 2 am' },
  { day: 6, label: 'Saturday', hours: '4 pm - 2 am' },
]

function getTodayHours() {
  // Use Miami timezone (America/New_York - Eastern Time)
  const miamiTime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
  const today = new Date(miamiTime).getDay()
  return hoursData.find((h) => h.day === today) || hoursData[0]
}

export function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const todayHours = getTodayHours()

  useEffect(() => {
    // Attempt to forcefully play the video
    // iOS Low Power Mode stops standard autoplay, but we can trigger it via script
    // and if that fails, we bind a one-time touch listener to start it on the first tap.
    const videoElem = videoRef.current
    if (!videoElem) return

    const tryPlay = () => {
      videoElem.play().catch((err) => {
        // AbortError or NotAllowedError means the browser blocked it (Low Power Mode or Data Saver)
        console.log('Video autoplay blocked, waiting for interaction:', err)
        // Wait for first touch anywhere on screen to play it
        const playOnInteraction = () => {
          videoElem.play()
          document.removeEventListener('touchstart', playOnInteraction)
          document.removeEventListener('click', playOnInteraction)
        }
        document.addEventListener('touchstart', playOnInteraction, { once: true, passive: true })
        document.addEventListener('click', playOnInteraction, { once: true, passive: true })
      })
    }

    tryPlay()
  }, [])

  return (
    <section id="hero" className="relative w-full">
      {/* Top Info Bar - Full Width */}
      <div className="border-b border-[var(--border)] bg-[#0B0B0D]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 py-2 text-xs sm:justify-between sm:gap-6 sm:text-sm">
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="tel:+13057052425"
              className="flex items-center gap-2 text-[#C9BFB5] transition-colors hover:text-[#B49567]"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">+1 (305) 705-2425</span>
              <span className="sm:hidden">Call</span>
            </a>
            <a
              href="https://www.google.com/maps?q=3957+NE+163rd+St,+North+Miami+Beach,+FL+33160"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#C9BFB5] transition-colors hover:text-[#B49567]"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span className="hidden md:inline">
                3957 NE 163rd St, North Miami Beach, FL 33160
              </span>
              <span className="md:hidden">Directions</span>
            </a>
          </div>

          {/* Hours Tooltip */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="group flex items-center gap-2 rounded-full border border-[#B49567]/30 bg-[#B49567]/10 px-3 py-1.5 text-[#F2EDE5] transition-all hover:border-[#B49567]/60 hover:bg-[#B49567]/20">
                <Clock className="h-3.5 w-3.5 text-[#B49567]" />
                <span className="text-xs font-medium">{todayHours.label}</span>
                <span className="hidden text-xs text-[#B49567] sm:inline">{todayHours.hours}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-80 border-[#5E473D]/50 bg-[#0B0B0D]/95 p-0 shadow-2xl shadow-black/50 backdrop-blur-xl"
              align="end"
              sideOffset={8}
            >
              {/* Header */}
              <div className="relative overflow-hidden border-b border-[#5E473D]/30 px-5 py-4">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B49567]/20 via-[#2A1F1D] to-[#0B0B0D]" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-widest text-[#B49567]">Hours</p>
                    <h4 className="font-serif text-xl font-medium text-[#F2EDE5]">Hours of Operation</h4>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-[#B49567]/20 px-3 py-1">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B49567] opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B49567]"></span>
                    </span>
                    <span className="text-xs font-medium text-[#B49567]">Open</span>
                  </div>
                </div>
              </div>

              {/* Hours Grid */}
              <div className="p-5">
                <div className="space-y-1">
                  {[
                    { day: 'Mon - Thu', hours: '6 pm - 1 am' },
                    { day: 'Friday', hours: '4 pm - 2 am' },
                    { day: 'Saturday', hours: '4 pm - 2 am' },
                    { day: 'Sunday', hours: '12 pm - 12 am' },
                  ].map((item) => (
                    <div key={item.day} className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-[#2A1F1D]/50">
                      <span className="text-sm text-[#C9BFB5]">{item.day}</span>
                      <span className="text-sm font-medium text-[#F2EDE5]">{item.hours}</span>
                    </div>
                  ))}
                </div>

                {/* Sunday Brunch Highlight */}
                <div className="mt-4 overflow-hidden rounded-xl border border-[#B49567]/30 bg-gradient-to-r from-[#B49567]/10 to-transparent">
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B49567]/20">
                        <span className="text-sm">&#9788;</span>
                      </div>
                      <div>
                        <p className="text-xs text-[#B49567]">Every Sunday</p>
                        <p className="font-medium text-[#F2EDE5]">Brunch</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#B49567]/20 px-3 py-1 text-sm font-medium text-[#B49567]">12 - 4 pm</span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Main Navigation - Full Width */}
      <nav className="border-b border-[var(--border)] bg-[#0B0B0D]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl font-semibold tracking-wider text-[#F2EDE5] sm:text-3xl">
              LIQUE
            </span>
            <span className="ml-2 font-serif text-lg font-light tracking-widest text-[#B49567] sm:text-xl">
              Miami
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-widest text-[#C9BFB5] transition-colors hover:text-[#F2EDE5]"
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="bg-[#183247] text-[#F2EDE5] hover:bg-[#1e3f59]"
            >
              <a href="#contact">Reserve a Table</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-[#F2EDE5] md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-[var(--border)] bg-[#0B0B0D] md:hidden">
            <div className="flex flex-col gap-4 px-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium uppercase tracking-widest text-[#C9BFB5] transition-colors hover:text-[#F2EDE5]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Split Hero: Content Left, Video Right */}
      <div className="flex min-h-[calc(100vh-120px)] flex-col lg:flex-row">
        {/* Left Side - Content with Solid Background */}
        <div className="order-2 flex w-full flex-col justify-center bg-[#0B0B0D] px-6 py-12 sm:px-12 lg:order-1 lg:w-1/2 lg:py-16 xl:px-20">
          <div className="mx-auto max-w-xl lg:mx-0 lg:ml-auto lg:mr-12">
            {/* Micro Label */}
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#B49567]">
              North Miami Beach
            </p>

            {/* Headline */}
            <h1 className="font-serif text-3xl font-semibold leading-tight tracking-wide text-[#F2EDE5] text-balance sm:text-4xl lg:text-5xl xl:text-6xl">
              Waterfront Dining & Lounge in Miami
            </h1>

            {/* Divider */}
            <div className="my-6 h-px w-16 bg-[#B49567]" />

            {/* Subheadline */}
            <p className="max-w-md text-base leading-relaxed text-[#C9BFB5] sm:text-lg">
              An elevated evening experience with refined dining, vibrant
              atmosphere, and unforgettable waterfront views.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-4">
              <Button
                asChild
                size="lg"
                className="hidden bg-[#183247] px-8 py-6 text-sm font-medium uppercase tracking-widest text-[#F2EDE5] hover:bg-[#1e3f59] sm:inline-flex"
              >
                <a href="#contact">Reserve a Table</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#B49567]/40 bg-transparent px-8 py-6 text-sm font-medium uppercase tracking-widest text-[#F2EDE5] hover:border-[#B49567] hover:bg-[#B49567]/10"
              >
                <a href="#menu">View Menu</a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap gap-3">
              {trustBadges.map((badge) => (
                <Badge
                  key={badge.label}
                  variant="outline"
                  className="flex items-center gap-2 border-[#5E473D]/50 bg-[#2A1F1D]/50 px-4 py-2 text-xs font-normal text-[#C9BFB5]"
                >
                  <badge.icon className="h-3.5 w-3.5 text-[#B49567]" />
                  {badge.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Video */}
        <div className="relative order-1 h-[50vh] w-full lg:order-2 lg:h-auto lg:w-1/2">
          {/* Video Element with CSS Filters */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            className="h-full w-full object-cover saturate-[0.85] contrast-[1.1] brightness-[0.9]"
          >
            <source
              src="https://video.wixstatic.com/video/3bc1bc_91f05b94cb7543bda37df81d902fe339/1080p/mp4/file.mp4"
              type="video/mp4"
            />
          </video>
          
          {/* Warm Sepia Tone */}
          <div className="absolute inset-0 bg-[#2A1F1D]/40 mix-blend-multiply" />
          
          {/* Main Darkening Overlay */}
          <div className="absolute inset-0 bg-[#0B0B0D]/45" />
          
          {/* Vignette Effect */}
          <div 
            className="absolute inset-0" 
            style={{ 
              background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(11,11,13,0.5) 100%)' 
            }} 
          />
          
          {/* Bronze/Gold Accent Glow */}
          <div 
            className="absolute inset-0 mix-blend-soft-light opacity-30" 
            style={{ 
              background: 'radial-gradient(ellipse at 70% 70%, rgba(180,149,103,0.5) 0%, transparent 60%)' 
            }} 
          />

          {/* Edge gradient for smooth transition from content */}
          <div className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-l from-transparent to-[#0B0B0D] lg:block" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B0B0D] to-transparent lg:hidden" />
        </div>
      </div>
    </section>
  )
}
