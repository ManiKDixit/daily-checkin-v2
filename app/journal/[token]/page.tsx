import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'

interface Props { params: { token: string } }

interface Entry {
  id: string
  mood: string
  feeling_text: string
  gratitude: string
  intention: string
  completed_at: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}
function formatShort(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export default async function JournalPage({ params }: Props) {
  const { token } = params

  const { data: subscriber, error: subError } = await supabaseAdmin
    .from('subscribers')
    .select('id, name')
    .eq('token', token)
    .single()

  if (subError || !subscriber) notFound()

  const { data: entries } = await supabaseAdmin
    .from('checkins')
    .select('id, mood, feeling_text, gratitude, intention, completed_at')
    .eq('subscriber_id', subscriber.id)
    .order('completed_at', { ascending: false })

  const checkins: Entry[] = entries || []

  return (
    <main style={{ minHeight: '100vh', background: 'var(--page-bg)', padding: '40px 16px 80px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* Header */}
        <div className="fade-up" style={{ marginBottom: 40 }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 10, letterSpacing: '.18em',
            textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6,
          }}>
            Action for Happiness · Personal Journal
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 36, fontStyle: 'italic',
            color: 'var(--ink)', lineHeight: 1.2, marginBottom: 6,
          }}>
            {subscriber.name}&apos;s Journal
          </h1>
          <p style={{
            fontFamily: "'Lora', serif", fontSize: 13,
            color: 'var(--muted)', fontStyle: 'italic',
          }}>
            {checkins.length} {checkins.length === 1 ? 'entry' : 'entries'} · a record of your mornings
          </p>

          <div className="gold-rule" style={{ marginTop: 20 }}>· — ·</div>
        </div>

        {checkins.length === 0 ? (
          /* Empty state */
          <div className="journal-card fade-up" style={{ padding: '60px 40px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontStyle: 'italic', color: 'var(--ink)', marginBottom: 12 }}>
              Your journal awaits.
            </div>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 28 }}>
              Complete your first check-in and it will appear here — a record of your mornings, your gratitude, your intentions.
            </p>
            <a href={`/checkin/${token}`}
              style={{
                display: 'inline-block', padding: '13px 32px',
                background: 'var(--ink)', color: 'var(--parchment)',
                fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 14,
                textDecoration: 'none',
              }}>
              Begin today&apos;s check-in →
            </a>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {checkins.map((entry, idx) => (
              <div key={entry.id} className="journal-card fade-up" style={{ padding: '32px 36px 28px' }}>
                <div style={{ paddingLeft: 16 }}>

                  {/* Entry header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <div>
                      <div style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 9, letterSpacing: '.16em',
                        textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4,
                      }}>
                        Entry {checkins.length - idx}
                      </div>
                      <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 20, fontStyle: 'italic',
                        color: 'var(--ink)', lineHeight: 1.2,
                      }}>
                        {formatDate(entry.completed_at)}
                      </h2>
                      <div style={{
                        fontFamily: "'Lora', serif", fontSize: 11,
                        fontStyle: 'italic', color: 'var(--muted-lt)', marginTop: 2,
                      }}>
                        Written at {formatTime(entry.completed_at)}
                      </div>
                    </div>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 28, fontStyle: 'italic',
                      color: 'var(--border)', lineHeight: 1,
                      userSelect: 'none',
                    }}>
                      {String(checkins.length - idx).padStart(2, '0')}
                    </div>
                  </div>

                  <div className="ornament" style={{ margin: '16px 0' }}>· — ·</div>

                  {/* Entry body */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {[
                      { label: 'Feeling', value: entry.mood + (entry.feeling_text ? ` — ${entry.feeling_text}` : ''), italic: false },
                      { label: 'Grateful for', value: entry.gratitude, italic: false },
                      { label: "Today's intention", value: entry.intention, italic: true },
                    ].filter(e => e.value?.trim()).map(({ label, value, italic }) => (
                      <div key={label} style={{
                        borderBottom: '1px solid rgba(212,201,168,.3)',
                        padding: '12px 0',
                        display: 'flex', gap: 14, alignItems: 'flex-start',
                      }}>
                        <span style={{ color: 'var(--gold)', fontSize: 11, marginTop: 4, flexShrink: 0 }}>⟡</span>
                        <div>
                          <div style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 9, letterSpacing: '.14em',
                            textTransform: 'uppercase', color: 'var(--muted-lt)', marginBottom: 4,
                          }}>{label}</div>
                          <div style={{
                            fontFamily: "'Caveat', cursive",
                            fontSize: 20, color: 'var(--ink)',
                            lineHeight: 1.35,
                            fontStyle: italic ? 'italic' : 'normal',
                          }}>{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            ))}

            {/* Back to today */}
            <div style={{ textAlign: 'center', paddingTop: 8 }}>
              <a href={`/checkin/${token}`}
                style={{
                  display: 'inline-block', padding: '13px 32px',
                  border: '1px solid var(--border)',
                  background: 'var(--gold-pale)',
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic', fontSize: 14,
                  color: 'var(--ink)', textDecoration: 'none',
                }}>
                Write today&apos;s entry →
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
