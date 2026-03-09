@echo off
echo ========================================
echo   Starting React Landing Page
echo ========================================
echo.
echo Landing page will open at http://localhost:3001
echo.
echo Note: If port 3001 is busy, it will use the next available port
echo.

cd landing-react
set PORT=3001
npm start

pause
