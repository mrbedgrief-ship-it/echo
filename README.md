# Echo — Messenger MVP

Echo is a mobile-first, emotionally intelligent messenger concept built as a polished frontend MVP.

## Tech stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui-style component primitives
- lucide-react icons
- Framer Motion microinteractions
- Zustand state with localStorage persistence
- Local seeded mock data only

## Run locally
```bash
npm install
npm run dev
```
Then open http://localhost:3000.

## Build / quality checks
```bash
npm run typecheck
npm run build
```

## Scripts
- `npm run dev` — starts development server.
- `npm run build` — builds production bundle.
- `npm run start` — runs production server.
- `npm run lint` — lint checks with Next.js ESLint config.
- `npm run typecheck` — TypeScript validation.

## Demo notes
- No authentication required.
- No backend, no DB.
- Mock conversations, insights, messages, and relationship-space content are seeded from `data/mock.ts`.

## App sections
- Onboarding (`/`)
- Home / Conversations (`/home`)
- Conversation threads (`/conversations/[id]`)
- Relationship Space (`/relationship-space/[id]`)
- Compose with Context (`/compose`)
- Insights (`/insights`)
- Settings (`/settings`)

## Extending to a real backend
1. Replace `data/mock.ts` with API repository adapters.
2. Add auth (NextAuth/Auth.js or custom JWT flow).
3. Move Zustand writes to optimistic mutations with server reconciliation.
4. Add message delivery scheduler service for timing options.
5. Add vector/memory storage for relationship context and AI-assisted rewrites.
