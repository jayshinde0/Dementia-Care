# 📱 Mobile App Setup Guide

## ✅ SDK Upgrade Complete

Your mobile app has been upgraded to SDK 51 (stable version with new architecture disabled)!

---

## 🚀 Quick Start

### 1. Install Expo Go on Your Phone
- **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

### 2. Start Backend (Required)
```bash
cd backend
venv\Scripts\python.exe main.py
```
Backend must be running on: http://192.168.1.37:8000

### 3. Start Mobile App
```bash
cd mobile
npm start
```

Or use the batch file:
```bash
cd mobile
start-mobile.bat
```

### 4. Scan QR Code
- Open Expo Go app on your phone
- Scan the QR code shown in terminal
- App will load on your phone!

---

## 📋 Prerequisites

### Required:
- ✅ Node.js 20.x (you have v20.20.1)
- ✅ Expo Go app on phone (SDK 50-51 compatible)
- ✅ Phone and computer on same WiFi network
- ✅ Backend running on 192.168.1.37:8000

### Network Setup:
Your computer IP: `192.168.1.37`

Make sure Windows Firewall allows:
- Port 8000 (Backend API)
- Port 8081 or 8082 (Expo Metro Bundler)

---

## 🔧 What Was Changed

### SDK Upgrade (50 → 51):
```json
{
  "expo": "~51.0.0",
  "react": "18.2.0",
  "react-native": "0.74.5",
  "expo-build-properties": "~0.12.5",
  "expo-location": "~17.0.1",
  "expo-notifications": "~0.28.1",
  "expo-speech": "~12.0.2",
  "@react-native-async-storage/async-storage": "1.23.1",
  "react-native-gesture-handler": "~2.16.1",
  "react-native-maps": "1.14.0",
  "react-native-safe-area-context": "4.10.5",
  "react-native-screens": "~3.31.1"
}
```

**Note:** SDK 51 is more stable than SDK 54 and has better module compatibility.

### Files Created/Updated:
- ✅ `mobile/app.json` - Created with SDK 54 config
- ✅ `mobile/package.json` - Updated dependencies to SDK 54
- ✅ `mobile/start-mobile.bat` - New startup script
- ✅ Dependencies reinstalled

---

## 📱 Mobile App Features

### For Patients:
- 🏠 Home screen with welcome message
- 📅 Today's reminders
- 🚨 Emergency SOS button
- 🎯 Recent activities
- 💊 Medication tracking
- 📍 Location tracking
- 🔔 Push notifications

### Screens:
1. **Login** - Patient authentication
2. **Home** - Dashboard with quick actions
3. **Reminders** - Daily medication/activity reminders
4. **Activities** - Log and view activities
5. **Emergency** - One-tap SOS alert
6. **Profile** - Patient information
7. **Settings** - App preferences

---

## 🔍 Troubleshooting

### "Project is incompatible with this version of Expo Go"
✅ **FIXED!** Project upgraded to SDK 54

### QR Code Not Scanning?
- Make sure Expo Go app is updated to latest version
- Try typing the URL manually in Expo Go
- Check if phone and computer are on same WiFi

### "Network Error" in App?
- Verify backend is running: http://192.168.1.37:8000
- Check Windows Firewall settings
- Ensure IP address is correct (192.168.1.37)

### Metro Bundler Port Conflict?
If port 8081 is in use, Expo will ask to use 8082. Just press 'Y'.

### App Crashes on Startup?
1. Clear Expo cache: `npx expo start -c`
2. Reinstall dependencies: `npm install`
3. Check backend is running

---

## 🧪 Testing the App

### 1. Test Login:
- Email: `john@patient.com`
- Password: `patient123`

### 2. Test Features:
- ✅ View reminders
- ✅ Press emergency button
- ✅ Check activities
- ✅ Navigate between screens

### 3. Test Backend Connection:
- App should load patient data
- Reminders should appear
- Emergency button should send alert to caregiver

---

## 📊 App Architecture

```
mobile/
├── App.js                    # Main entry point
├── app.json                  # Expo configuration (SDK 54)
├── package.json              # Dependencies
├── metro.config.js           # Metro bundler config
└── src/
    ├── screens/              # All app screens
    │   ├── LoginScreen.js
    │   ├── HomeScreen.js
    │   ├── RemindersScreen.js
    │   ├── ActivitiesScreen.js
    │   ├── EmergencyScreen.js
    │   ├── ProfileScreen.js
    │   └── SettingsScreen.js
    └── components/           # Reusable components
```

---

## 🌐 API Endpoints Used

All API calls go to: `http://192.168.1.37:8000/api`

### Patient Endpoints:
- `POST /auth/login` - Login
- `GET /patients/{id}` - Get patient info
- `GET /reminders/patient/{id}` - Get reminders
- `GET /activities/patient/{id}` - Get activities
- `POST /alerts/emergency` - Send emergency alert

---

## 🔄 Development Workflow

### 1. Start Backend:
```bash
cd backend
venv\Scripts\python.exe main.py
```

### 2. Start Mobile App:
```bash
cd mobile
npm start
```

### 3. Make Changes:
- Edit files in `mobile/src/`
- App will hot-reload automatically
- Check terminal for errors

### 4. Test on Phone:
- Changes appear instantly
- Shake phone to open dev menu
- Press 'r' in terminal to reload

---

## 📦 Build for Production (Optional)

### Android APK:
```bash
npx expo build:android
```

### iOS IPA:
```bash
npx expo build:ios
```

Note: Requires Expo account and additional setup.

---

## 🎯 Quick Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo dev server |
| `npm start -- --clear` | Start with cache cleared |
| `npm start -- --tunnel` | Use tunnel (slower but works everywhere) |
| `npm start -- --lan` | Use LAN (faster, same network only) |

---

## ✅ Verification Checklist

Before using the mobile app:
- ✅ Node.js 20.x installed
- ✅ Expo Go app installed on phone
- ✅ Backend running on 192.168.1.37:8000
- ✅ Phone and computer on same WiFi
- ✅ Windows Firewall allows connections
- ✅ Mobile app dependencies installed
- ✅ SDK upgraded to 54

---

## 📞 Support

### Common Issues:
1. **SDK mismatch** → Already fixed (upgraded to SDK 54)
2. **Network errors** → Check backend is running
3. **QR code issues** → Update Expo Go app
4. **Port conflicts** → Use suggested alternative port

### Logs:
- Terminal shows Metro Bundler logs
- Phone shows app console logs
- Backend shows API request logs

---

**Your mobile app is now ready to use with Expo Go SDK 54!** 🎉

Scan the QR code and start testing on your phone!
