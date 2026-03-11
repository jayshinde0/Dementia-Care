@echo off
echo ============================================
echo Fixing Network Access for Dementia Care App
echo ============================================
echo.

echo Step 1: Adding Windows Firewall Rules...
echo.

REM Add firewall rule for backend (port 8000)
netsh advfirewall firewall delete rule name="Dementia Care Backend" >nul 2>&1
netsh advfirewall firewall add rule name="Dementia Care Backend" dir=in action=allow protocol=TCP localport=8000
echo [OK] Backend port 8000 firewall rule added

REM Add firewall rule for socket server (port 8001)
netsh advfirewall firewall delete rule name="Dementia Care Socket" >nul 2>&1
netsh advfirewall firewall add rule name="Dementia Care Socket" dir=in action=allow protocol=TCP localport=8001
echo [OK] Socket server port 8001 firewall rule added

REM Add firewall rule for Python
netsh advfirewall firewall delete rule name="Python for Dementia Care" >nul 2>&1
netsh advfirewall firewall add rule name="Python for Dementia Care" dir=in action=allow program="%CD%\backend\venv\Scripts\python.exe" enable=yes
echo [OK] Python firewall rule added

echo.
echo Step 2: Checking if ports are accessible...
echo.

REM Check if backend is running
netstat -an | findstr ":8000" >nul
if %errorlevel%==0 (
    echo [OK] Backend is running on port 8000
) else (
    echo [WARNING] Backend is not running on port 8000
    echo Please start the backend: start-backend.bat
)

REM Check if socket server is running
netstat -an | findstr ":8001" >nul
if %errorlevel%==0 (
    echo [OK] Socket server is running on port 8001
) else (
    echo [WARNING] Socket server is not running on port 8001
    echo Please start the socket server: start-socket-server.bat
)

echo.
echo ============================================
echo Network access configuration complete!
echo ============================================
echo.
echo Next steps:
echo 1. Restart your backend and socket server
echo 2. Test from mobile browser: http://192.168.1.37:8000/health
echo 3. If still not working, temporarily disable Windows Firewall to test
echo.
pause
