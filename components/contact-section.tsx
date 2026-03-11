'use client'

import { useState, useEffect, useMemo, type FormEvent } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Phone, MapPin, Mail, Clock, Calendar, Users, AlertCircle, CheckCircle2, Sparkles, User, PartyPopper, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'

const businessHours = [
  { day: 'Monday - Thursday', hours: '6 pm – 1 am' },
  { day: 'Friday', hours: '4 pm – 2 am' },
  { day: 'Saturday', hours: '4 pm – 2 am' },
  { day: 'Sunday', hours: '12 pm - 12 am' },
  { day: 'Sunday Brunch', hours: '12 pm – 4 pm' },
]

// Time slots based on day - will be filtered dynamically
const allTimeSlots = {
  brunch: ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
  evening: ['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM'],
  late: ['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM', '12:00 AM'],
}

const guestOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+']

const occasions = [
  'None',
  'Birthday',
  'Anniversary',
  'Date Night',
  'Business Dinner',
  'Celebration',
  'Other',
]

interface ReservationFormState {
  name: string
  phone: string
  email: string
  date: string
  time: string
  guests: string
  occasion: string
  request: string
  website: string // honeypot field
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
  date?: string
  time?: string
  guests?: string
}

// Extracted Form Component to prevent re-renders of the whole section on keystrokes
function ReservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [formData, setFormData] = useState<ReservationFormState>({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '',
    occasion: '',
    request: '',
    website: '', // honeypot field
  })

  const [minDate, setMinDate] = useState<string>('')

  useEffect(() => {
    // Calculates the minimum date once on mount, rather than on every keystroke
    // This avoids blocking the main thread with expensive Intl API calls in Safari during typing
    const miamiTime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
    const today = new Date(miamiTime)
    const todayStr = today.toISOString().split('T')[0]
    setMinDate(todayStr)
    
    // Automatically set today's date as the default selected date
    setFormData((prev) => ({ ...prev, date: prev.date || todayStr }))
  }, [])

  // Validate form fields
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Please enter your name'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        return undefined
      case 'phone':
        if (!value.trim()) return 'Phone number is required'
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/
        if (!phoneRegex.test(value)) return 'Please enter a valid phone number'
        return undefined
      case 'email':
        // Email is optional, but validate format if provided
        if (value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) return 'Please enter a valid email address'
        }
        return undefined
      case 'date':
        if (!value) return 'Please select a date'
        const selectedDate = new Date(value)
        const today = new Date(minDate || new Date().toISOString().split('T')[0])
        if (selectedDate < today) return 'Please select a future date'
        return undefined
      case 'time':
        if (!value) return 'Please select a time'
        return undefined
      case 'guests':
        if (!value) return 'Please select number of guests'
        return undefined
      default:
        return undefined
    }
  }

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    const fields: (keyof ReservationFormState)[] = ['name', 'phone', 'date', 'time', 'guests']
    
    fields.forEach((field) => {
      const error = validateField(field, formData[field])
      if (error) newErrors[field as keyof FormErrors] = error
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBlur = (field: string, value?: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    
    // Update formData with the value if it's an uncontrolled input blur
    if (value !== undefined) {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
    
    // Validate with either the provided value or the current formData value
    const error = validateField(field, value !== undefined ? value : formData[field as keyof ReservationFormState])
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {}
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true
    })
    setTouched(allTouched)

    if (!validateForm()) {
      toast.error('Please fix the errors', {
        description: 'Some required fields are missing or invalid.',
      })
      return
    }

    setIsSubmitting(true)

    // Anti-spam: Honeypot check
    // If the hidden 'website' field is filled out, a bot likely did it.
    // We silently pretend it was successful so the bot doesn't know it failed.
    if (formData.website !== '') {
      await new Promise((resolve) => setTimeout(resolve, 800)) // Fake delay
      toast.success('Reservation Request Sent!', {
        description: `We'll confirm your table for ${formData.guests} on ${new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${formData.time}.`,
      })
      setIsSubmitting(false)
      // Reset form
      setFormData({ name: '', phone: '', email: '', date: '', time: '', guests: '', occasion: '', request: '', website: '' })
      return
    }

    // Send real POST Request to API
    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit reservation')
      }

      // Show success toast
      toast.success('Reservation Request Sent!', {
        description: `We'll confirm your table for ${formData.guests} on ${new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${formData.time}.`,
      })

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        guests: '',
        occasion: '',
        request: '',
        website: '',
      })
      setTouched({})
      setErrors({})
    } catch (error) {
       toast.error('Submission Failed', {
         description: 'There was an issue sending your request. Please try again or call us.',
       })
       console.error('Submission Error', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Only update formData on change for Date and Time that need immediate reflection for memoization
    // For text inputs, we will rely on defaultValue and onBlur to update formData to prevent typing lag
    const { name, value } = e.target
    if (name === 'date' || name === 'time') {
       setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setTouched((prev) => ({ ...prev, [name]: true }))
    
    // Clear error
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // Memoize DayInfo so it doesn't recalculate on every keystroke
  const dayInfo = useMemo(() => {
    if (!formData.date) return null
    const date = new Date(formData.date)
    const dayOfWeek = date.getDay()
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
    
    let hours = ''
    let timeSlots: string[] = []
    
    if (dayOfWeek === 0) {
      // Sunday - includes brunch and evening
      hours = '12 pm – 12 am'
      timeSlots = [...allTimeSlots.brunch, ...allTimeSlots.evening]
    } else if (dayOfWeek >= 1 && dayOfWeek <= 4) {
      // Monday - Thursday
      hours = '6 pm – 1 am'
      timeSlots = allTimeSlots.late
    } else {
      // Friday & Saturday
      hours = '4 pm – 2 am'
      timeSlots = [...allTimeSlots.evening, '11:30 PM', '12:00 AM', '12:30 AM', '1:00 AM']
    }
    
    return { dayName, hours, isSunday: dayOfWeek === 0, timeSlots }
  }, [formData.date])
  
  // Available time slots based on selected date
  const availableTimeSlots = dayInfo?.timeSlots || [...allTimeSlots.brunch, ...allTimeSlots.evening]

  return (
    <Card className="flex-1 overflow-hidden border-[#B49567]/20 bg-gradient-to-br from-[#2A1F1D] to-[#1a1517]">
      {/* Form Header */}
      <div id="reservation-form-header" className="border-b border-[#B49567]/20 bg-gradient-to-r from-[#B49567]/10 to-transparent px-4 py-4 sm:px-8 sm:py-5">
        <h3 className="font-serif text-xl font-medium text-[#F2EDE5] sm:text-2xl">
          Reserve Your Table
        </h3>
        <p className="mt-1 text-xs text-[#C9BFB5] sm:text-sm">
          Fill out the form and we&apos;ll confirm within 15 minutes
        </p>
      </div>

      <CardContent className="p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Honeypot field - visually hidden to catch bots */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              defaultValue={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
            />
          </div>

          {/* Name & Phone */}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-[#F2EDE5] sm:mb-2 sm:gap-2 sm:text-sm"
              >
                <User className="h-3.5 w-3.5 shrink-0 text-[#B49567] sm:h-4 sm:w-4" />
                <span>Name</span> <span className="text-[#B49567]">*</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={formData.name}
                onBlur={(e) => handleBlur('name', e.target.value)}
                placeholder="John Smith"
                className={`h-11 border-[#5E473D]/50 bg-[#0B0B0D] text-[#F2EDE5] placeholder:text-[#8D7C73]/60 focus:border-[#B49567] focus:ring-[#B49567]/20 sm:h-12 ${
                  touched.name && errors.name ? 'border-red-500/50' : ''
                }`}
              />
              {touched.name && errors.name && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-[#F2EDE5] sm:mb-2 sm:gap-2 sm:text-sm"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#B49567] sm:h-4 sm:w-4" />
                <span>Phone</span> <span className="text-[#B49567]">*</span>
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                defaultValue={formData.phone}
                onBlur={(e) => handleBlur('phone', e.target.value)}
                placeholder="(305) 555-0123"
                className={`h-11 border-[#5E473D]/50 bg-[#0B0B0D] text-[#F2EDE5] placeholder:text-[#8D7C73]/60 focus:border-[#B49567] focus:ring-[#B49567]/20 sm:h-12 ${
                  touched.phone && errors.phone ? 'border-red-500/50' : ''
                }`}
              />
              {touched.phone && errors.phone && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Email - full width */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-[#F2EDE5] sm:mb-2 sm:gap-2 sm:text-sm"
            >
              <Mail className="h-3.5 w-3.5 shrink-0 text-[#B49567] sm:h-4 sm:w-4" />
              <span>Email</span> <span className="text-xs text-[#8D7C73]">(optional)</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={formData.email}
              onBlur={(e) => handleBlur('email', e.target.value)}
              placeholder="john@example.com"
              className={`h-11 border-[#5E473D]/50 bg-[#0B0B0D] text-[#F2EDE5] placeholder:text-[#8D7C73]/60 focus:border-[#B49567] focus:ring-[#B49567]/20 sm:h-12 ${
                touched.email && errors.email ? 'border-red-500/50' : ''
              }`}
            />
            {touched.email && errors.email && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                <AlertCircle className="h-3 w-3" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <div>
              <label
                htmlFor="date"
                className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-[#F2EDE5] sm:mb-2 sm:gap-2 sm:text-sm"
              >
                <Calendar className="h-3.5 w-3.5 shrink-0 text-[#B49567] sm:h-4 sm:w-4" />
                <span>Date</span> <span className="text-[#B49567]">*</span>
              </label>
              <Input
                id="date"
                name="date"
                type="date"
                required
                min={minDate}
                value={formData.date}
                onChange={(e) => {
                  handleChange(e)
                  // Reset time when date changes
                  setFormData((prev) => ({ ...prev, time: '' }))
                }}
                onBlur={(e) => handleBlur('date', e.target.value)}
                className={`h-11 border-[#5E473D]/50 bg-[#0B0B0D] text-[#F2EDE5] focus:border-[#B49567] focus:ring-[#B49567]/20 sm:h-12 ${
                  touched.date && errors.date ? 'border-red-500/50' : ''
                }`}
              />
              {touched.date && errors.date && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {errors.date}
                </p>
              )}
              {dayInfo && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-[#B49567]">
                  <CheckCircle2 className="h-3 w-3 shrink-0" />
                  <span className="truncate">{dayInfo.dayName}: {dayInfo.hours}</span>
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="time"
                className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-[#F2EDE5] sm:mb-2 sm:gap-2 sm:text-sm"
              >
                <Clock className="h-3.5 w-3.5 shrink-0 text-[#B49567] sm:h-4 sm:w-4" />
                <span>Time</span> <span className="text-[#B49567]">*</span>
              </label>
              <Select
                value={formData.time}
                onValueChange={(value) => handleSelectChange('time', value)}
                disabled={!formData.date}
              >
                <SelectTrigger 
                  className={`h-11 border-[#5E473D]/50 bg-[#0B0B0D] text-[#F2EDE5] focus:border-[#B49567] focus:ring-[#B49567]/20 disabled:opacity-50 sm:h-12 ${
                    touched.time && errors.time ? 'border-red-500/50' : ''
                  }`}
                >
                  <SelectValue placeholder={formData.date ? "Select time" : "Select date first"} />
                </SelectTrigger>
                <SelectContent className="max-h-[280px] border-[#5E473D]/50 bg-[#1a1517] z-50">
                  {dayInfo?.isSunday && (
                    <div className="px-2 py-1.5 text-xs font-medium text-[#B49567]">Sunday Brunch</div>
                  )}
                  {availableTimeSlots.map((time, index) => (
                    <SelectItem key={time + index} value={time} className="text-[#F2EDE5] focus:bg-[#B49567]/20 font-sans">
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!formData.date && (
                <p className="mt-1.5 text-xs text-[#8D7C73]">
                  Select a date first
                </p>
              )}
              {touched.time && errors.time && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {errors.time}
                </p>
              )}
            </div>
          </div>

          {/* Guests & Occasion */}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <div>
              <label
                htmlFor="guests"
                className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-[#F2EDE5] sm:mb-2 sm:gap-2 sm:text-sm"
              >
                <Users className="h-3.5 w-3.5 shrink-0 text-[#B49567] sm:h-4 sm:w-4" />
                <span>Guests</span> <span className="text-[#B49567]">*</span>
              </label>
              <Select
                value={formData.guests}
                onValueChange={(value) => handleSelectChange('guests', value)}
              >
                <SelectTrigger 
                  className={`h-11 border-[#5E473D]/50 bg-[#0B0B0D] text-[#F2EDE5] focus:border-[#B49567] focus:ring-[#B49567]/20 sm:h-12 ${
                    touched.guests && errors.guests ? 'border-red-500/50' : ''
                  }`}
                >
                  <SelectValue placeholder="Number of guests" />
                </SelectTrigger>
                <SelectContent className="border-[#5E473D]/50 bg-[#1a1517] z-50">
                  {guestOptions.map((num) => (
                    <SelectItem key={num} value={num} className="text-[#F2EDE5] focus:bg-[#B49567]/20 font-sans">
                      {num} {num === '1' ? 'Guest' : num === '10+' ? 'Guests (Large Party)' : 'Guests'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {touched.guests && errors.guests && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {errors.guests}
                </p>
              )}
              {formData.guests === '10+' && (
                <p className="mt-1.5 text-xs text-[#B49567]">
                  Call (305) 705-2425 for large parties
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="occasion"
                className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-[#F2EDE5] sm:mb-2 sm:gap-2 sm:text-sm"
              >
                <PartyPopper className="h-3.5 w-3.5 shrink-0 text-[#B49567] sm:h-4 sm:w-4" />
                <span>Occasion</span> <span className="text-xs text-[#8D7C73]">(optional)</span>
              </label>
              <Select
                value={formData.occasion}
                onValueChange={(value) => handleSelectChange('occasion', value)}
              >
                <SelectTrigger className="h-11 border-[#5E473D]/50 bg-[#0B0B0D] text-[#F2EDE5] focus:border-[#B49567] focus:ring-[#B49567]/20 sm:h-12">
                  <SelectValue placeholder="Select occasion" />
                </SelectTrigger>
                <SelectContent className="border-[#5E473D]/50 bg-[#1a1517] z-50">
                  {occasions.map((occasion) => (
                    <SelectItem key={occasion} value={occasion} className="text-[#F2EDE5] focus:bg-[#B49567]/20 font-sans">
                      {occasion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Special Request */}
          <div>
            <label
              htmlFor="request"
              className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-[#F2EDE5] sm:mb-2 sm:gap-2 sm:text-sm"
            >
              <MessageSquare className="h-3.5 w-3.5 shrink-0 text-[#B49567] sm:h-4 sm:w-4" />
              <span>Special Requests</span> <span className="text-xs text-[#8D7C73]">(optional)</span>
            </label>
            <Textarea
              id="request"
              name="request"
              rows={2}
              defaultValue={formData.request}
              onBlur={(e) => handleBlur('request', e.target.value)}
              placeholder="Dietary restrictions, seating preferences..."
              className="resize-none border-[#5E473D]/50 bg-[#0B0B0D] text-[#F2EDE5] placeholder:text-[#8D7C73]/60 focus:border-[#B49567] focus:ring-[#B49567]/20"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full bg-gradient-to-r from-[#B49567] to-[#8D7C73] text-sm font-semibold uppercase tracking-widest text-[#0B0B0D] shadow-lg shadow-[#B49567]/20 transition-all hover:from-[#C9A877] hover:to-[#9D8C83] hover:shadow-xl hover:shadow-[#B49567]/30 disabled:opacity-50 sm:h-14 sm:text-base"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              'Request Reservation'
            )}
          </Button>

          {/* Note & Welcome Message */}
          <div className="flex flex-col items-center justify-center gap-6 pb-16 pt-2 sm:pb-0 sm:pt-4">
            <p className="text-center text-xs text-[#8D7C73]">
              Confirmed via phone within 15 min. Call{' '}
              <a href="tel:+13057052425" className="text-[#B49567] transition-colors hover:text-[#C9A877] hover:underline">
                (305) 705-2425
              </a>{' '}
              for immediate booking.
            </p>
            
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="font-serif text-lg italic text-[#F2EDE5] sm:text-xl">
                We look forward to welcoming you at
              </span>
              <span className="font-serif text-2xl font-medium tracking-[0.15em] text-[#B49567] sm:text-3xl">
                LIQUE <span className="text-[#F2EDE5]">MIAMI</span>
              </span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#151214] via-[#1a1517] to-[#0B0B0D] py-20 sm:py-28 lg:py-32"
    >
      {/* Decorative background with Safari hardware acceleration fixes (using performant radial gradients instead of heavy CSS blur filters) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div 
          className="absolute left-1/4 top-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-40 transform-gpu will-change-transform" 
          style={{ background: 'radial-gradient(circle, rgba(180, 149, 103, 0.15) 0%, rgba(180, 149, 103, 0) 70%)' }}
        />
        <div 
          className="absolute bottom-0 right-1/4 h-[700px] w-[700px] translate-x-1/3 translate-y-1/3 rounded-full opacity-50 transform-gpu will-change-transform" 
          style={{ background: 'radial-gradient(circle, rgba(24, 50, 71, 0.25) 0%, rgba(24, 50, 71, 0) 70%)' }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8 text-center sm:mb-12 lg:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B49567]/30 bg-[#B49567]/10 px-3 py-1.5 sm:mb-6 sm:px-4 sm:py-2">
            <Sparkles className="h-3.5 w-3.5 text-[#B49567] sm:h-4 sm:w-4" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B49567] sm:text-xs">
              Reserve Your Experience
            </span>
          </div>
          <h2 className="font-serif text-3xl font-semibold tracking-wide text-[#F2EDE5] sm:text-4xl lg:text-5xl">
            Contact & Reservations
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#C9BFB5] sm:mt-4 sm:text-base">
            Secure your table at Miami&apos;s premier waterfront destination
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Contact Information & Map - Left Side */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Contact Details */}
            <Card className="flex-1 overflow-hidden border-[#B49567]/20 bg-gradient-to-br from-[#2A1F1D] to-[#1a1517]">
              <CardContent className="space-y-3 p-4 sm:space-y-5 sm:p-6">
                {/* Address */}
                <a
                  href="https://maps.app.goo.gl/HZwM4DU9wjNTyJSi8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-[#B49567]/10 sm:gap-4 sm:p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#B49567]/20 to-[#B49567]/5 sm:h-11 sm:w-11 sm:rounded-xl">
                    <MapPin className="h-4 w-4 text-[#B49567] sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-widest text-[#B49567] sm:text-xs">
                      Address
                    </p>
                    <p className="mt-0.5 text-sm text-[#F2EDE5] transition-colors group-hover:text-[#B49567] sm:mt-1 sm:text-base">
                      3957 NE 163rd St
                    </p>
                    <p className="text-xs text-[#C9BFB5] sm:text-sm">North Miami Beach, FL 33160</p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+13057052425"
                  className="group flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-[#B49567]/10 sm:gap-4 sm:p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#B49567]/20 to-[#B49567]/5 sm:h-11 sm:w-11 sm:rounded-xl">
                    <Phone className="h-4 w-4 text-[#B49567] sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-widest text-[#B49567] sm:text-xs">
                      Phone
                    </p>
                    <p className="mt-0.5 text-sm text-[#F2EDE5] transition-colors group-hover:text-[#B49567] sm:mt-1 sm:text-base">
                      +1 (305) 705-2425
                    </p>
                    <p className="text-xs text-[#C9BFB5] sm:text-sm">Call for immediate booking</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@liquemiami.com"
                  className="group flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-[#B49567]/10 sm:gap-4 sm:p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#B49567]/20 to-[#B49567]/5 sm:h-11 sm:w-11 sm:rounded-xl">
                    <Mail className="h-4 w-4 text-[#B49567] sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-widest text-[#B49567] sm:text-xs">
                      Email
                    </p>
                    <p className="mt-0.5 text-sm text-[#F2EDE5] transition-colors group-hover:text-[#B49567] sm:mt-1 sm:text-base">
                      info@liquemiami.com
                    </p>
                    <p className="text-xs text-[#C9BFB5] sm:text-sm">Events & private inquiries</p>
                  </div>
                </a>

                {/* Hours */}
                <div className="rounded-xl bg-[#0B0B0D]/50 p-3 sm:p-4">
                  <div className="mb-2 flex items-center gap-2 sm:mb-3">
                    <Clock className="h-3.5 w-3.5 text-[#B49567] sm:h-4 sm:w-4" />
                    <p className="text-[10px] font-medium uppercase tracking-widest text-[#B49567] sm:text-xs">
                      Hours
                    </p>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    {businessHours.map((item) => (
                      <div
                        key={item.day}
                        className="flex justify-between text-xs sm:text-sm"
                      >
                        <span className="text-[#C9BFB5]">{item.day}</span>
                        <span className="font-medium text-[#F2EDE5]">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map - hidden on mobile to save space. Strong CSS containment to prevent Safari layout thrashing. */}
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-[#B49567]/20 sm:block transform-gpu will-change-transform" style={{ contain: 'strict' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3588.1249882463017!2d-80.13395118818757!3d25.931120501487285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9ad1ac8c75c15%3A0xc87aea6c1963152c!2sLique%20Miami%20Waterfront%20Restaurant!5e0!3m2!1sen!2sus!4v1773228236839!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, opacity: 0.85 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LIQUE Miami Waterfront Restaurant"
                className="grayscale-[30%] contrast-[1.1] transform-gpu will-change-transform pointer-events-none"
              />
              {/* Overlay to catch clicks and prevent map interaction during scroll */}
              <div className="absolute inset-0 bg-transparent z-10" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/40 to-transparent z-20" />
              <a
                href="https://maps.app.goo.gl/HZwM4DU9wjNTyJSi8"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-[#B49567] px-4 py-2 text-sm font-medium text-[#0B0B0D] transition-transform hover:scale-105 z-30"
              >
                <MapPin className="h-4 w-4" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Reservation Form - Right Side */}
          <div id="reservation-form" className="flex flex-col scroll-mt-4">
            <ReservationForm />
          </div>
        </div>
      </div>
    </section>
  )
}
