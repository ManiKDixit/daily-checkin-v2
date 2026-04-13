# Reflection

## Trade-offs

The biggest architectural decision was using Supabase rather than a self-hosted Postgres instance in Docker. This keeps the stack simple to run locally — reviewers only need to `docker compose up` and the app is live without managing a database container — but it introduces an external dependency that requires a quick setup step (creating a free Supabase project and running the schema SQL). With more time I would include a Postgres container in Docker Compose and handle migrations automatically on startup, making the setup truly zero-configuration.

I chose a token-in-URL approach for check-in access rather than full authentication. Each subscriber receives a unique UUID token; clicking the link in their email takes them directly to their personalised check-in without a login step. This is intentional — the friction of creating a password would discourage daily use, and the practice is inherently personal and low-stakes. The trade-off is that links can be forwarded, though for this use case that's unlikely to matter.

For email delivery I used Nodemailer pointing at the local Mailpit SMTP container, which means email is verifiable without any external credentials. In production this would be replaced with a transactional email provider such as Resend or Postmark for reliable delivery, bounce handling, and deliverability monitoring.

## Limitations

The daily email is triggered by a `POST /api/send-daily` endpoint rather than a true scheduled job. In production this would need a proper cron mechanism — Vercel Cron, a GitHub Actions schedule, or a background worker — otherwise no emails go out unless something calls the route. I've included a simple bearer-secret guard on that endpoint to prevent abuse.

There is no unsubscribe mechanism beyond the link in the email footer (which currently just redirects to home). A production system would need a proper unsubscribe flow that sets `subscribed = false` in the database and confirms to the user.

The check-in token is permanent — the same token is reused each day. This is simpler to implement but means a leaked token gives indefinite access to that user's check-in page. With more time I would generate a fresh single-use token for each email sent and expire it after 24 hours.

Error states in the UI are minimal. A production system would need more graceful handling of network failures, offline states, and retry logic.

## AI usage

I used Claude (Anthropic) extensively throughout this build for:

- **Scaffolding** — generating the initial project structure, Next.js App Router boilerplate, and Tailwind configuration to avoid time spent on setup.
- **Email HTML** — producing the table-based HTML email layout, which is tedious to write by hand and difficult to get right across email clients.
- **Component structure** — drafting the multi-step check-in flow components and the Supabase integration.
- **Docker configuration** — setting up the Dockerfile with Next.js standalone output and the Mailpit service in Docker Compose.

I reviewed, edited, and corrected the output throughout. Key things I fixed or adjusted:

- The Supabase RLS policies needed adjusting — the initial output used `auth.uid()` checks which don't apply when using the service role key server-side.
- The breathing animation timing was off in the initial draft; I corrected the `useEffect` cycle to properly sequence inhale → hold → exhale phases.
- The email template initially used flexbox, which most email clients don't support; I rewrote it using table-based layout.
- TypeScript strict-mode errors required several type annotation fixes that the AI draft left incomplete.

The AI was most valuable for the parts of the stack that are structural and repetitive (boilerplate, HTML email, Docker config). The product thinking — the step sequence, the tone of the copy, the colour palette, the decision to use tokens rather than auth — came from me directly.
