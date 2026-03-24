@echo off
setlocal ENABLEDELAYEDEXPANSION
cd /d "%~dp0"

color 0A
echo ============================================================
echo Echo Setup - Windows Quick Start
echo ============================================================

echo [1/8] Checking Node.js...
where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js is not installed. Install Node.js 20+ and run setup again.
  pause
  exit /b 1
)
node -v

echo [2/8] Checking npm...
where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: npm not found.
  pause
  exit /b 1
)

if not exist ".env" (
  echo [3/8] Creating .env from .env.example
  copy /Y ".env.example" ".env" >nul
) else (
  echo [3/8] .env already exists, keeping your values.
)

echo [4/8] Installing dependencies (this may take a few minutes)...
call npm install
if errorlevel 1 (
  echo ERROR: npm install failed.
  pause
  exit /b 1
)

set USE_DOCKER=0
where docker >nul 2>nul
if not errorlevel 1 (
  docker info >nul 2>nul
  if not errorlevel 1 set USE_DOCKER=1
)

if "%USE_DOCKER%"=="1" (
  echo [5/8] Docker detected - starting PostgreSQL container...
  docker compose up -d
  if errorlevel 1 (
    echo WARNING: Docker failed to start. Continuing with SQLite local database.
  ) else (
    echo Docker services started.
  )
) else (
  echo [5/8] Docker not detected/running. Using SQLite local mode (default).
)

echo [6/8] Generating Prisma client...
call npm run prisma:generate
if errorlevel 1 (
  echo ERROR: Prisma generate failed.
  pause
  exit /b 1
)

echo [7/8] Applying Prisma migrations...
call npm run prisma:migrate
if errorlevel 1 (
  echo ERROR: Prisma migration failed.
  pause
  exit /b 1
)

echo [8/8] Seeding demo data...
call npm run prisma:seed
if errorlevel 1 (
  echo ERROR: Prisma seed failed.
  pause
  exit /b 1
)

echo.
echo ============================================================
echo Setup complete! Next step:
echo   Double-click start.bat

echo Demo accounts:
echo   maya@echo.app / password123
echo   leo@echo.app  / password123
echo   nora@echo.app / password123
echo ============================================================
pause
exit /b 0
