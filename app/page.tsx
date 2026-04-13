import SignupForm from '@/components/SignupForm'

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: 'var(--page-bg)' }}>
      <div className="w-full max-w-sm fade-up">

        {/* Monogram seal */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center pulse"
              style={{
                border: '1.5px solid var(--gold)',
                background: 'var(--gold-pale)',
              }}
            >
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 26,
                fontStyle: 'italic',
                color: 'var(--gold)',
              }}>A</span>
            </div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 10,
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}>Action for Happiness</div>
          </div>
        </div>

        {/* Journal card */}
        <div className="journal-card p-8">
          <div className="pl-5">
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26,
              fontStyle: 'italic',
              color: 'var(--ink)',
              lineHeight: 1.25,
              marginBottom: 10,
            }}>
              A quiet moment,<br />just for you.
            </h1>
            <p style={{
              fontFamily: "'Lora', serif",
              fontSize: 13,
              color: 'var(--muted)',
              lineHeight: 1.75,
              marginBottom: 28,
            }}>
              Five minutes each morning. A small, honest practice that can
              quietly change how you move through your days.
            </p>
            <SignupForm />
          </div>
        </div>

        {/* Steps preview */}
        <div className="flex justify-center gap-6 mt-8">
          {['I · Breathe', 'II · Reflect', 'III · Gratitude', 'IV · Intention'].map((s) => (
            <div key={s} style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 9,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: 'var(--muted-lt)',
            }}>{s}</div>
          ))}
        </div>
      </div>
    </main>
  )
}
