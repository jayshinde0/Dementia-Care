# Setup Guide

## Prerequisites

- Python 3.8+
- Node.js 16+
- MongoDB (local or Atlas)
- Android Studio (for mobile app)

## Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```bash
cp .env.example .env
```

5. Update `.env` with your configuration:
```
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=dementia_care
SECRET_KEY=your-secret-key-here
```

6. Start the server:
```bash
python main.py
```

Server will run on `http://localhost:8000`

## Mobile App Setup

1. Navigate to mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start Expo:
```bash
npm start
```

4. Run on Android:
```bash
npm run android
```

Or scan QR code with Expo Go app.

## Dashboard Setup

1. Navigate to dashboard directory:
```bash
cd dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Dashboard will run on `http://localhost:3000`

## MongoDB Setup

### Local MongoDB
```bash
# Install MongoDB
# Start MongoDB service
mongod --dbpath /path/to/data
```

### MongoDB Atlas (Cloud)
1. Create account at mongodb.com/atlas
2. Create cluster
3. Get connection string
4. Update MONGODB_URL in backend/.env

## Testing the System

1. Start backend server
2. Start dashboard
3. Start mobile app
4. Create caregiver account via dashboard
5. Create patient account via mobile app
6. Link patient to caregiver

## API Documentation

Once backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
