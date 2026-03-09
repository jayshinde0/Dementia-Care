@echo off
echo ==========================================
echo Dementia Care System - Setup Script
echo ==========================================
echo.

echo Checking prerequisites...

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo X Python not found. Please install Python 3.8+
    exit /b 1
)
echo + Python found

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo X Node.js not found. Please install Node.js 16+
    exit /b 1
)
echo + Node.js found

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo X npm not found. Please install npm
    exit /b 1
)
echo + npm found

echo.
echo ==========================================
echo Setting up Backend...
echo ==========================================
cd backend

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing Python dependencies...
python -m pip install --upgrade pip
pip install -r requirements.txt

if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo + .env file created. Please update with your configuration.
)

cd ..

echo.
echo ==========================================
echo Setting up Dashboard...
echo ==========================================
cd dashboard

echo Installing dashboard dependencies...
npm install --legacy-peer-deps

cd ..

echo.
echo ==========================================
echo Setting up Mobile App...
echo ==========================================
cd mobile

echo Installing mobile app dependencies...
npm install

cd ..

echo.
echo ==========================================
echo + Setup Complete!
echo ==========================================
echo.
echo Next steps:
echo 1. Start MongoDB (if using local): mongod
echo 2. Update backend\.env with your configuration
echo 3. Start backend: cd backend ^&^& python main.py
echo 4. Start dashboard: cd dashboard ^&^& npm start
echo 5. Start mobile: cd mobile ^&^& npm start
echo.
echo See QUICKSTART.md for detailed instructions.
pause
