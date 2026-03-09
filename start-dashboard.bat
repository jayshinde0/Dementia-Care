@echo off
echo ==========================================
echo Starting Dashboard
echo ==========================================
echo.

cd dashboard

echo Checking dependencies...
if not exist node_modules (
    echo Installing dependencies...
    npm install --legacy-peer-deps
)

echo.
echo Starting dashboard on http://localhost:3000
echo Press Ctrl+C to stop
echo.
npm start

pause
