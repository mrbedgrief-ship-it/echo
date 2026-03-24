@echo off
setlocal
cd /d "%~dp0"

color 0B
echo ============================================================
echo Echo Build - Windows Installer
echo ============================================================

where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js is not installed.
  pause
  exit /b 1
)

if not exist ".env" (
  echo Creating .env from template...
  copy /Y ".env.example" ".env" >nul
)

echo [1/4] Installing dependencies...
call npm install
if errorlevel 1 (
  echo ERROR: npm install failed.
  pause
  exit /b 1
)

echo [2/4] Generating Prisma client...
call npm run prisma:generate
if errorlevel 1 (
  echo ERROR: Prisma generate failed.
  pause
  exit /b 1
)

echo [3/4] Building server + desktop...
call npm run build
if errorlevel 1 (
  echo ERROR: build failed.
  pause
  exit /b 1
)

echo [4/4] Packaging Windows installer...
call npm run dist
if errorlevel 1 (
  echo ERROR: packaging failed.
  pause
  exit /b 1
)

echo.
echo Build complete!
echo Installer/output location:
echo   %~dp0dist
if exist "dist" dir /b "dist"
pause
exit /b 0
