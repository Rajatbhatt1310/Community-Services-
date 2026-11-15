# CyberSafe School

Learn. Verify. Protect. Report.

A cybersecurity awareness website for school students in Classes 9 to 12, built as a B.Tech Community Service Initiative at K.R. Mangalam University.

## What it includes

- Ten learning chapters, each with objectives, explanations, real situations, warning signs, do and don't lists, prevention steps, takeaways and related tips
- A ten-question scenario quiz per chapter (100 questions total): shuffled options, instant feedback with explanations, results, mistake review and retry
- A working phishing message exercise on the homepage, and a scroll story showing the four stages of a scam
- **Cyber Lab** (`/lab`), three hands-on tools that run entirely in the browser:
  - Password Lab: estimates crack time by spotting common passwords, names, years, keyboard runs and leetspeak, and generates passphrases with `crypto.getRandomValues`
  - Link X-ray: shows the real owner of a link and flags lookalike brands, `@` tricks, IP hosts, shorteners, free hosting and risky file downloads. It never opens the link
  - Scam or Safe: a swipeable game of 14 realistic messages that highlights the clues after each answer
- **Get help wizard** on the Report page: danger check, then a step-by-step checklist for what happened
- **Class mode**: any quiz can be presented full-screen to a class with reveal, timer and keyboard controls
- **Certificate**: unlocks after scoring 70% or more in every chapter quiz; printable, with the name kept on the device
- Safety tips (with a tip of the day), ethical hacking awareness, cybercrime reporting guidance for India, an About page, and draft Privacy and Terms pages
- An admin dashboard (passphrase protected) for editing chapters and quiz questions and viewing anonymous quiz statistics

## Stack

| Part | Choice |
| --- | --- |
| Frontend | React 18, React Router 7, Vite 6, plain CSS with design tokens |
| Backend (production) | Cloudflare Pages Functions (`functions/api/[[path]].js`) with Cloudflare D1 |
| Backend (local) | Node.js 20+ and Express 4 (`server/`) with a JSON file store |
| Shared | `shared/content` (lessons, quizzes, tips) and `shared/validate.js`, used by both backends |

Both backends serve the same API. `npm run test:functions` checks the Cloudflare one against a real SQLite database.

## Deploy to Cloudflare Pages

1. In the Cloudflare dashboard, open **Workers & Pages**, create a **Pages** project and connect this GitHub repository.
2. Build settings: framework preset **None**, build command `npm run build`, output directory `dist`.
3. Create a D1 database (**Storage & Databases → D1**), for example `cybersafe`.
4. In the Pages project, **Settings → Bindings**, add a **D1 database** binding with the variable name `DB`.
5. In **Settings → Variables and Secrets**, add two secrets: `ADMIN_PASSWORD` (12+ characters) and `SESSION_SECRET` (32+ random characters).
6. Redeploy. The tables and the ten chapters are created automatically on the first API request.

Every push to `main` deploys again. No R2 bucket or separate Worker is needed.

## Setup

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env    # then set ADMIN_PASSWORD and SESSION_SECRET
npm run dev             # API on :4000, site on http://localhost:5173
```

Production:

```bash
npm run build
NODE_ENV=production npm start   # serves the built site and API on :4000
```

Other scripts:

- `npm run check:content` validates every chapter: structure, at least ten questions, four distinct options, valid answers, known tip ids, and no en or em dashes.

### Admin

The admin area at `/admin` is disabled until `ADMIN_PASSWORD` (at least 12 characters) is set in `.env`. `SESSION_SECRET` signs the session cookie; without it, a random secret is used and admins are signed out whenever the server restarts.

Editing a chapter in the admin area changes `server/data/db.json`, not the files in `shared/content`. Delete `db.json` to reset to the built-in content.

### Windows note

`package.json` overrides Rollup with `@rollup/wasm-node`, because Windows Smart App Control blocked Rollup's native binary on the development machine. The WebAssembly build behaves the same and is slightly slower.

npm 11+ blocks dependency install scripts unless approved. `allowScripts` in `package.json` approves only esbuild's postinstall, which checks its platform binary. When a Vite upgrade brings a new esbuild version, run `npm install-scripts approve esbuild` again.

## Privacy by design

- No student accounts, names or contact details.
- Quiz progress is stored only in the browser (`localStorage`).
- The server stores anonymous results only: chapter, correct or incorrect per question, and time. The server grades answers itself instead of trusting a score sent by the browser.
- If the API cannot be reached, the site falls back to the built-in lessons and says so.

## Folder structure

```
client/            React app (Vite root)
  src/components/  Header, Footer, Layout, QuizQuestion, MessageInspector, icons
  src/pages/       One file per route, admin/ for the dashboard and editor
  src/lib/         API client, content loading, local progress, quiz helpers
  src/styles/      global.css (tokens and shared components) and per-page CSS
server/            Express API, auth, rate limiting, statistics, JSON store
shared/            Lesson content, tips, homepage facts, validation
scripts/           Dev runner and content checker
```
