# Echo Desktop Messenger

**Echo** is a full-stack, Windows-ready desktop messenger.

Tagline: **“A calmer way to stay close.”**

## Stack
- Desktop: Electron + React + TypeScript + Tailwind + Zustand + Framer Motion + lucide-react
- Backend: Node.js + Express + TypeScript + Socket.IO + Prisma + PostgreSQL + JWT + bcrypt + Multer
- Packaging: electron-builder (Windows executable)

## Monorepo layout
```text
.
├─ desktop/                 # Electron app (main + preload + React renderer)
├─ server/                  # Express API + Socket.IO + Prisma
├─ shared/                  # Shared TS types
├─ docker-compose.yml       # PostgreSQL container
├─ .env.example             # Required env vars
└─ package.json             # workspace scripts
```

## .env variables
Create a root `.env` from `.env.example`:

```bash
DATABASE_URL="postgresql://echo:echo@localhost:5432/echo?schema=public"
PORT=4000
JWT_ACCESS_SECRET="replace-with-strong-access-secret"
JWT_REFRESH_SECRET="replace-with-strong-refresh-secret"
JWT_ACCESS_EXPIRES="15m"
JWT_REFRESH_EXPIRES_DAYS=14
CORS_ORIGIN="http://localhost:5173"
UPLOAD_DIR="./uploads"
VITE_API_BASE_URL="http://localhost:4000/api"
VITE_SOCKET_URL="http://localhost:4000"
```

## Local run (Windows 10/11)
1. Install Node.js 20+ and Docker Desktop.
2. In repo root:
   ```bash
   npm install
   docker compose up -d
   npm run prisma:migrate
   npm run prisma:seed
   npm run dev
   ```
3. Echo desktop opens (Electron). If not, open a second terminal and run:
   ```bash
   npm run dev -w desktop
   ```

## Build + package Windows executable
```bash
npm run build
npm run dist
```
Output is generated in:
- `desktop/release/` (NSIS installer `.exe`)

## Demo test accounts (after seed)
Password for all demo users: `password123`
- `maya@echo.app` (username: `maya`)
- `leo@echo.app` (username: `leo`)
- `nora@echo.app` (username: `nora`)

## API overview
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/auth/me`
- `GET /api/users/search?q=`
- `PUT /api/users/profile`
- `POST /api/users/avatar`
- `GET /api/conversations/list`
- `POST /api/conversations/create`
- `GET /api/conversations/:id/messages`
- `POST /api/conversations/:id/messages`
- `POST /api/uploads/attachment`

## Realtime events
- `conversation:join`
- `message:send`
- `message:new`
- `typing`
- `presence:update`

## Troubleshooting
- If Prisma client errors: run `npm run prisma:generate -w server`.
- If Electron window is blank: verify `VITE_API_BASE_URL` and `VITE_SOCKET_URL` in root `.env`.
- If postgres connection fails: `docker compose ps` then inspect port `5432` availability.
