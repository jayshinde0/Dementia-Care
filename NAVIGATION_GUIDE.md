# 🧭 Navigation Guide

## Complete User Flow

### 1. Landing Page → Dashboard → Back to Landing

```
Landing Page (localhost:3001)
    ↓ Click "Get Started"
Dashboard Login (localhost:3000/login)
    ↓ Select Role & Login
Caregiver Dashboard OR Patient Portal
    ↓ Click "Back to Home" button
Landing Page (localhost:3001)
```

### 2. Navigation Buttons

#### From Landing Page:
- **"Get Started"** button → Takes you to Dashboard Login (localhost:3000)
- **"Learn More"** button → Scrolls to "How It Works" section
- **"Contact Us"** link → Goes to Contact page

#### From Dashboard Login:
- **"← Back to Home"** link → Returns to Landing Page (localhost:3001)
- **Role buttons** → Switch between Caregiver/Patient login

#### From Caregiver Dashboard:
- **Sidebar Menu**:
  - Dashboard → Main overview
  - Alerts → View all alerts
  - Analytics → Patient analytics
- **"🌐 Back to Home"** button → Returns to Landing Page
- **"Logout"** button → Logs out and returns to login

#### From Patient Portal:
- **"🌐 Home"** button → Returns to Landing Page
- **"Logout"** button → Logs out and returns to login

## URLs Reference

| Service | URL | Description |
|---------|-----|-------------|
| **Landing Page** | http://localhost:3001 | Marketing/info page |
| **Dashboard** | http://localhost:3000 | Login & main app |
| **Backend API** | http://localhost:8000 | REST API |
| **API Docs** | http://localhost:8000/docs | Interactive API documentation |

## Mobile/Phone Access

Replace `localhost` with your computer's IP address: `192.168.1.37`

| Service | Mobile URL |
|---------|-----------|
| Landing Page | http://192.168.1.37:3001 |
| Dashboard | http://192.168.1.37:3000 |
| Backend API | http://192.168.1.37:8000 |

## Login Credentials

### Caregiver Account
- **Email**: admin@dementia.com
- **Password**: admin123
- **Features**: Monitor patients, view alerts, analytics

### Patient Account
- **Email**: john@patient.com
- **Password**: patient123
- **Features**: View reminders, emergency button, activities

## Complete Navigation Flow

### For Caregivers:
1. Visit Landing Page (localhost:3001)
2. Click "Get Started"
3. Select "Caregiver" role
4. Login with caregiver credentials
5. View Dashboard with:
   - Stats cards (patients, alerts, reminders)
   - Recent alerts
   - Patient cards
6. Click patient card to view details
7. Use sidebar to navigate between pages
8. Click "Back to Home" to return to landing page
9. Click "Logout" to sign out

### For Patients:
1. Visit Landing Page (localhost:3001)
2. Click "Get Started"
3. Select "Patient" role
4. Login with patient credentials
5. View Patient Portal with:
   - Emergency button
   - Today's reminders
   - Recent activities
   - Quick action buttons
6. Click "Home" to return to landing page
7. Click "Logout" to sign out

## Design Consistency

Both Landing Page and Dashboard now share:
- Modern, clean white theme
- Smooth transitions and hover effects
- Consistent color scheme (blue primary, purple accents)
- Professional typography (Inter font)
- Responsive design for all screen sizes
- Rounded corners and soft shadows

## Troubleshooting Navigation

### "Back to Home" button not working?
- Make sure Landing Page is running on port 3001
- Check if you started all services with `start-all.bat`

### Can't access from phone?
- Ensure phone is on same WiFi network
- Use IP address (192.168.1.37) instead of localhost
- Check Windows Firewall allows connections on ports 3000, 3001, 8000

### Login redirects to wrong page?
- Clear browser cache and localStorage
- Make sure you selected correct role (Caregiver/Patient)
- Check browser console (F12) for errors
