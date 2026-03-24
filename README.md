# Echo Desktop Messenger (Windows-first)

Echo is a real desktop messenger app with local-friendly auth and realtime chat.

Tagline: **A calmer way to stay close.**

---

## Quick Start for non-technical Windows users

### Prerequisites
1. Windows 10/11
2. Node.js 20+
3. (Optional) Docker Desktop if you want PostgreSQL container mode

### Recommended easiest flow (double-click)
1. **Double-click `setup.bat`**
2. Wait for setup to complete
3. **Double-click `start.bat`**
4. Sign in with demo credentials or register a new account

### Build installer flow (double-click)
1. **Double-click `build.bat`**
2. Wait for build + packaging
3. Open **`dist/`** for the generated installer/exe

### Stop everything
- **Double-click `stop.bat`**

---

## Authentication behavior (simple local flow)
- Register immediately with: **username + email + password**
- No email verification
- No SMTP
- No external auth provider
- Login with either:
  - username + password, or
  - email + password
- Registration auto-logs in on success

---

## Demo credentials (guaranteed by seed)
- `demo` / `demo123` (email: `demo@echo.app`)
- `maya` / `maya123` (email: `maya@echo.app`)
- `leo` / `leo123` (email: `leo@echo.app`)

---

## What each script does

### `setup.bat`
- checks Node/npm
- creates `.env` from `.env.example` if missing
- installs dependencies
- starts Docker (if available)
- runs Prisma generate + migrate + seed
- prints demo credentials

### `start.bat`
- launches backend server and desktop app in separate terminals

### `build.bat`
- installs missing dependencies
- builds server + desktop
- packages Windows installer with electron-builder
- prints output location (`dist/`)

### `stop.bat`
- stops local Electron/Node processes
- runs `docker compose down`

---

## Local database behavior
Default mode is **SQLite** for easiest setup:
- `DATABASE_URL="file:./server/prisma/echo.db"`
- no Docker required

Optional PostgreSQL mode is available by changing `DATABASE_URL` in `.env` and using Docker Compose.

---

## Reset database if auth breaks
From project root, run:
```bash
npm run prisma:reset
npm run prisma:migrate
npm run prisma:seed
```

---

## Optional developer commands
```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
npm run build
npm run dist
```

---

## Troubleshooting
- If registration fails with duplicate: choose a new username/email.
- If login fails: verify username/email and password exactly.
- If app window is blank: ensure both server and desktop terminals are running.
- If packaging fails: run `build.bat` as Administrator.
