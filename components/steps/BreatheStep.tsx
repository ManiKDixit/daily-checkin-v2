'use client'

import { useState, useEffect } from 'react'

interface Props { onNext: () => void; date: string }

const TOTAL = 3
const PHASES = { in: 4000, hold: 1500, out: 4000 } as const
type Phase = keyof typeof PHASES

export default function BreatheStep({ onNext, date }: Props) {
  const [phase, setPhase] = useState<Phase>('in')
  const [count, setCount] = useState(0)
  const [ready, setReady] = useState(false)

  const label: Record<Phase,string> = { in: 'Breathe in…', hold: 'Hold…', out: 'Breathe out…' }

  useEffect(() => {
    if (ready) return
    const cycle = () => {
      setPhase('in')
      const t1 = setTimeout(() => {
        setPhase('hold')
        const t2 = setTimeout(() => {
          setPhase('out')
          const t3 = setTimeout(() => {
            setCount(c => {
              const n = c + 1
              if (n >= TOTAL) setReady(true)
              return n
            })
          }, PHASES.out)
          return () => clearTimeout(t3)
        }, PHASES.hold)
        return () => clearTimeout(t2)
      }, PHASES.in)
      return () => clearTimeout(t1)
    }
    const id = setInterval(cycle, PHASES.in + PHASES.hold + PHASES.out + 500)
    cycle()
    return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  return (
    <div className="flex flex-col gap-5">
      <div className="entry-meta">{date} · Step I of IV</div>

      <div>
        <div className="chapter-label">I — Arrive</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.25 }}>
          Before we begin,<br /><em>let yourself breathe.</em>
        </h2>
      </div>

      <p style={{ fontFamily: "'Lora', serif", fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
        Set everything else aside for a moment. Follow the rhythm of the circle.
      </p>

      {/* Breathe orb */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, margin: '8px 0' }}>
        <div style={{ position: 'relative', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {[120, 86, 54].map((size, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: size, height: size,
              borderRadius: '50%',
              border: `1px solid rgba(201,169,110,${.15 + i * .15})`,
              background: i === 2 ? 'var(--gold-pale)' : 'transparent',
              animation: `breathe 4s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}/>
          ))}
          <span style={{ position: 'relative', zIndex: 1, fontFamily: "'Playfair Display', serif", fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            {label[phase]}
          </span>
        </div>

        {/* Breath dots */}
        <div style={{ display: 'flex', gap: 8 }}>
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} style={{
              width: i < count ? 18 : 6, height: 6,
              borderRadius: i < count ? 3 : '50%',
              background: i < count ? 'var(--gold)' : 'var(--border)',
              transition: 'all .4s ease',
            }}/>
          ))}
        </div>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 11, fontStyle: 'italic', color: 'var(--muted-lt)' }}>
          {ready ? 'Well done.' : `${TOTAL - count} breath${TOTAL - count !== 1 ? 's' : ''} remaining`}
        </p>
      </div>

      <button className="btn-ink" onClick={onNext}>
        {ready ? 'I am present →' : 'Skip ahead →'}
      </button>
    </div>
  )
}
