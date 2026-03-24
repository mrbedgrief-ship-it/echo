@echo off
setlocal
cd /d "%~dp0"

echo Starting Echo server and desktop app...

start "Echo Server" cmd /k "cd /d %~dp0 && npm run dev:server"
timeout /t 2 /nobreak >nul
start "Echo Desktop" cmd /k "cd /d %~dp0 && npm run dev:desktop"

echo Echo is launching.
echo Use stop.bat to stop local services.
exit /b 0
