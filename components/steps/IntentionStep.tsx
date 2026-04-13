'use client'

import { useState } from 'react'

interface Props { onComplete: (i: string) => void; submitting: boolean; date: string }

const EXAMPLES = [
  'Take a slow walk and notice one beautiful thing',
  'Say something kind to someone I care about',
  'Step away from screens for an hour',
  'Do one thing I\'ve been putting off',
  'Be patient with myself today',
  'Eat something nourishing and sit down to enjoy it',
]

export default function IntentionStep({ onComplete, submitting, date }: Props) {
  const [text, setText] = useState('')

  return (
    <div className="flex flex-col gap-5">
      <div className="entry-meta">{date} · Step IV of IV</div>

      <div>
        <div className="chapter-label">IV — Intention</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.25 }}>
          What one thing will you<br /><em>do with care today?</em>
        </h2>
      </div>

      <p style={{ fontFamily: "'Lora', serif", fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
        Something small and doable. For yourself, or for someone else.
      </p>

      {/* Preview card — appears as user types */}
      {text && (
        <div style={{ border: '1px solid var(--border)', padding: '14px 16px', background: 'var(--gold-pale)', borderLeft: '3px solid var(--gold)' }} className="fade-up">
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>Today I will…</div>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color: 'var(--ink)', fontStyle: 'italic', lineHeight: 1.4 }}>
            &ldquo;{text}&rdquo;
          </p>
        </div>
      )}

      {/* Freewrite */}
      <div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>
          My intention…
        </div>
        <textarea
          className="ruled-input"
          rows={3}
          placeholder="Today I will…"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>

      {/* Suggestions */}
      <div>
        <div style={{ fontFamily: "'Lora', serif", fontSize: 11, fontStyle: 'italic', color: 'var(--muted-lt)', marginBottom: 8 }}>
          Or borrow one of these…
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {EXAMPLES.map(ex => (
            <button
              key={ex}
              onClick={() => setText(ex)}
              style={{
                textAlign: 'left',
                fontFamily: "'Lora', serif",
                fontSize: 12,
                fontStyle: 'italic',
                padding: '7px 12px',
                border: '1px solid var(--border)',
                background: 'transparent',
                color: 'var(--muted)',
                cursor: 'pointer',
                borderRadius: 2,
              }}
            >{ex}</button>
          ))}
        </div>
      </div>

      <button
        className="btn-gold"
        onClick={() => onComplete(text)}
        disabled={!text.trim() || submitting}
      >
        {submitting ? 'Saving your entry…' : 'Seal today\'s entry →'}
      </button>
    </div>
  )
}
