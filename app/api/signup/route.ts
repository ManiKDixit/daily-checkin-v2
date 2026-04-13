import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendCheckinEmail } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json()

    if (!email || !name) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    // Upsert subscriber (handle returning users gracefully)
    const { data: subscriber, error } = await supabaseAdmin
      .from('subscribers')
      .upsert({ email, name, subscribed: true }, { onConflict: 'email' })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to create subscription.' }, { status: 500 })
    }

    // Send the first check-in email immediately
    await sendCheckinEmail({ to: email, name, token: subscriber.token })

    return NextResponse.json({
      message: `Welcome, ${name}! Your first check-in email has been sent. Check your inbox (or Mailpit at localhost:8025).`,
    })
  } catch (err) {
    console.error('Signup error:', err)
    return NextResponse.json({ error: 'Unexpected error. Please try again.' }, { status: 500 })
  }
}
