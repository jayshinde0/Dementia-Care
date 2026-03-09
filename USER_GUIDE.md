# 📚 Complete User Guide - Dementia Care System

## 🌐 System URLs

### On Computer (Localhost)
- **Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### On Phone (Same WiFi Network)
- **Dashboard**: http://192.168.1.37:3000
- **Backend API**: http://192.168.1.37:8000
- **API Documentation**: http://192.168.1.37:8000/docs

---

## 👥 User Accounts

### 1. CAREGIVER ACCOUNT
**Login Credentials:**
- Email: `admin@dementia.com`
- Password: `admin123`
- Role: Select "Caregiver" button

**What You Can Do:**
- Monitor all assigned patients
- View patient activities and health data
- Receive and manage alerts
- View AI-powered insights and risk predictions
- Track patient behavior patterns
- Manage reminders and medications
- Access analytics dashboard

### 2. PATIENT ACCOUNT
**Login Credentials:**
- Email: `john@patient.com`
- Password: `patient123`
- Role: Select "Patient" button

**What You Can Do:**
- View your daily reminders
- See your activity history
- Press emergency SOS button
- Track your health metrics
- Access quick action buttons
- View your care plan

---

## 📱 Available Dashboards

### 1. CAREGIVER DASHBOARD
**URL**: http://localhost:3000 (or http://192.168.1.37:3000 on phone)

**Login Steps:**
1. Go to the URL
2. Click "Caregiver" button (should turn blue)
3. Enter: `admin@dementia.com`
4. Enter: `admin123`
5. Click "Sign In"

**Dashboard Features:**

#### Main Dashboard Page
- **My Patients**: Shows all patients assigned to you
  - Currently shows: John Smith (1 patient)
  - Click on patient card to see details
- **Recent Activities**: Latest patient activities
- **Alerts**: Important notifications
- **Quick Stats**: Overview of patient status

#### Patient Details Page
- Click on any patient card to view:
  - Personal information
  - Health metrics
  - Activity timeline
  - Medication schedule
  - AI risk assessment
  - Behavior patterns

#### Alerts Page
- View all system alerts
- Filter by priority (High, Medium, Low)
- Mark alerts as read/resolved
- Emergency notifications

#### Analytics Page
- Patient behavior trends
- Activity patterns over time
- Health metrics graphs
- AI-powered insights
- Risk prediction charts

---

### 2. PATIENT DASHBOARD
**URL**: http://localhost:3000 (or http://192.168.1.37:3000 on phone)

**Login Steps:**
1. Go to the URL
2. Click "Patient" button (should turn blue)
3. Enter: `john@patient.com`
4. Enter: `patient123`
5. Click "Sign In"

**Dashboard Features:**

#### Home Screen
- **Welcome Message**: Personalized greeting
- **Emergency Button**: Large red SOS button
- **Today's Reminders**: 
  - Medication reminders
  - Appointment reminders
  - Daily tasks
- **Recent Activities**: Your activity history
- **Quick Actions**:
  - 💊 Medications
  - 🎮 Brain Games
  - ❤️ Health Tracking
  - 📞 Emergency Contacts

---

## 🔧 API Documentation Dashboard

**URL**: http://localhost:8000/docs

**What It Shows:**
- All available API endpoints
- Request/response formats
- Try out APIs directly
- Authentication methods

**Useful For:**
- Testing API calls
- Creating new accounts
- Linking patients to caregivers
- Debugging issues
- Understanding data structure

---

## 📊 Sample Data Already in System

### Current Patient: John Smith
- **User ID**: 69aee02a1e743ef043fef3fb
- **Email**: john@patient.com
- **Age**: 75
- **Address**: 123 Oak Street, Springfield
- **Linked to**: Admin Caregiver

### Current Caregiver: Admin Caregiver
- **User ID**: 69aedffe1e743ef043fef3fa
- **Email**: admin@dementia.com
- **Patients**: 1 (John Smith)

### Sample Reminders for John Smith:
1. **Medication Reminder**
   - Time: 8:00 AM
   - Description: Take morning medication
   
2. **Lunch Reminder**
   - Time: 12:00 PM
   - Description: Time for lunch

---

## 🎯 How to Use Each Feature

### For Caregivers:

#### 1. View Patient List
- Login as caregiver
- Main dashboard shows "My Patients (1)"
- See John Smith's card with basic info

