# Daily Check-In — Action for Happiness

A gentle daily practice app: sign up, receive a daily email, and walk through a 5-minute check-in covering breathing, reflection, gratitude, and intention.

## Quick start

### Prerequisites
- Docker & Docker Compose
- A free [Supabase](https://supabase.com) project (takes ~2 minutes to create)

### 1. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **Settings → SQL Editor → New Query**
3. Paste the contents of `supabase/schema.sql` and click **Run**
4. Go to **Settings → API** and copy your **Project URL**, **anon public key**, and **service_role key**

### 2. Configure environment

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials in `.env.local`.

### 3. Run with Docker

```bash
docker compose up --build
```

- App: [http://localhost:3000](http://localhost:3000)
- Mailpit (email viewer): [http://localhost:8025](http://localhost:8025)

### 4. Try it out

1. Go to [http://localhost:3000](http://localhost:3000) and sign up with any email
2. Open [http://localhost:8025](http://localhost:8025) to see your welcome email
3. Click the check-in link in the email
4. Complete all four steps

## Running locally (without Docker)

```bash
npm install
npm run dev
```

You'll need a running Mailpit instance or set `SMTP_HOST` to a real SMTP server.

## Project structure

```
app/
  page.tsx              — Landing / sign-up page
  api/signup/           — POST: create subscriber, send welcome email
  api/checkin/          — POST: save check-in responses
  api/send-daily/       — POST: trigger daily emails (for cron)
  checkin/[token]/      — The interactive check-in flow
components/
  SignupForm.tsx         — Sign-up form
  CheckinFlow.tsx        — Multi-step check-in manager
  steps/                 — Breathe, Reflect, Gratitude, Intention steps
lib/
  supabase.ts            — Supabase client (admin + anon)
  mailer.ts              — Nodemailer + email HTML template
supabase/
  schema.sql             — Database schema (run once in Supabase)
REFLECTION.md            — Trade-offs, limitations, AI usage
```

## Triggering daily emails

Call `POST /api/send-daily` (e.g. from a cron job). In production, protect this with the `CRON_SECRET` environment variable:

```bash
curl -X POST http://localhost:3000/api/send-daily \
  -H "x-cron-secret: your-secret"
```
