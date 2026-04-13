import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '1025'),
  secure: false,
  ignoreTLS: true,
})

export async function sendCheckinEmail({
  to,
  name,
  token,
}: {
  to: string
  name: string
  token: string
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const checkinUrl = `${baseUrl}/checkin/${token}`

  await transporter.sendMail({
    from: `"Action for Happiness" <${process.env.SMTP_FROM || 'hello@actionforhappiness.org'}>`,
    to,
    subject: `Good morning, ${name || 'there'} ☀️ — your daily check-in is ready`,
    html: buildEmailHtml({ name, checkinUrl }),
    text: buildEmailText({ name, checkinUrl }),
  })
}

function buildEmailHtml({ name, checkinUrl }: { name: string; checkinUrl: string }) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Daily Check-In</title>
</head>
<body style="margin:0;padding:0;background:#FEFDF9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FEFDF9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#FFD97D,#F5A623,#FF8C69);display:inline-flex;align-items:center;justify-content:center;font-size:28px;margin-bottom:16px;">☀️</div>
              <div style="font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#B0A090;">Action for Happiness</div>
            </td>
          </tr>
          <!-- Card -->
          <tr>
            <td style="background:white;border-radius:20px;border:1px solid #EDE9E0;padding:36px 40px;">
              <h1 style="font-family:Georgia,serif;font-size:28px;color:#2D1F0E;margin:0 0 12px;font-weight:normal;line-height:1.2;">Good morning, ${name || 'there'} ☀️</h1>
              <p style="font-size:16px;color:#5C5752;line-height:1.7;margin:0 0 20px;">
                Your daily check-in is ready. Take five quiet minutes for yourself — breathe, reflect, and step into the day with a little more intention and gratitude.
              </p>
              <p style="font-size:15px;color:#5C5752;line-height:1.7;margin:0 0 28px;">
                Small daily practices, done consistently, really do make a meaningful difference.
              </p>
              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
                <tr>
                  <td align="center">
                    <a href="${checkinUrl}" style="display:inline-block;background:linear-gradient(135deg,#F5A623,#FF8C69);color:white;text-decoration:none;font-size:16px;font-weight:600;padding:16px 40px;border-radius:14px;letter-spacing:0.01em;">
                      Start today's check-in →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="font-size:13px;color:#B0A090;text-align:center;margin:0;">
                Or copy this link: <a href="${checkinUrl}" style="color:#F5A623;">${checkinUrl}</a>
              </p>
            </td>
          </tr>
          <!-- Steps preview -->
          <tr>
            <td style="padding:28px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="25%" align="center" style="padding:12px 8px;">
                    <div style="font-size:22px;margin-bottom:6px;">💨</div>
                    <div style="font-size:12px;font-weight:600;color:#5C5752;">Breathe</div>
                  </td>
                  <td width="25%" align="center" style="padding:12px 8px;">
                    <div style="font-size:22px;margin-bottom:6px;">🌤</div>
                    <div style="font-size:12px;font-weight:600;color:#5C5752;">Reflect</div>
                  </td>
                  <td width="25%" align="center" style="padding:12px 8px;">
                    <div style="font-size:22px;margin-bottom:6px;">🌱</div>
                    <div style="font-size:12px;font-weight:600;color:#5C5752;">Gratitude</div>
                  </td>
                  <td width="25%" align="center" style="padding:12px 8px;">
                    <div style="font-size:22px;margin-bottom:6px;">🌟</div>
                    <div style="font-size:12px;font-weight:600;color:#5C5752;">Intention</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:28px 0 0;text-align:center;">
              <p style="font-size:12px;color:#C0B8B0;margin:0;">
                Action for Happiness · London, UK<br />
                You're receiving this because you signed up for Daily Check-Ins.<br />
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?token=${checkinUrl.split('/').pop()}" style="color:#C0B8B0;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function buildEmailText({ name, checkinUrl }: { name: string; checkinUrl: string }) {
  return `Good morning, ${name || 'there'}!

Your daily check-in is ready. Take five quiet minutes for yourself — breathe, reflect, and step into the day with a little more intention and gratitude.

Start your check-in: ${checkinUrl}

Today's steps:
  💨 Breathe — take a few calm, deep breaths
  🌤 Reflect — check in with how you're feeling, without judgement
  🌱 Gratitude — notice what you're grateful for today
  🌟 Intention — set one positive intention for the day

With gratitude,
The Action for Happiness team
`
}