#### 2. View Patient Details
- Click on John Smith's card
- See detailed information:
  - Personal details
  - Recent activities
  - Health metrics
  - Reminders
  - AI insights

#### 3. Check Alerts
- Click "Alerts" in sidebar
- View all notifications
- Filter by priority
- Mark as resolved

#### 4. View Analytics
- Click "Analytics" in sidebar
- See behavior patterns
- View health trends
- Check AI predictions

### For Patients:

#### 1. View Reminders
- Login as patient
- See "Today's Reminders" section
- Check medication times
- View task status

#### 2. Emergency SOS
- Click large red "EMERGENCY" button
- Alert sent to all caregivers
- Emergency contacts notified

#### 3. View Activities
- See "Recent Activities" section
- Track your daily activities
- View completion status

#### 4. Quick Actions
- Click any quick action button:
  - Medications: View med schedule
  - Brain Games: Cognitive exercises
  - Health: Track vitals
  - Contacts: Emergency numbers

---

## 🆕 Creating New Accounts

### Method 1: Using API Documentation
1. Go to http://localhost:8000/docs
2. Find "POST /api/auth/register"
3. Click "Try it out"
4. Enter data (see examples below)
5. Click "Execute"

### Method 2: Using PowerShell
```powershell
# Create new caregiver
$body = @{
    email = "nurse@hospital.com"
    password = "nurse123"
    name = "Nurse Jane"
    role = "caregiver"
    phone = "5551234567"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/api/auth/register" -Method Post -Body $body -ContentType "application/json"

# Create new patient
$body = @{
    email = "mary@patient.com"
    password = "mary123"
    name = "Mary Johnson"
    role = "patient"
    phone = "5559876543"
    age = 78
    address = "456 Elm Street"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

---

## 🔗 Linking Patients to Caregivers

### Using API Documentation:
1. Go to http://localhost:8000/docs
2. Find "POST /api/caregivers/{caregiver_id}/patients/{patient_id}"
3. Enter caregiver_id (from registration response)
4. Enter patient_id (from registration response)
5. Click "Execute"

### Using PowerShell:
```powershell
$caregiverId = "69aedffe1e743ef043fef3fa"
$patientId = "69aee02a1e743ef043fef3fb"
$token = "your_caregiver_token_here"

Invoke-RestMethod -Uri "http://localhost:8000/api/caregivers/$caregiverId/patients/$patientId" -Method Post -Headers @{Authorization="Bearer $token"}
```

---

## 📝 Creating Reminders

### Using API Documentation:
1. Go to http://localhost:8000/docs
2. Find "POST /api/reminders"
3. Click "Try it out"
4. Enter reminder data:

```json
{
  "patient_id": "69aee02a1e743ef043fef3fb",
  "title": "Evening Medication",
  "description": "Take blood pressure medication",
  "time": "20:00",
  "frequency": "daily",
  "active": true
}
```

---

## 🎮 Testing the System

### Test Scenario 1: Caregiver Monitoring
1. Login as caregiver
2. View patient list
3. Click on John Smith
4. Check his reminders
5. View his activities
6. Check analytics

### Test Scenario 2: Patient Daily Use
1. Login as patient
2. View today's reminders
3. Click emergency button (test)
4. Check recent activities
5. Explore quick actions

### Test Scenario 3: Create New Data
1. Go to API docs
2. Create new reminder
3. Create new activity
4. Refresh dashboard
5. See new data appear

---

## 🚀 Quick Start Checklist

- [ ] Backend running (http://localhost:8000)
- [ ] Dashboard running (http://localhost:3000)
- [ ] Can login as caregiver
- [ ] Can login as patient
- [ ] Can see patient list
- [ ] Can view patient details
- [ ] Can access from phone
- [ ] Emergency button works
- [ ] Reminders display correctly

---

## 📞 System Status Check

### Check Backend:
```powershell
curl http://localhost:8000/health
```
Should return: `{"status":"healthy"}`

### Check Dashboard:
Open browser: http://localhost:3000
Should show login page

### Check Database:
Backend logs should show: "Database connected and indexes created successfully"

---

## 🎯 Summary

**2 Dashboards Available:**
1. **Caregiver Dashboard** - Full monitoring and management
2. **Patient Dashboard** - Simplified patient interface

**Same URL for Both:**
- Computer: http://localhost:3000
- Phone: http://192.168.1.37:3000

**Just select your role at login!**

---

Everything is ready to use! 🎉
