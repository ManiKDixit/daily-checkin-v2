import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendCheckinEmail } from '@/lib/mailer'

// This route can be triggered by an external cron job (e.g. cron-job.org, Vercel Cron, etc.)
// Protect it with a shared secret in production.
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret')
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const { data: subscribers, error } = await supabaseAdmin
    .from('subscribers')
    .select('email, name, token')
    .eq('subscribed', true)

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch subscribers.' }, { status: 500 })
  }

  const results = await Promise.allSettled(
    subscribers.map((s) => sendCheckinEmail({ to: s.email, name: s.name, token: s.token }))
  )

  const sent = results.filter((r) => r.status === 'fulfilled').length
  const failed = results.filter((r) => r.status === 'rejected').length

  return NextResponse.json({ sent, failed })
}
