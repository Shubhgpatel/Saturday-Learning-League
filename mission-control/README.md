# Mission Control

A free, public web app for running team problem-solving missions. It includes:

- **4 realistic missions.** Each one can be solved in 60–120 minutes and has a participant brief plus private facilitator notes.
- **A reusable Mystery Twist Deck.** It has 24 cards across 12 categories and 3 difficulty levels, with filters, random draws, no repeats until reset, and a reset button.
- **A session console.** It has a mission selector, a phase-based timer (60, 90 or 120 minutes), a phase progress tracker, a deliverables checklist, twist draws, and a team evaluation checklist.

The app is built with **Next.js 16 (App Router), TypeScript and Tailwind CSS 4**. There is no backend, database, paid API or sign-in. Every page is prerendered as static HTML, and session state (timer, draws, scores) is saved in each visitor's browser through `localStorage`.

All mission and twist content is also exported to [`CONTENT.md`](./CONTENT.md) for reading or printing.

---

## Features

| Area | What it does |
|---|---|
| Home | Hero, mission board with all 4 missions, the session shape, an overview of the deck |
| Mission page (`/missions/[id]`) | Full participant brief: situation, facts, problem statement, constraints, deliverables, roles, success criteria, session plan. A **Facilitator notes** tab appears only in Facilitator view: stakeholder script, likely Q&A, hidden facts, what to watch for, solution directions, pitfalls, debrief questions, suggested twists. |
| Twist deck (`/deck`) | Filter by category and difficulty, draw at random, no duplicate until the deck (or filtered selection) is exhausted, confirmed reset, draw history, browse every card |
| Session console (`/control`) | Mission selector, 60/90/120-minute rescaling, start/pause/resume, previous/next phase, add a minute, full-screen clock, overtime indicator, optional chime, phase tracker, deliverables checklist, the shared twist deck with suggested cards, team evaluation (up to 8 squads, 8 criteria scored 0–3, notes, copy results) |
| Participant / Facilitator view | A header switch. Participant view (the default) is safe for a projector. Facilitator view asks for confirmation before showing notes. |

> **Note:** Facilitator view separates what is shown on screen. It is **not** access control. The notes ship with the static site, so anyone who looks at the page source could find them. Don't put real secrets in the data files.

---

## Project structure

```
mission-control/
├── CONTENT.md                    # Generated: every mission + twist card in Markdown
├── README.md
├── next.config.ts
├── package.json
├── vitest.config.mts
├── scripts/
│   └── export-content.mts        # Regenerates CONTENT.md from src/data
└── src/
    ├── app/
    │   ├── layout.tsx            # Header, footer, skip link, facilitator provider
    │   ├── globals.css           # Design tokens (Tailwind @theme) and card styles
    │   ├── page.tsx              # Home
    │   ├── not-found.tsx
    │   ├── missions/[id]/page.tsx  # Static mission pages (generateStaticParams)
    │   ├── deck/page.tsx
    │   └── control/page.tsx
    ├── components/
    │   ├── FacilitatorProvider.tsx # View context + confirm-to-enable switch
    │   ├── SiteHeader.tsx          # Responsive nav with mobile menu
    │   ├── MissionTabs.tsx         # Participant brief / Facilitator notes tabs
    │   ├── TwistCardFace.tsx       # Manila twist card + difficulty marker
    │   ├── DeckConsole.tsx         # Filters, draw, reset, history, browse
    │   ├── SessionConsole.tsx      # Mission selector, deliverables, layout
    │   ├── SessionTimer.tsx        # Phase timer and tracker
    │   └── EvaluationPanel.tsx     # Team scoring
    ├── data/                     # ← All editable content lives here
    │   ├── types.ts
    │   ├── missions.ts           # The 4 missions + standard 7-phase plan
    │   ├── twists.ts             # The 24 twist cards
    │   └── evaluation.ts         # Evaluation criteria and score labels
    └── lib/
        ├── deck.ts               # Pure draw/filter logic (no duplicates)
        ├── timer.ts              # Phase rescaling + clock formatting
        ├── useLocalState.ts      # localStorage-backed state hook
        └── __tests__/            # Vitest unit tests
```

---

## Editing content

