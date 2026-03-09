@echo off
echo ========================================
echo   Starting Mobile App (Fixed)
echo ========================================
echo.

cd mobile

echo Cleaning Expo cache...
if exist .expo rmdir /s /q .expo
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo.
echo Starting Expo with npx (modern CLI)...
echo Using tunnel mode to bypass Windows bugs
echo.
echo Once started:
echo 1. Install "Expo Go" app on your phone from Play Store/App Store
echo 2. Scan the QR code shown below
echo 3. The app will open in Expo Go
echo.
echo Login with: john@patient.com / patient123
echo.
echo Press Ctrl+C to stop
echo.

npx expo start --tunnel --go

pause
