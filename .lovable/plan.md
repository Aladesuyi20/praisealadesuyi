## Goal
When someone submits the contact form on the portfolio, you receive the details at **praisealadesuyi@gmail.com** via Lovable Emails.

## Steps

1. **Enable Lovable Cloud** — required backend for Lovable Emails.
2. **Set up an email sender domain** — you'll be prompted to pick a domain you own (e.g. `notify.yourdomain.com`) and add a few DNS records. Sending starts once DNS verifies (can take minutes to hours). Until then, the form still submits; emails queue up on the Lovable side.
3. **Scaffold app email templates** and create a `contact-submission` template showing the sender's name, email, and message with your portfolio's dark/cyan branding.
4. **Add a server route** `/api/contact` that:
   - Validates input with Zod (name, email, message, length limits).
   - Sends the templated email to `praisealadesuyi@gmail.com` with `replyTo` set to the sender's email (so you can reply straight from Gmail).
   - Returns success/error JSON.
5. **Wire the existing contact form** in `src/routes/index.tsx` to POST to that route, show a success toast, and reset on send.

## Notes
- No database table is created — submissions are delivered by email only. If you later want a record kept in Cloud too, that's a small follow-up.
- If you don't own a domain yet, we'll pause at step 2 so you can buy or point one; nothing else changes until then.
