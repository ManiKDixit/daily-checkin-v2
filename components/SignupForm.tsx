'use client'

import { useState } from 'react'

export default function SignupForm() {
  const [name, setName]     = useState('')
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res  = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setStatus('success')
      setMessage(data.message)
    } catch (err: unknown) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center fade-up py-4">
        <div className="ornament">· — ·</div>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontStyle: 'italic', color: 'var(--ink)', marginBottom: 10 }}>
          You&apos;re all set.
        </p>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
          {message || 'Your first check-in is on its way. Check your inbox.'}
        </p>
        <p style={{ fontSize: 11, color: 'var(--muted-lt)', marginTop: 12, fontStyle: 'italic' }}>
          Using Mailpit?{' '}
          <a href="http://localhost:8025" target="_blank" rel="noreferrer" style={{ color: 'var(--gold)' }}>
            localhost:8025
          </a>
        </p>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid var(--border)',
    background: 'transparent',
    padding: '8px 0',
    fontFamily: "'Caveat', cursive",
    fontSize: 18,
    color: 'var(--ink)',
    outline: 'none',
    marginBottom: 20,
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Playfair Display', serif",
    fontSize: 9,
    letterSpacing: '.16em',
    textTransform: 'uppercase' as const,
    color: 'var(--gold)',
    display: 'block',
    marginBottom: 4,
  }

  return (
    <form onSubmit={handleSubmit}>
      <label style={labelStyle}>Your name</label>
      <input
        style={inputStyle}
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="How shall we address you?"
        required
        onFocus={e => (e.target.style.borderBottomColor = 'var(--ink)')}
        onBlur={e  => (e.target.style.borderBottomColor = 'var(--border)')}
      />
      <label style={labelStyle}>Email address</label>
      <input
        type="email"
        style={{ ...inputStyle, marginBottom: 28 }}
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        onFocus={e => (e.target.style.borderBottomColor = 'var(--ink)')}
        onBlur={e  => (e.target.style.borderBottomColor = 'var(--border)')}
      />

      {status === 'error' && (
        <p style={{ fontSize: 12, color: 'var(--rose)', marginBottom: 16, fontStyle: 'italic' }}>{message}</p>
      )}

      <button type="submit" className="btn-gold" disabled={status === 'loading'}>
        {status === 'loading' ? 'Opening your journal…' : 'Begin the practice →'}
      </button>
      <p style={{ textAlign: 'center', fontSize: 10, color: 'var(--muted-lt)', marginTop: 12, fontStyle: 'italic' }}>
        Delivered to your inbox each morning
      </p>
    </form>
  )
}
