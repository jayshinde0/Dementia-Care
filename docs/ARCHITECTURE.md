# System Architecture

## Overview

The Dementia Assistive Care System follows a three-layer architecture designed for scalability, maintainability, and security.

```
┌─────────────────────────────────────────────────────────┐
│                    Layer 1: User Interfaces              │
├─────────────────────────────────────────────────────────┤
│  Patient Mobile App (React Native)                       │
│  - Large buttons, voice prompts                          │
│  - GPS tracking, emergency SOS                           │
│  - Reminders, tasks, health tracking                     │
│                                                          │
│  Caregiver Dashboard (React + Tailwind)                  │
│  - Real-time monitoring                                  │
│  - Alert management                                      │
│  - Analytics and insights                                │
└─────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────┐
│           Layer 2: Application & AI Logic                │
├─────────────────────────────────────────────────────────┤
│  Backend API (FastAPI)                                   │
│  - RESTful endpoints                                     │
│  - Authentication & authorization                        │
│  - Business logic                                        │
│                                                          │
│  AI Modules (Python + Scikit-learn)                      │
│  - Behavior pattern analysis                             │
│  - Anomaly detection                                     │
│  - Risk prediction                                       │
│  - Care assistant insights                               │
│                                                          │
│  Notification Engine (Firebase)                          │
│  - Push notifications                                    │
│  - Alert delivery                                        │
└─────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────┐
│              Layer 3: Data Layer                         │
├─────────────────────────────────────────────────────────┤
│  MongoDB Database                                        │
│  - Patients collection                                   │
│  - Caregivers collection                                 │
│  - Activities collection                                 │
│  - Reminders collection                                  │
│  - Alerts collection                                     │
│  - Health records collection                             │
│  - Location history collection                           │
└─────────────────────────────────────────────────────────┘
```

## Component Details

### Patient Mobile App
- **Technology**: React Native with Expo
- **Key Libraries**: 
  - expo-location (GPS tracking)
  - expo-notifications (push notifications)
  - expo-speech (voice feedback)
  - react-navigation (routing)
- **Features**:
  - Elderly-friendly UI (large buttons, simple navigation)
  - Voice-enabled reminders
  - Emergency SOS button
  - Background location tracking
  - Offline capability

### Caregiver Dashboard
- **Technology**: React.js with Tailwind CSS
- **Key Libraries**:
  - react-router-dom (routing)
  - recharts (data visualization)
  - axios (API calls)
- **Features**:
  - Multi-patient monitoring
  - Real-time alerts
  - Analytics dashboards
  - Activity logs
  - AI insights display

### Backend API
- **Technology**: Python FastAPI
- **Architecture Pattern**: RESTful API
- **Key Components**:
  - Router modules (auth, patients, caregivers, reminders, activities, alerts, ai)
  - Authentication middleware (JWT)
  - Database connection management
  - Error handling
- **Security**:
  - JWT authentication
  - Password hashing (bcrypt)
  - CORS configuration
  - Input validation

### AI Modules

#### 1. Behavior Pattern Analysis
- Analyzes daily routines
- Identifies peak activity hours
- Tracks medication schedules
- Calculates completion rates

#### 2. Anomaly Detection
- Detects low activity periods
- Identifies missed medications
- Flags irregular sleep patterns
- Monitors inactivity

#### 3. Risk Prediction
- Calculates overall risk score (0-100)
- Assesses multiple risk factors
- Predicts wandering probability
- Evaluates medication adherence

#### 4. AI Care Assistant
- Generates natural language insights
- Provides actionable recommendations
- Summarizes patient status
- Identifies trends

### Database Schema

#### Patients Collection
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  name: String,
  age: Number,
  phone: String,
  address: String,
  emergency_contact: String,
  caregiver_ids: [String],
  safe_zone: {
    latitude: Number,
    longitude: Number,
    radius: Number
  },
  created_at: DateTime
}
```

#### Caregivers Collection
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  name: String,
  phone: String,
  patient_ids: [String],
  created_at: DateTime
}
```

#### Reminders Collection
```javascript
{
  _id: ObjectId,
  patient_id: String,
  type: String (medication|meal|appointment|task),
  title: String,
  description: String,
  scheduled_time: String,
  repeat_days: [Number],
  voice_enabled: Boolean,
  active: Boolean,
  created_at: DateTime
}
```

#### Activities Collection
```javascript
{
  _id: ObjectId,
  patient_id: String,
  activity_type: String,
  description: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  completed: Boolean,
  timestamp: DateTime
}
```

#### Alerts Collection
```javascript
{
  _id: ObjectId,
  patient_id: String,
  caregiver_ids: [String],
  type: String,
  title: String,
  message: String,
  severity: String (low|medium|high|critical),
  acknowledged: Boolean,
  created_at: DateTime
}
```

## Data Flow

### 1. Patient Activity Logging
```
Mobile App → POST /api/activities → Backend → MongoDB
                                   ↓
                            AI Analysis (async)
                                   ↓
                            Alert Generation (if needed)
                                   ↓
                            Firebase Notification → Caregiver
```

### 2. Emergency Alert Flow
```
SOS Button Press → Get GPS Location → POST /api/alerts/emergency
                                              ↓
                                        Create Alert in DB
                                              ↓
                                    Notify All Caregivers
                                              ↓
                                    Firebase Push Notification
```

### 3. AI Insight Generation
```
Dashboard Request → GET /api/ai/care-insights/{patient_id}
                                   ↓
                        Fetch Activities, Alerts, Health Records
                                   ↓
                        Run AI Analysis Algorithms
                                   ↓
                        Generate Natural Language Insights
                                   ↓
                        Return JSON Response
```

## Security Architecture

### Authentication Flow
```
1. User Login → POST /api/auth/login
2. Verify Credentials (bcrypt)
3. Generate JWT Token
4. Return Token to Client
5. Client Stores Token (localStorage/AsyncStorage)
6. Include Token in All Subsequent Requests
7. Backend Validates Token on Each Request
```

### Authorization
- Role-based access control (patient/caregiver)
- Patient-caregiver linking
- Resource ownership validation
- Secure data isolation

## Scalability Considerations

### Horizontal Scaling
- Stateless API design
- JWT-based authentication (no server-side sessions)
- MongoDB sharding support
- Load balancer ready

### Performance Optimization
- Database indexing on frequently queried fields
- Async operations for AI processing
- Caching strategies for frequently accessed data
- Pagination for large datasets

### Monitoring
- API endpoint logging
- Error tracking
- Performance metrics
- User activity analytics

## Deployment Architecture

### Development
```
Backend: localhost:8000
Dashboard: localhost:3000
Mobile: Expo Dev Server
Database: Local MongoDB
```

### Production (Recommended)
```
Backend: Render/Railway/Heroku
Dashboard: Vercel/Netlify
Mobile: Expo Build → Google Play Store
Database: MongoDB Atlas
```

## Technology Stack Summary

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Mobile App | React Native + Expo | Cross-platform patient app |
| Dashboard | React + Tailwind CSS | Caregiver web interface |
| Backend | Python FastAPI | RESTful API server |
| Database | MongoDB | NoSQL data storage |
| AI/ML | Scikit-learn, Pandas, NumPy | Behavior analysis & predictions |
| Authentication | JWT + bcrypt | Secure user authentication |
| Notifications | Firebase Cloud Messaging | Push notifications |
| Maps | Google Maps API | Location tracking |
| Charts | Recharts | Data visualization |
