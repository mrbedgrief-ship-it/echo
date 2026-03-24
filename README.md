# Echo Desktop Messenger (Windows-first)

Echo is a real desktop messenger app with:
- Electron desktop client
- Express + Socket.IO backend
- Prisma ORM + persistent database
- Auth, conversations, realtime messages, profile/settings

Tagline: **A calmer way to stay close.**

---

## Quick Start for non-technical Windows users

### Prerequisites
1. Windows 10/11
2. Node.js 20+
3. (Optional) Docker Desktop if you want PostgreSQL container mode

### Recommended easiest flow (double-click)
1. **Double-click `setup.bat`**
2. Wait for it to complete
3. **Double-click `start.bat`**
4. Echo opens and server starts

### Build installer flow (double-click)
1. **Double-click `build.bat`**
2. Wait for build + packaging
3. Open **`dist/`** for installer/exe output

### Stop everything
- **Double-click `stop.bat`**

---

## What each script does

### `setup.bat`
- checks Node/npm
- creates `.env` from `.env.example` if missing
- installs all dependencies
- if Docker is running: starts compose services
- if Docker is unavailable: uses SQLite local mode
- runs Prisma generate + migrate + seed
- prints demo account credentials

### `start.bat`
- launches backend server and desktop app in separate terminal windows

### `build.bat`
- ensures dependencies exist
- runs project build
- packages Windows installer via electron-builder
- prints the final output location (`dist/`)

### `stop.bat`
- stops local Electron/Node processes
- runs `docker compose down`

---

## Local database behavior (simplified)
Default mode is **SQLite** for easiest setup:
- `DATABASE_URL="file:./server/prisma/echo.db"`
- No Docker required to run locally

Optional: use PostgreSQL by editing `.env` and using Docker Compose.

---

## Demo accounts (after setup seed)
Password for all:
- `maya@echo.app` / `password123`
- `leo@echo.app` / `password123`
- `nora@echo.app` / `password123`

---

## Project structure
```text
.
├─ setup.bat
├─ start.bat
├─ stop.bat
├─ build.bat
├─ .env.example
├─ docker-compose.yml
├─ desktop/   # Electron app
├─ server/    # API + Socket.IO + Prisma
└─ shared/    # shared types
```

---

## Developer commands (optional)
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
- If setup fails at npm install: check internet/proxy and retry.
- If app window is blank: ensure `start.bat` started both server and desktop windows.
- If auth fails after DB changes: run `setup.bat` again.
- If packaging fails: run `build.bat` as Administrator.
- If Docker is not running: ignore unless you explicitly want PostgreSQL mode.
