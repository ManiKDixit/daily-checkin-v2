import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { token, mood, feeling_text, gratitude, intention } = await req.json()

    if (!token) {
      return NextResponse.json({ error: 'Invalid token.' }, { status: 400 })
    }

    // Look up subscriber by token
    const { data: subscriber, error: subError } = await supabaseAdmin
      .from('subscribers')
      .select('id')
      .eq('token', token)
      .single()

    if (subError || !subscriber) {
      return NextResponse.json({ error: 'Subscriber not found.' }, { status: 404 })
    }

    // Save check-in
    const { error } = await supabaseAdmin.from('checkins').insert({
      subscriber_id: subscriber.id,
      mood,
      feeling_text,
      gratitude,
      intention,
    })

    if (error) {
      console.error('Checkin save error:', error)
      return NextResponse.json({ error: 'Failed to save check-in.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Checkin API error:', err)
    return NextResponse.json({ error: 'Unexpected error.' }, { status: 500 })
  }
}
