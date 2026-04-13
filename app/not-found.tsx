export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--page-bg)' }}>
      <div className="journal-card p-10 w-full max-w-sm text-center">
        <div className="pl-6">
          <div className="ornament">· — ·</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontStyle: 'italic', color: 'var(--ink)', marginBottom: 12 }}>
            This page has passed
          </h1>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 13, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 24 }}>
            This check-in link may have expired or may not be quite right. Find your latest email for a fresh one.
          </p>
          <a href="/" className="btn-gold" style={{ display: 'block', textDecoration: 'none', padding: '14px', textAlign: 'center', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 15 }}>
            Return home
          </a>
        </div>
      </div>
    </main>
  )
}
