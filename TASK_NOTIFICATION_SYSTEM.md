# Task Notification System - Setup Complete

## System Overview
The task notification system allows caregivers to send real-time tasks/reminders to patient devices.

## How It Works
1. **Caregiver** sends task from dashboard (Send Task page)
2. **Backend** saves task to MongoDB database
3. **Mobile App** polls database every 5 seconds for new tasks
4. **Task Overlay** appears on patient device with voice announcement
5. **Auto-dismiss** after 8 seconds

## Current Status: ✅ IMPLEMENTED

### Backend (Port 8000)
- ✅ Task API endpoint: `/api/tasks/send`
- ✅ Get tasks endpoint: `/api/tasks/patient/{patient_id}`
- ✅ Mark delivered endpoint: `/api/tasks/{task_id}/delivered`
- ✅ Running on: http://172.17.30.107:8000

### Dashboard (Port 3000)
- ✅ Send Task page added to sidebar navigation
- ✅ Patient selection dropdown
- ✅ Task input with quick task buttons
- ✅ Success/error messaging
- ✅ Works with polling system (no socket dependency)

### Mobile App
- ✅ Task polling service (checks every 5 seconds)
- ✅ Task overlay component with animations
- ✅ Voice announcement using expo-speech
- ✅ Auto-dismiss after 8 seconds
- ✅ Logout button on home screen
- ✅ Manual "Check for Tasks Now" button for testing

### Socket Server (Port 8001) - OPTIONAL
- ✅ Running but not required
- ✅ Fallback to polling if socket fails
- Note: Socket connection blocked by network/firewall

## Network Configuration

### Current IP Address: 172.17.30.107

All services configured to use this IP:
- Backend API: http://172.17.30.107:8000
- Socket Server: http://172.17.30.107:8001
- Dashboard: http://localhost:3000

### Files Updated with Correct IP:
- ✅ mobile/src/services/taskPollingService.js
- ✅ mobile/src/services/socketService.js
- ✅ mobile/src/screens/LoginScreen.js
- ✅ mobile/src/screens/RemindersScreen.js
- ✅ mobile/src/screens/EmergencyScreen.js
- ✅ dashboard/src/pages/SendTask.js

## Testing the System

### Step 1: Verify Backend is Running
```bash
cd backend
python main.py
```
Should see: `Uvicorn running on http://0.0.0.0:8000`

### Step 2: Verify Mobile App is Logged In
- Open mobile app
- Login as patient: john@patient.com / patient123
- Should see home screen with "Check for Tasks Now" button

### Step 3: Send a Task
1. Open dashboard: http://localhost:3000
2. Login as caregiver: admin@dementia.com / admin123
3. Click "Send Task" in sidebar
4. Select "John Smith"
5. Type a task or use quick task
6. Click "Send to Patient"
7. Should see: "Task sent successfully! Patient will receive it within 5 seconds."

### Step 4: Verify Task Appears on Mobile
- Within 5 seconds, task overlay should appear
- Voice should read the task aloud
- Overlay auto-dismisses after 8 seconds

### Manual Test Button
- Click "🔍 Check for Tasks Now" on mobile home screen
- Check console for logs:
  - "Checking for tasks... Patient ID: [id]"
  - "Found X total task(s)"
  - "📬 Found X NEW undelivered task(s)"

## Troubleshooting

### Mobile App Not Receiving Tasks

**Check 1: Is polling service running?**
- Look for console log: "Starting task polling service..."
- Look for: "Checking for tasks... Patient ID: [id]" every 5 seconds

**Check 2: Is backend reachable?**
- On mobile browser, open: http://172.17.30.107:8000/health
- Should see: `{"status":"healthy"}`
- If not loading, check Windows Firewall

**Check 3: Is patient logged in?**
- Patient must be logged in for userId to be stored
- Check AsyncStorage has userId

**Check 4: Are tasks being created?**
- Check backend console for task creation logs
- Check MongoDB for tasks collection

### Windows Firewall Blocking Connections

**Option 1: Run firewall fix script**
```bash
# Run as Administrator
fix-network-access.bat
```

**Option 2: Manually add firewall rules**
```powershell
# Run in PowerShell as Administrator
New-NetFirewallRule -DisplayName "Dementia Care Backend" -Direction Inbound -LocalPort 8000 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "Dementia Care Socket" -Direction Inbound -LocalPort 8001 -Protocol TCP -Action Allow
```

**Option 3: Temporarily disable firewall**
- Windows Security → Firewall & network protection
- Turn off "Private network" firewall
- Test if tasks work
- Turn firewall back on and add proper rules

### Task Not Appearing

**Check mobile console for errors:**
- "Network Error" = Backend not reachable
- "API Error: 404" = Endpoint not found (restart backend)
- "No patient ID or token found" = User not logged in

**Check backend console:**
- Should see POST request to `/api/tasks/send`
- Should see task being saved to database

**Check dashboard console:**
- Should see "Task sent successfully"
- No errors in network tab

## Database Schema

### Tasks Collection
```javascript
{
  _id: ObjectId,
  patient_id: String,
  caregiver_name: String,
  task_text: String,
  created_at: DateTime,
  delivered: Boolean,
  delivered_at: DateTime (optional),
  acknowledged: Boolean
}
```

## API Endpoints

### POST /api/tasks/send
Send a new task to patient
```json
{
  "patient_id": "69aee02a1e743ef043fef3fb",
  "task_text": "Take your morning medication",
  "caregiver_name": "Admin Caregiver"
}
```

### GET /api/tasks/patient/{patient_id}
Get all tasks for a patient
```
Authorization: Bearer {token}
```

### PUT /api/tasks/{task_id}/delivered
Mark task as delivered
```
Authorization: Bearer {token}
```

## Files Modified

### Backend
- `backend/main.py` - Added tasks router
- `backend/routers/tasks.py` - Task endpoints
- `backend/socket_server.py` - Socket server (optional)

### Dashboard
- `dashboard/src/components/Sidebar.js` - Added Send Task menu item
- `dashboard/src/App.js` - Added Send Task route
- `dashboard/src/pages/SendTask.js` - Send Task page

### Mobile
- `mobile/App.js` - Task polling integration
- `mobile/src/services/taskPollingService.js` - Polling service
- `mobile/src/components/TaskOverlay.js` - Task overlay UI
- `mobile/src/screens/HomeScreen.js` - Added test button & logout
- `mobile/src/screens/LoginScreen.js` - Start polling on login

## Next Steps

1. ✅ System is fully implemented
2. ⏳ Test task delivery end-to-end
3. ⏳ Verify voice announcement works
4. ⏳ Remove test button after confirming it works
5. ⏳ Add proper error handling for production

## Production Considerations

- Remove "Check for Tasks Now" test button
- Add retry logic for failed API calls
- Add task history/archive feature
- Add push notifications for background delivery
- Implement proper authentication refresh
- Add analytics/logging for task delivery
- Consider reducing polling interval to 3 seconds for faster delivery

## Support

If tasks still not appearing:
1. Check all three consoles (backend, dashboard, mobile)
2. Verify IP address hasn't changed (run `ipconfig`)
3. Ensure all services are running
4. Check Windows Firewall settings
5. Test backend health endpoint from mobile browser

---

**System Status: READY FOR TESTING** ✅
