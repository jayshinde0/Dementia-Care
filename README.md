# 🏥 Dementia Care System

A comprehensive AI-powered healthcare platform for dementia patient care and caregiver support.

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[SETUP_GUIDE.md](SETUP_GUIDE.md)** | Complete installation and setup instructions |
| **[USER_GUIDE.md](USER_GUIDE.md)** | How to use all features and dashboards |
| **[MOBILE_APP_GUIDE.md](MOBILE_APP_GUIDE.md)** | Mobile app setup with Expo SDK 54 |
| **[NAVIGATION_GUIDE.md](NAVIGATION_GUIDE.md)** | Navigation flow between pages |
| **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** | Complete project architecture |
| **[LOGIN_CREDENTIALS.txt](LOGIN_CREDENTIALS.txt)** | Default login accounts |

---

## 🚀 Quick Start

### Option 1: Start All Services (Recommended)
```bash
start-all.bat
```

This will start:
- Backend API (port 8000)
- Dashboard (port 3000)
- Landing Page (port 3001)

### Option 2: Start Services Individually

#### Backend
```bash
cd backend
venv\Scripts\python.exe main.py
```

#### Dashboard
```bash
cd dashboard
npm start
```

#### Landing Page
```bash
cd landing-react
set PORT=3001
npm start
```

### Access Points
- **Landing Page**: http://localhost:3001 (Start here!)
- **Dashboard**: http://localhost:3000 (Login & App)
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### Mobile/Phone Access
Replace `localhost` with `192.168.1.37`:
- Landing: http://192.168.1.37:3001
- Dashboard: http://192.168.1.37:3000

---

## 👥 Default Accounts

| Role | Email | Password |
|------|-------|----------|
| **Caregiver** | `admin@dementia.com` | `admin123` |
| **Patient** | `john@patient.com` | `patient123` |

---

## 🎯 Features

### For Caregivers
- ✅ Monitor multiple patients
- ✅ Real-time alerts and notifications
- ✅ AI-powered risk predictions
- ✅ Behavior analytics
- ✅ Activity tracking
- ✅ Medication management

### For Patients
- ✅ Daily reminders
- ✅ Emergency SOS button
- ✅ Health tracking
- ✅ Activity logging
- ✅ Simplified interface

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React, Tailwind CSS |
| **Backend** | Python FastAPI |
| **Database** | MongoDB Atlas |
| **AI/ML** | Custom behavior analysis modules |

---

## 📁 Project Structure

```
dementia-care/
├── backend/                    # Python FastAPI backend
│   ├── ai_modules/            # AI/ML modules
│   ├── routers/               # API endpoints
│   └── main.py                # Entry point
│
├── dashboard/                  # React caregiver/patient dashboard
│   └── src/
│       ├── pages/             # Dashboard pages
│       └── components/        # Reusable components
│
├── landing-react/              # React landing page
│   └── src/
│       ├── pages/             # Landing pages (Home, About, Contact)
│       └── components/        # Navigation, Footer
│
├── mobile/                     # React Native mobile app (Expo SDK 54)
│   ├── App.js                 # Main entry
│   ├── app.json               # Expo config
│   └── src/screens/           # Mobile screens
│
├── docs/                       # Additional documentation
│   ├── API.md
│   ├── FEATURES.md
│   ├── ARCHITECTURE.md
│   └── AI_MODULES.md
│
├── start-all.bat              # Start all services
├── SETUP_GUIDE.md             # Installation guide
├── USER_GUIDE.md              # Usage guide
├── MOBILE_APP_GUIDE.md        # Mobile app setup
├── NAVIGATION_GUIDE.md        # Navigation flow
└── LOGIN_CREDENTIALS.txt      # Default accounts
```

---

## 🔧 Troubleshooting

See **[SETUP_GUIDE.md](SETUP_GUIDE.md#troubleshooting)** for common issues and solutions.

---

## 📞 Support

For detailed help:

1. **Installation Issues** → Check [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. **Usage Questions** → Check [USER_GUIDE.md](USER_GUIDE.md)
3. **API Errors** → Review backend logs
4. **Frontend Errors** → Check browser console (F12)

---

## 🎓 Getting Started

1. Read **[SETUP_GUIDE.md](SETUP_GUIDE.md)** to install and configure
2. Run `start-all.bat` to start all services
3. Visit **Landing Page** at http://localhost:3001
4. Click **"Get Started"** and login with credentials above
5. Read **[USER_GUIDE.md](USER_GUIDE.md)** to learn all features
6. Check **[NAVIGATION_GUIDE.md](NAVIGATION_GUIDE.md)** for navigation flow

---

## 🧭 Quick Navigation

```
Landing Page (localhost:3001)
    ↓ Click "Get Started"
Login Page (localhost:3000/login)
    ↓ Select Role & Login
Dashboard/Portal
    ↓ Click "Back to Home"
Landing Page (localhost:3001)
```

---

## 📸 Screenshots

### Caregiver Dashboard
Monitor patients, view alerts, and access analytics

### Patient Portal
Simple interface with reminders and emergency button

---

**Ready to help caregivers provide better care for dementia patients!** 🎉
