# 🚀 Dementia Care System - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Starting the System](#starting-the-system)
4. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- **Node.js** (v16 or higher): https://nodejs.org/
- **Python** (v3.8 or higher): https://www.python.org/
- **MongoDB Atlas Account** (free): https://www.mongodb.com/cloud/atlas

### System Requirements
- Windows 10/11
- 8GB RAM minimum
- Internet connection for initial setup

---

## Installation Steps

### Step 1: Install Dependencies

#### Backend (Python)
```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

#### Dashboard (React)
```powershell
cd dashboard
npm install --legacy-peer-deps
```

### Step 2: Configure MongoDB

1. **Get MongoDB Connection String**:
   - Go to https://cloud.mongodb.com/
   - Create a free cluster (if you haven't)
   - Click "Connect" → "Connect your application"
   - Copy the connection string

2. **Create `.env` file** in `backend` folder:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
DATABASE_NAME=dementia_care
SECRET_KEY=your-secret-key-here-change-this-in-production
```

Replace `username:password` with your MongoDB credentials.

### Step 3: Verify Installation

Check backend:
```powershell
cd backend
venv\Scripts\python.exe main.py
```

Should see: "Database connected and indexes created successfully"

Check dashboard:
```powershell
cd dashboard
npm start
```

Should open browser at http://localhost:3000

---

## Starting the System

### Quick Start (Recommended)

#### Option 1: Using Batch Files
1. Double-click `start-backend.bat`
2. Double-click `start-dashboard.bat`

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```powershell
cd backend
venv\Scripts\python.exe main.py
```

**Terminal 2 - Dashboard:**
```powershell
cd dashboard
npm start
```

### Verify System is Running

- Backend: http://localhost:8000/health → Should return `{"status":"healthy"}`
- Dashboard: http://localhost:3000 → Should show login page
- API Docs: http://localhost:8000/docs → Interactive API documentation

---

## Troubleshooting

### Backend Issues

#### Error: "ModuleNotFoundError: No module named 'fastapi'"
**Solution:**
```powershell
cd backend
venv\Scripts\python.exe -m pip install -r requirements.txt
```

#### Error: "ImportError: cannot import name '_QUERY_OPTIONS'"
**Solution:** Motor/PyMongo version conflict
```powershell
cd backend
venv\Scripts\python.exe -m pip install pymongo==4.6.1
```

#### Error: "Database connection failed"
**Solution:** Check your `.env` file:
- Verify MongoDB connection string is correct
- Ensure password doesn't contain special characters (or URL encode them)
- Check network/firewall settings

### Dashboard Issues

#### Error: "Cannot find module 'ajv/dist/compile/codegen'"
**Solution:**
```powershell
cd dashboard
npm install --legacy-peer-deps
```

#### Error: "Port 3000 is already in use"
**Solution:**
```powershell
# Kill the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

#### Error: "ERR_BLOCKED_BY_CLIENT" in browser
**Solution:** Disable ad blocker for localhost or use incognito mode

### Mobile Access Issues

#### Can't access from phone
**Solution:**
1. Find your computer's IP address:
```powershell
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.1.37)

2. Update all API URLs in dashboard to use your IP
3. Access from phone: http://YOUR_IP:3000

#### Login fails from phone
**Solution:** The code already handles this automatically. Just refresh the page.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Dementia Care System                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Frontend (React)          Backend (FastAPI)                 │
│  Port: 3000                Port: 8000                        │
│  ├─ Login                  ├─ Authentication                 │
│  ├─ Caregiver Dashboard    ├─ Patient Management            │
│  ├─ Patient Portal         ├─ Reminders API                 │
│  ├─ Alerts                 ├─ Activities API                │
│  ├─ Analytics              ├─ Alerts API                    │
│  └─ Patient Details        ├─ AI Modules                    │
│                            └─ Health Records                 │
│                                                               │
│                     Database (MongoDB Atlas)                 │
│                     ├─ patients                              │
│                     ├─ caregivers                            │
│                     ├─ reminders                             │
│                     ├─ activities                            │
│                     ├─ alerts                                │
│                     └─ health_records                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Default Accounts

### Caregiver Account
- Email: `admin@dementia.com`
- Password: `admin123`
- Features: Monitor patients, view alerts, analytics

### Patient Account
- Email: `john@patient.com`
- Password: `patient123`
- Features: View reminders, emergency button, activities

---

## Next Steps

After successful setup:
1. Read `USER_GUIDE.md` for detailed usage instructions
2. Test both caregiver and patient logins
3. Explore the API documentation at http://localhost:8000/docs
4. Create additional test accounts if needed

---

## Support

For issues not covered here:
1. Check backend terminal for error messages
2. Check browser console (F12) for frontend errors
3. Verify all services are running
4. Ensure MongoDB connection is active

---

## Quick Reference

### Start Commands
```powershell
# Backend
cd backend
venv\Scripts\python.exe main.py

# Dashboard
cd dashboard
npm start
```

### Stop Commands
- Press `Ctrl + C` in each terminal

### Reset Database
Delete collections in MongoDB Atlas and restart backend

### Clear Browser Cache
- Chrome: `Ctrl + Shift + Delete`
- Or use Incognito mode

---

System is ready to use! 🎉
