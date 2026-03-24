@echo off
setlocal
cd /d "%~dp0"

echo Stopping Echo local processes...
taskkill /F /IM electron.exe >nul 2>nul
taskkill /F /IM node.exe >nul 2>nul

echo Stopping Docker services (if running)...
docker compose down >nul 2>nul

echo Done.
pause
exit /b 0
