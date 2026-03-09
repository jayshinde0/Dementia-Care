# API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication

All protected endpoints require Bearer token in header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "patient",
  "phone": "1234567890",
  "age": 75,
  "address": "123 Main St"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "patient"
}
```

### Patients

#### Get Patient
```http
GET /patients/{patient_id}
Authorization: Bearer <token>
```

#### Update Location
```http
POST /patients/{patient_id}/location
Authorization: Bearer <token>
Content-Type: application/json

{
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

#### Set Safe Zone
```http
PUT /patients/{patient_id}/safe-zone
Authorization: Bearer <token>
Content-Type: application/json

{
  "latitude": 37.7749,
  "longitude": -122.4194,
  "radius": 1000
}
```

### Reminders

#### Create Reminder
```http
POST /reminders
Authorization: Bearer <token>
Content-Type: application/json

{
  "patient_id": "patient_id",
  "type": "medication",
  "title": "Take Blood Pressure Medicine",
  "description": "Take 1 pill with water",
  "scheduled_time": "08:00",
  "repeat_days": [0, 1, 2, 3, 4, 5, 6],
  "voice_enabled": true
}
```

#### Get Patient Reminders
```http
GET /reminders/patient/{patient_id}
Authorization: Bearer <token>
```

#### Complete Reminder
```http
POST /reminders/{reminder_id}/complete
Authorization: Bearer <token>
```

### Activities

#### Log Activity
```http
POST /activities
Authorization: Bearer <token>
Content-Type: application/json

{
  "patient_id": "patient_id",
  "activity_type": "medication_taken",
  "description": "Took morning medication",
  "completed": true
}
```

#### Get Patient Activities
```http
GET /activities/patient/{patient_id}?days=7
Authorization: Bearer <token>
```

#### Get Activity Summary
```http
GET /activities/patient/{patient_id}/summary?days=7
Authorization: Bearer <token>
```

### Alerts

#### Create Emergency Alert
```http
POST /alerts/emergency
Authorization: Bearer <token>
Content-Type: application/json

{
  "patient_id": "patient_id",
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194
  }
}
```

#### Get Caregiver Alerts
```http
GET /alerts/caregiver/{caregiver_id}?acknowledged=false
Authorization: Bearer <token>
```

#### Acknowledge Alert
```http
PUT /alerts/{alert_id}/acknowledge
Authorization: Bearer <token>
```

### AI Modules

#### Behavior Analysis
```http
GET /ai/behavior-analysis/{patient_id}?days=30
Authorization: Bearer <token>
```

#### Anomaly Detection
```http
GET /ai/anomaly-detection/{patient_id}?days=7
Authorization: Bearer <token>
```

#### Risk Prediction
```http
GET /ai/risk-prediction/{patient_id}
Authorization: Bearer <token>
```

#### Care Insights
```http
GET /ai/care-insights/{patient_id}
Authorization: Bearer <token>
```

#### Daily Report
```http
GET /ai/daily-report/{patient_id}
Authorization: Bearer <token>
```

## Response Formats

### Success Response
```json
{
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "detail": "Error message"
}
```

## Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error
