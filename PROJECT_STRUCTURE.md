# Project Structure

## Overview

The Dementia Care System consists of three main applications:

1. **Landing Page** (React) - Marketing website on port 3001
2. **Dashboard** (React) - Main application on port 3000
3. **Backend API** (FastAPI) - REST API on port 8000

---

## Directory Structure

```
dementia-care/
├── backend/                    # Python FastAPI Backend (Port 8000)
│   ├── ai_modules/            # AI/ML modules
│   │   ├── anomaly_detection.py
│   │   ├── behavior_analysis.py
│   │   ├── care_assistant.py
│   │   └── risk_prediction.py
│   ├── routers/               # API endpoints
│   │   ├── auth.py           # Authentication
│   │   ├── patients.py       # Patient management
│   │   ├── caregivers.py     # Caregiver management
│   │   ├── reminders.py      # Reminders API
│   │   ├── activities.py     # Activities tracking
│   │   ├── alerts.py         # Alerts system
│   │   └── ai.py             # AI insights
│   ├── venv/                  # Python virtual environment
│   ├── main.py                # FastAPI entry point
│   ├── database.py            # MongoDB connection
│   ├── models.py              # Pydantic models
│   ├── auth.py                # JWT authentication
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
│
├── dashboard/                  # React Dashboard (Port 3000)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js      # Login page
│   │   │   ├── Dashboard.js  # Caregiver dashboard
│   │   │   ├── PatientHome.js # Patient interface
│   │   │   ├── PatientDetails.js
│   │   │   ├── Alerts.js
│   │   │   └── Analytics.js
│   │   ├── components/
│   │   │   └── Sidebar.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
│
├── landing-react/              # React Landing Page (Port 3001)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.js       # Main landing page
│   │   │   ├── About.js      # About page
│   │   │   ├── Contact.js    # Contact form
│   │   │   └── Features.js   # Features showcase
│   │   ├── components/
│   │   │   ├── Navbar.js     # Navigation
│   │   │   └── Footer.js     # Footer
│   │   ├── services/
│   │   │   └── api.js        # API integration
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
├── mobile/                     # React Native Mobile App
│   ├── src/screens/
│   │   ├── LoginScreen.js
│   │   ├── HomeScreen.js
│   │   ├── RemindersScreen.js
│   │   ├── TasksScreen.js
│   │   ├── HealthTrackingScreen.js
│   │   ├── CognitiveGamesScreen.js
│   │   └── EmergencyScreen.js
│   ├── App.js
│   └── package.json
│
├── docs/                       # Documentation
│   ├── API.md                 # API documentation
│   ├── FEATURES.md            # Features guide
│   ├── ARCHITECTURE.md        # System architecture
│   ├── AI_MODULES.md          # AI modules documentation
│   └── SETUP.md               # Setup instructions
│
├── SETUP_GUIDE.md             # Complete setup guide
├── USER_GUIDE.md              # User manual
├── LOGIN_CREDENTIALS.txt      # Default login accounts
├── README.md                  # Project overview
│
├── start-all.bat              # Start all services
├── start-backend.bat          # Start backend only
├── start-dashboard.bat        # Start dashboard only
└── start-landing.bat          # Start landing page only
```

---

## Service Ports

| Service | Port | URL |
|---------|------|-----|
| Landing Page | 3001 | http://localhost:3001 |
| Dashboard | 3000 | http://localhost:3000 |
| Backend API | 8000 | http://localhost:8000 |
| API Docs | 8000 | http://localhost:8000/docs |

---

## Technology Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB Atlas
- **Authentication**: JWT
- **AI/ML**: Custom modules (NumPy, scikit-learn)

### Frontend (Dashboard)
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **HTTP Client**: Axios

### Frontend (Landing Page)
- **Framework**: React 18
- **Styling**: Custom CSS with CSS Variables
- **Routing**: React Router
- **HTTP Client**: Axios

### Mobile
- **Framework**: React Native
- **Navigation**: React Navigation
- **HTTP Client**: Axios

---

## API Integration

All frontend applications connect to the backend API at:
- **Local**: `http://localhost:8000/api`
- **Network**: `http://<YOUR_IP>:8000/api`

The API base URL is automatically determined based on the hostname.

---

## Database Schema

### Collections
- `patients` - Patient profiles and medical data
- `caregivers` - Caregiver profiles
- `reminders` - Medication and activity reminders
- `activities` - Patient activity logs
- `alerts` - System alerts and notifications
- `health_records` - Health metrics and records

---

## Authentication Flow

1. User submits credentials to `/api/auth/login`
2. Backend validates and returns JWT token
3. Frontend stores token in localStorage
4. Token included in Authorization header for protected routes
5. Backend validates token on each request

---

## Development Workflow

### Starting Development
```bash
# Start all services
start-all.bat

# Or start individually
start-backend.bat
start-dashboard.bat
start-landing.bat
```

### Making Changes

**Backend Changes:**
1. Edit files in `backend/`
2. Restart backend server
3. Changes take effect immediately

**Frontend Changes:**
1. Edit files in `dashboard/src/` or `landing-react/src/`
2. Hot reload automatically updates browser
3. No restart needed

---

## Deployment

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Dashboard
```bash
cd dashboard
npm install
npm run build
# Deploy build/ folder to hosting
```

### Landing Page
```bash
cd landing-react
npm install
npm run build
# Deploy build/ folder to hosting
```

---

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://...
DATABASE_NAME=dementia_care
SECRET_KEY=your-secret-key
```

### Frontend
No environment variables needed for local development.
For production, update API URLs in service files.

---

## Key Features by Application

### Landing Page
- Marketing content
- Feature showcase
- Contact form
- About information
- Links to dashboard

### Dashboard
- User authentication
- Caregiver monitoring interface
- Patient simplified interface
- Real-time alerts
- Analytics and insights
- Activity tracking

### Backend API
- RESTful endpoints
- JWT authentication
- MongoDB integration
- AI-powered insights
- Real-time data processing

---

## Next Steps

1. Read [SETUP_GUIDE.md](SETUP_GUIDE.md) for installation
2. Read [USER_GUIDE.md](USER_GUIDE.md) for usage
3. Check [docs/API.md](docs/API.md) for API reference
4. Review [docs/FEATURES.md](docs/FEATURES.md) for features

---

Last Updated: 2024
