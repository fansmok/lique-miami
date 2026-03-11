import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, date, time, guests, occasion, request: specialRequest, website } = body

    // 1. Honeypot check (bot protection)
    if (website) {
      // Simulate successful request for bots
      return NextResponse.json({ success: true })
    }

    // 2. Basic Validation
    if (!name || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 3. Process the reservation (e.g., save to database, send email to CRM)
    // TODO: Connect this to actual CRM or Database
    console.log('New Reservation Request:', {
      name,
      phone,
      email,
      date,
      time,
      guests,
      occasion,
      specialRequest,
      timestamp: new Date().toISOString(),
    })

    // Wait a brief moment to simulate network request
    await new Promise((resolve) => setTimeout(resolve, 800))

    // 4. Return success response
    return NextResponse.json({
      success: true,
      message: 'Reservation request received successfully',
    })
  } catch (error) {
    console.error('Reservation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
