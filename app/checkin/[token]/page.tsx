import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import CheckinFlow from '@/components/CheckinFlow'

interface Props { params: { token: string } }

function todayFormatted() {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default async function CheckinPage({ params }: Props) {
  const { token } = params

  const { data: subscriber, error } = await supabaseAdmin
    .from('subscribers')
    .select('id, name, email')
    .eq('token', token)
    .eq('subscribed', true)
    .single()

  if (error || !subscriber) notFound()

  return (
    <main className="min-h-screen px-4 py-12" style={{ background: 'var(--page-bg)' }}>
      <div className="w-full max-w-lg mx-auto">

        {/* Page header */}
        <div className="flex items-center justify-between mb-8 fade-up">
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 10,
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              color: 'var(--muted-lt)',
              marginBottom: 2,
            }}>Action for Happiness</div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 13,
              fontStyle: 'italic',
              color: 'var(--muted)',
            }}>Daily Check-In</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 13,
              color: 'var(--ink-soft)',
            }}>{todayFormatted()}</div>
          </div>
        </div>

        {/* Gold rule */}
        <div className="gold-rule mb-8 fade-up">· — ·</div>

        <CheckinFlow token={token} name={subscriber.name} date={todayFormatted()} />
      </div>
    </main>
  )
}
