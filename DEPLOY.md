# Deploying PulseGym

This is a **TanStack Start** app (React 19 + Vite 7 + SSR). It needs a server
runtime — a plain "static site" host will show a blank page.

## Vercel (recommended)

1. Push this folder to GitHub.
2. In Vercel: **Add New → Project → Import** the repo.
3. Leave everything at the defaults. `vercel.json` already sets:
   - Framework preset: **Other** (`framework: null`)
   - Build command: `npm run build`
   - Output directory: `.vercel/output`
4. Add these Environment Variables (Production + Preview):
   - `VITE_SUPABASE_URL` = `https://mjgbgisdlgsxuvyubptm.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = `sb_publishable_4dMsdXDX-O4_oDrwtWFUUg_aPx0VGsm`
   - `VITE_SUPABASE_PROJECT_ID` = `mjgbgisdlgsxuvyubptm`
   (These are publishable keys — safe in the browser. They're also in `.env`,
   so the build works even without setting them.)
5. Deploy. Node 22 is the recommended runtime version.

Why the earlier deploy was blank: the build defaulted to a **Cloudflare Worker**
bundle, which Vercel can't serve. `vite.config.ts` now switches Nitro to the
`vercel` preset automatically when `VERCEL=1` is present.

## Other hosts

Set `NITRO_PRESET` before building:

```bash
NITRO_PRESET=netlify      npm run build   # Netlify
NITRO_PRESET=node-server  npm run build   # any Node host (Render/Railway/VPS)
NITRO_PRESET=cloudflare-module npm run build  # Cloudflare Workers/Pages
```

Local production preview: `npm run build && npm run preview`

## Notes

- Google sign-in only works on the Lovable-hosted domain. Email/password
  sign-up works everywhere.
- Contact form emails go through EmailJS (client-side, no server config).
