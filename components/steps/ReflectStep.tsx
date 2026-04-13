'use client'

import { useState } from 'react'

interface Props { onNext: (mood: string, text: string) => void; date: string }

const MOODS = ['Tender','Steady','Scattered','Hopeful','Tired','Alive','Anxious','Grateful','Peaceful','Heavy']

export default function ReflectStep({ onNext, date }: Props) {
  const [mood, setMood] = useState('')
  const [text, setText] = useState('')

  return (
    <div className="flex flex-col gap-5">
      <div className="entry-meta">{date} · Step II of IV</div>

      <div>
        <div className="chapter-label">II — Reflect</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.25 }}>
          How are you,<br /><em>honestly?</em>
        </h2>
      </div>

      <p style={{ fontFamily: "'Lora', serif", fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
        No performance needed. Just notice where you are, without judgement.
      </p>

      {/* Mood chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {MOODS.map(m => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={`mood-chip ${mood === m ? 'selected' : ''}`}
          >{m}</button>
        ))}
      </div>

      {/* Freewrite */}
      <div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>
          In my own words…
        </div>
        <textarea
          className="ruled-input"
          rows={3}
          placeholder="I feel…"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>

      <button
        className="btn-ink"
        onClick={() => onNext(mood, text)}
        disabled={!mood && !text.trim()}
      >
        Continue →
      </button>
    </div>
  )
}
