'use client'

import { useState } from 'react'
import BreatheStep    from './steps/BreatheStep'
import ReflectStep    from './steps/ReflectStep'
import GratitudeStep  from './steps/GratitudeStep'
import IntentionStep  from './steps/IntentionStep'

interface Props { token: string; name: string; date: string }

export type CheckinData = {
  mood: string; feeling_text: string; gratitude: string; intention: string
}

const STEPS = ['breathe','reflect','gratitude','intention','complete'] as const
type Step = (typeof STEPS)[number]

export default function CheckinFlow({ token, name, date }: Props) {
  const [step, setStep] = useState<Step>('breathe')
  const [data, setData] = useState<CheckinData>({ mood:'', feeling_text:'', gratitude:'', intention:'' })
  const [submitting, setSubmitting] = useState(false)

  const stepIndex = STEPS.indexOf(step)

  function next() { setStep(STEPS[stepIndex + 1]) }

  async function handleComplete(intention: string) {
    const final = { ...data, intention }
    setData(final)
    setSubmitting(true)
    try {
      await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, ...final }),
      })
    } catch {}
    setSubmitting(false)
    setStep('complete')
  }

  /* Progress dots — 4 content steps */
  const dots = (['breathe','reflect','gratitude','intention'] as const).map((s, i) => {
    if (i < stepIndex) return 'done'
    if (s === step)    return 'active'
    return 'empty'
  })

  return (
    <div className="fade-up">
      {step !== 'complete' && (
        <div className="prog-track mb-6">
          {dots.map((d, i) => (
            <div key={i} className={`prog-dot ${d === 'done' ? 'done' : d === 'active' ? 'active' : ''}`} />
          ))}
          <span style={{ marginLeft: 10, fontFamily: "'Lora', serif", fontSize: 11, color: 'var(--muted-lt)', fontStyle: 'italic' }}>
            Step {stepIndex + 1} of 4
          </span>
        </div>
      )}

      <div className="journal-card p-8">
        <div className="pl-5">
          {step === 'breathe'   && <BreatheStep   onNext={next} date={date} />}
          {step === 'reflect'   && <ReflectStep   onNext={(m,t) => { setData(d => ({...d,mood:m,feeling_text:t})); next() }} date={date} />}
          {step === 'gratitude' && <GratitudeStep onNext={g => { setData(d => ({...d,gratitude:g})); next() }} date={date} />}
          {step === 'intention' && <IntentionStep onComplete={handleComplete} submitting={submitting} date={date} />}
          {step === 'complete'  && <CompleteScreen name={name} data={data} date={date} token={token} />}
        </div>
      </div>
    </div>
  )
}

function CompleteScreen({ name, data, date, token }: { name: string; data: CheckinData; date: string; token: string }) {
  const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="fade-up">
      {/* Header */}
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>
        Daily Check-In · Action for Happiness
      </div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontStyle: 'italic', color: 'var(--ink)', marginBottom: 2 }}>
        {date}
      </h2>
      <p style={{ fontFamily: "'Lora', serif", fontSize: 12, fontStyle: 'italic', color: 'var(--muted-lt)', marginBottom: 4 }}>
        Entry written by {name} at {time}
      </p>

      <div className="ornament">· — ·</div>

      {/* Entries */}
      {[
        { label: 'Feeling', value: data.mood + (data.feeling_text ? ` — ${data.feeling_text}` : '') },
        { label: 'Grateful for', value: data.gratitude },
        { label: 'Today\'s intention', value: data.intention, italic: true },
      ].map(({ label, value, italic }) => (
        <div key={label} style={{ borderBottom: '1px solid rgba(212,201,168,.35)', padding: '12px 0', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--gold)', fontSize: 12, marginTop: 3, flexShrink: 0 }}>⟡</span>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted-lt)', marginBottom: 3 }}>{label}</div>
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color: 'var(--ink)', lineHeight: 1.35, fontStyle: italic ? 'italic' : 'normal' }}>{value}</div>
          </div>
        </div>
      ))}

      <div className="ornament" style={{ marginTop: 20 }}>· — ·</div>

      <p style={{ fontFamily: "'Lora', serif", fontSize: 13, fontStyle: 'italic', color: 'var(--muted)', textAlign: 'center', lineHeight: 1.8, marginTop: 4 }}>
        This moment is yours.<br />You showed up — that is enough.
      </p>

      {/* Signature line */}
      <div style={{ borderTop: '1px solid var(--border)', marginTop: 20, paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <span style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: 'var(--ink-soft)' }}>{name}</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 10, color: 'var(--muted-lt)', letterSpacing: '.08em' }}>
          See you tomorrow ☀
        </span>
      </div>

      {/* Journal link */}
      <a
        href={`/journal/${token}`}
        style={{
          display: 'block',
          marginTop: 20,
          padding: '13px 20px',
          border: '1px solid var(--border)',
          background: 'var(--gold-pale)',
          textAlign: 'center',
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: 14,
          color: 'var(--ink)',
          textDecoration: 'none',
          letterSpacing: '.02em',
          transition: 'background .2s',
        }}
      >
        View all my entries →
      </a>
    </div>
  )
}
