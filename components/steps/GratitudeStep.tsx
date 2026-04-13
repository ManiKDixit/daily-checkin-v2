'use client'

import { useState } from 'react'

interface Props { onNext: (gratitude: string) => void; date: string }

const SEEDS = [
  'A warm drink', 'Someone kind', 'A good night\'s rest',
  'Sunlight', 'A piece of music', 'My health', 'Silence',
  'A friend', 'Something small', 'Being here',
]

export default function GratitudeStep({ onNext, date }: Props) {
  const [text, setText] = useState('')

  return (
    <div className="flex flex-col gap-5">
      <div className="entry-meta">{date} · Step III of IV</div>

      <div>
        <div className="chapter-label">III — Gratitude</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.25 }}>
          What is<br /><em>worth savouring today?</em>
        </h2>
      </div>

      <p style={{ fontFamily: "'Lora', serif", fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
        The smallest things count. The warmth of a cup of tea. The fact that you showed up.
      </p>

      {/* Seed prompts */}
      <div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted-lt)', marginBottom: 8 }}>
          Perhaps…
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {SEEDS.map(s => (
            <button
              key={s}
              onClick={() => setText(t => t ? `${t}, ${s.toLowerCase()}` : s)}
              style={{
                fontFamily: "'Lora', serif",
                fontSize: 11,
                padding: '4px 10px',
                border: '1px solid var(--border)',
                background: 'transparent',
                color: 'var(--muted)',
                cursor: 'pointer',
                borderRadius: 2,
                fontStyle: 'italic',
              }}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Freewrite */}
      <div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>
          Today I am grateful for…
        </div>
        <textarea
          className="ruled-input"
          rows={4}
          placeholder="Write freely…"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>

      <button className="btn-ink" onClick={() => onNext(text)} disabled={!text.trim()}>
        Continue →
      </button>
    </div>
  )
}
