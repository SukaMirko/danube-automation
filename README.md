# Danube Automation

Public site for danubeautomation.com. Astro, static pages, one server route for the contact form.

- `npm ci && npm run dev` → http://127.0.0.1:4321
- `POST /api/contact` saves the lead to `$LEADS_DIR/leads.jsonl` (Railway volume at `/data`), then mails it via `RESEND_API_KEY` or SMTP (`MAIL_USER`/`MAIL_PASS`/`MAIL_HOST`). `MAIL_TO` sets the recipient.
- Deploys on Railway from the `main` branch with the Dockerfile. Health check: `GET /`.