Everything the app shows comes from `src/data/`. You don't need to touch any components.

- **Change a mission:** edit its object in `src/data/missions.ts`. Participant-facing text goes under `brief`, and facilitator-only text goes under `facilitator`.
- **Add a mission:** append a new object with a unique `id`. Its page is generated automatically at build time. Update the "exactly 4 missions" test in `src/lib/__tests__/content.test.ts` if you change the count.
- **Add or edit twist cards:** edit `src/data/twists.ts`. Give each card a unique `id` (e.g. `T25`), one of the 12 categories, and a difficulty of `Minor`, `Moderate` or `Major`.
- **Change scoring criteria:** edit `src/data/evaluation.ts`.

After editing, run `npm run check`. The content tests catch missing fields, broken twist references, and missions outside the 60–120 minute range. Then run `npm run export:content` to refresh `CONTENT.md`.

---

## Local setup

Requirements: **Node.js 20.9 or newer** (Node 22 LTS recommended) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# open http://localhost:3000
```

## Testing and quality checks

```bash
npm test               # Vitest unit tests (deck logic, timer, content integrity)
npm run typecheck      # Generates route types, then runs tsc --noEmit
npm run lint           # ESLint (Next.js config)
npm run check          # All of the above + a production build
```

## Production build

```bash
npm run build          # Prerenders every page as static HTML
npm start              # Serve the production build at http://localhost:3000
```

## Regenerate CONTENT.md

```bash
npm run export:content # Needs Node 22.18+ (runs the TypeScript script directly)
```

---

## Deploy to Vercel (GitHub → Vercel)

### 1. Put the code on GitHub

1. Create a new, empty repository on GitHub (e.g. `mission-control`). Don't add a README or .gitignore, because the project already has them.
2. In the project folder, run:

   ```bash
   git init
   git add .
   git commit -m "Mission Control: missions, twist deck and session console"
   git branch -M main
   git remote add origin https://github.com/<your-username>/mission-control.git
   git push -u origin main
   ```

   `node_modules/` and `.next/` are already excluded by `.gitignore`.

### 2. Import the repository into Vercel

1. Sign in at [vercel.com](https://vercel.com) with your GitHub account. The free Hobby plan is enough.
2. Click **Add New… → Project**.
3. Find your `mission-control` repository and click **Import**. If it isn't listed, use **Adjust GitHub App Permissions** to give Vercel access to it.
4. Vercel detects **Next.js** automatically. Leave the defaults as they are:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (or the `mission-control` folder, if you pushed a parent folder)
   - Build Command: `next build` (default)
   - Install Command: `npm install` (default)
   - Environment variables: **none needed**
5. Click **Deploy**. The first build takes about a minute.
6. When it finishes, Vercel shows your public URL, e.g. `https://mission-control-<something>.vercel.app`.

### 3. Make sure it's public

Production URLs on Vercel are public by default. If visitors are asked to log in to Vercel, open **Project → Settings → Deployment Protection** and make sure **Vercel Authentication** isn't applied to production. Then redeploy.

### 4. Updating

Every `git push` to `main` triggers a new production deployment automatically. Pushes to other branches get their own preview URLs.

### Alternative: deploy from the command line

```bash
npm i -g vercel
vercel          # first run links the project (answer the prompts)
vercel --prod   # deploy to production
```

---

## How to run a session

1. Open **Run a session** and pick a mission. Use **Run this mission** from a mission page to preselect it.
2. Put the **participant brief** on the projector, in Participant view.
3. On the facilitator's own screen, switch to **Facilitator view** to see the stakeholder script, hidden facts and suggested twists.
4. Start the timer. In the **Adapt** phase, the clock turns amber: draw a twist and read it aloud.
5. Tick off deliverables as squads produce them, and score each squad in **Team evaluation**. Use **Copy results** to paste the scores anywhere.
6. Reset the deck and timer before the next session.

## Browser support and accessibility

- Works in current Chrome, Edge, Firefox and Safari on desktop and mobile.
- Keyboard accessible, with visible focus rings, a skip link, live announcements for draws, and reduced-motion support.
- Difficulty is shown with bars as well as colour, so it doesn't rely on colour alone.
