# PulseGym Member Area + AI Health Coach

## What "Join Now" becomes

Replaces the current anchor with a real signup flow:

- **`/auth`** — Sign up / log in tabs. Email+password and Google sign-in.
- **Signup form fields**: full name, age, gender, fitness goal, doctor's name, doctor's email, password.
- On signup, a `profiles` row is created via database trigger; extra fields are saved right after.
- After login → `/member` (protected).

## Member area (`/member`, auth-gated)

Single page with three panels:

1. **Welcome header** — greets by name, shows current fitness goal.
2. **Coach explorer** — cards for the three trainers (Aladesuyi Marvellous, Ayodele Esther, Godwin John) with bios and specialties. Highlights the AI-recommended coach with a "Recommended for you" badge once the chatbot has suggested one.
3. **AI Health Coach chatbot** — threaded conversation panel (sidebar with past threads + new-thread button). Powered by Lovable AI (`google/gemini-3.6-flash`). The system prompt gives it the member's profile so replies are personalized. It can:
   - Discuss training, recovery, nutrition, mobility, mindset.
   - Recommend one of the three coaches when appropriate (saved to the member's profile → drives the "Recommended for you" badge).
   - Detect health red flags (chest pain, dizziness, injury pain, etc.). When it does, it flags the message in chat and shows a **"Notify my doctor"** button. Clicking it sends an EmailJS email to the doctor on file with a short summary; nothing is sent without the click.

## Data model (Lovable Cloud)

- `profiles` (user_id PK → auth.users, full_name, age, gender, fitness_goal, doctor_name, doctor_email, recommended_coach)
- `chat_threads` (id, user_id, title, timestamps)
- `chat_messages` (id, thread_id, user_id, role, content, is_health_flag, created_at)
- RLS: users read/write only their own rows. Trigger auto-creates a profile on signup.

## Server functions

- `sendChat` — takes `{ threadId, messages }`, loads the user's profile, calls Lovable AI with a health-coach system prompt, persists user + assistant messages, returns the reply plus `{ isHealthFlag, recommendedCoach }` metadata parsed from the model.
- `listThreads`, `getThread`, `createThread`, `deleteThread`.
- All use `requireSupabaseAuth`.

## Frontend

- New routes: `src/routes/auth.tsx`, `src/routes/_authenticated/route.tsx` (managed layout), `src/routes/_authenticated/member.tsx`.
- Landing page nav + hero "Join Now" / "Book a trial" buttons point to `/auth` (or `/member` if signed in — root reads session).
- Header shows "Member area" + "Sign out" when logged in.
- Chat UI: simple thread sidebar + message list + composer. Assistant messages render markdown. Health-flag messages get a red border and the doctor-notify action.

## Doctor-notify flow

Uses existing EmailJS credentials (service `service_liri6br`, template `template_gg2mx7f`, public key `nAsHaQs96w0LPCaSM`). The template receives `{{from_name}}` = member, `{{from_email}}` = member email, `{{subject}}` = "Health alert from PulseGym AI", `{{message}}` = summary + doctor's name + recipient. **Note:** the EmailJS template's "To Email" is fixed to `oemma5422@gmail.com` in your EmailJS dashboard — for true per-doctor delivery you'd need to add a `{{to_email}}` variable in the template later. For now the doctor's address is included in the message body so it can be forwarded manually.

## Technical details

- Chat model: `google/gemini-3.6-flash` via the AI Gateway (no user key needed).
- System prompt instructs the model to reply as strict JSON `{ reply, isHealthFlag, recommendedCoach }` so the server can attach metadata without a second call.
- Google OAuth configured via `configure_social_auth`; redirect back to `${origin}/auth` which then routes to `/member`.
- Client-side Zod validation on signup and chat input.
- All chat calls stream? → No, single-shot `generateText` for simplicity + reliable JSON parsing. Adds a "thinking..." indicator.
