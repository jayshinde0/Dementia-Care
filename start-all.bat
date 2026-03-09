@echo off
echo ========================================
echo   Dementia Care System - Start All
echo ========================================
echo.
echo Starting all services...
echo.

echo [1/3] Starting Backend API...
start "Backend API" cmd /k "cd backend && venv\Scripts\python.exe main.py"
timeout /t 3 /nobreak > nul

echo [2/3] Starting Dashboard...
start "Dashboard" cmd /k "cd dashboard && npm start"
timeout /t 3 /nobreak > nul

echo [3/3] Starting Landing Page...
start "Landing Page" cmd /k "cd landing-react && set PORT=3001 && npm start"

echo.
echo ========================================
echo   All Services Started!
echo ========================================
echo.
echo Backend API:    http://localhost:8000
echo Dashboard:      http://localhost:3000
echo Landing Page:   http://localhost:3001
echo API Docs:       http://localhost:8000/docs
echo.
echo To start mobile app:
echo   cd mobile
echo   npm start
echo.
echo Press any key to exit this window...
echo (Services will continue running in separate windows)
pause > nul
