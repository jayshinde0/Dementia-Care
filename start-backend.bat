@echo off
echo ==========================================
echo Starting Backend Server
echo ==========================================
echo.

cd backend

echo Checking if FastAPI is installed in venv...
venv\Scripts\python.exe -c "import fastapi; print('FastAPI version:', fastapi.__version__)" 2>nul
if %errorlevel% neq 0 (
    echo FastAPI not found. Installing dependencies...
    venv\Scripts\python.exe -m pip install -r requirements.txt
)

echo.
echo Starting server on http://localhost:8000
echo Press Ctrl+C to stop
echo.
venv\Scripts\python.exe main.py

pause
