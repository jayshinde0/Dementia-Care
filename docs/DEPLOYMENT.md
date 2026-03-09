# Deployment Guide

## Production Deployment Options

### Backend Deployment

#### Option 1: Render (Recommended)
1. Create account at render.com
2. Connect GitHub repository
3. Create new Web Service
4. Configure:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Environment Variables:
     ```
     MONGODB_URL=<your-mongodb-atlas-url>
     SECRET_KEY=<generate-secure-key>
     DATABASE_NAME=dementia_care
     ```

#### Option 2: Railway
1. Create account at railway.app
2. New Project → Deploy from GitHub
3. Add MongoDB plugin
4. Set environment variables
5. Deploy

#### Option 3: Heroku
```bash
# Install Heroku CLI
heroku login
heroku create dementia-care-api

# Add MongoDB addon
heroku addons:create mongolab

# Set environment variables
heroku config:set SECRET_KEY=your-secret-key

# Deploy
git push heroku main
```

### Database Deployment (MongoDB Atlas)

1. Create account at mongodb.com/atlas
2. Create new cluster (Free tier available)
3. Configure:
   - Cloud Provider: AWS/GCP/Azure
   - Region: Closest to your users
   - Cluster Tier: M0 (Free) or higher
4. Create database user
5. Whitelist IP addresses (0.0.0.0/0 for development)
6. Get connection string
7. Update backend environment variables

### Dashboard Deployment

#### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to dashboard directory
cd dashboard

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Update API_URL to production backend URL
```

#### Option 2: Netlify
1. Create account at netlify.com
2. Connect GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Set environment variables
5. Deploy

### Mobile App Deployment

#### Android (Google Play Store)

1. Build APK:
```bash
cd mobile
expo build:android
```

2. Download APK from Expo
3. Create Google Play Developer account ($25 one-time fee)
4. Upload APK to Play Console
5. Complete store listing
6. Submit for review

#### iOS (App Store)

1. Build IPA:
```bash
expo build:ios
```

2. Download IPA
3. Apple Developer account required ($99/year)
4. Upload to App Store Connect
5. Complete app information
6. Submit for review

#### Over-The-Air Updates (Expo)
```bash
# Publish updates without app store review
expo publish
```

## Environment Configuration

### Backend (.env)
```env
# Production
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/dementia_care
DATABASE_NAME=dementia_care
SECRET_KEY=<generate-with-openssl-rand-hex-32>
FIREBASE_CREDENTIALS_PATH=/path/to/firebase-credentials.json
GOOGLE_MAPS_API_KEY=your-google-maps-key
ENVIRONMENT=production
```

### Dashboard (.env)
```env
REACT_APP_API_URL=https://your-backend-url.com/api
REACT_APP_GOOGLE_MAPS_KEY=your-google-maps-key
```

### Mobile (app.json)
```json
{
  "expo": {
    "extra": {
      "apiUrl": "https://your-backend-url.com/api"
    }
  }
}
```

## Security Checklist

- [ ] Change default SECRET_KEY
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable MongoDB authentication
- [ ] Whitelist specific IPs (production)
- [ ] Use environment variables for secrets
- [ ] Enable API request logging
- [ ] Set up error monitoring (Sentry)
- [ ] Configure backup strategy
- [ ] Enable database encryption at rest
- [ ] Implement API key rotation
- [ ] Set up firewall rules

## Performance Optimization

### Backend
```python
# Add caching
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend

# Add compression
from fastapi.middleware.gzip import GZipMiddleware
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Connection pooling
motor_client = AsyncIOMotorClient(
    MONGODB_URL,
    maxPoolSize=50,
    minPoolSize=10
)
```

### Dashboard
```javascript
// Code splitting
const PatientDetails = lazy(() => import('./pages/PatientDetails'));

// Image optimization
// Use WebP format
// Lazy load images

// Bundle optimization
// Run: npm run build
// Analyze: npm install --save-dev webpack-bundle-analyzer
```

### Database
```javascript
// Create indexes
db.activities.createIndex({ patient_id: 1, timestamp: -1 })
db.alerts.createIndex({ caregiver_ids: 1, acknowledged: 1 })
db.reminders.createIndex({ patient_id: 1, active: 1 })
```

## Monitoring & Logging

### Application Monitoring
```python
# Sentry integration
import sentry_sdk
sentry_sdk.init(dsn="your-sentry-dsn")

# Custom logging
import logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
```

### Database Monitoring
- Enable MongoDB Atlas monitoring
- Set up alerts for:
  - High CPU usage
  - Memory usage
  - Slow queries
  - Connection count

### Uptime Monitoring
- Use UptimeRobot or Pingdom
- Monitor API endpoints
- Set up email/SMS alerts

## Backup Strategy

### Database Backups
```bash
# Automated backups with MongoDB Atlas
# Or manual backup:
mongodump --uri="mongodb+srv://..." --out=/backup/$(date +%Y%m%d)

# Restore:
mongorestore --uri="mongodb+srv://..." /backup/20240309
```

### Code Backups
- Use Git version control
- Push to GitHub/GitLab
- Tag releases
- Maintain changelog

## Scaling Strategy

### Horizontal Scaling
```
Load Balancer
    ↓
Backend Instance 1
Backend Instance 2
Backend Instance 3
    ↓
MongoDB Cluster (Sharded)
```

### Vertical Scaling
- Upgrade server resources
- Increase MongoDB cluster tier
- Optimize database queries
- Add caching layer (Redis)

## CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Backend
        run: |
          # Deploy to Render/Railway
          
      - name: Deploy Dashboard
        run: |
          cd dashboard
          npm install
          npm run build
          # Deploy to Vercel
```

## Health Checks

### Backend Health Endpoint
```python
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "timestamp": datetime.utcnow()
    }
```

### Monitoring Script
```bash
#!/bin/bash
response=$(curl -s -o /dev/null -w "%{http_code}" https://api.example.com/health)
if [ $response != "200" ]; then
    # Send alert
    echo "API is down!"
fi
```

## Disaster Recovery

### Recovery Plan
1. Restore database from latest backup
2. Redeploy backend from Git
3. Verify all services running
4. Test critical endpoints
5. Notify users of any downtime

### RTO/RPO Targets
- Recovery Time Objective (RTO): < 4 hours
- Recovery Point Objective (RPO): < 24 hours

## Cost Estimation

### Free Tier (Development)
- Backend: Render Free Tier
- Database: MongoDB Atlas M0 (Free)
- Dashboard: Vercel Free Tier
- Total: $0/month

### Production (Small Scale)
- Backend: Render Starter ($7/month)
- Database: MongoDB Atlas M10 ($57/month)
- Dashboard: Vercel Pro ($20/month)
- Mobile: Expo ($29/month)
- Total: ~$113/month

### Production (Medium Scale)
- Backend: Render Standard ($25/month)
- Database: MongoDB Atlas M30 ($250/month)
- Dashboard: Vercel Pro ($20/month)
- CDN: Cloudflare (Free)
- Monitoring: Sentry ($26/month)
- Total: ~$321/month

## Post-Deployment Checklist

- [ ] All services running
- [ ] Database connected
- [ ] API endpoints responding
- [ ] Mobile app connecting to API
- [ ] Dashboard loading correctly
- [ ] Authentication working
- [ ] Notifications sending
- [ ] Location tracking functional
- [ ] AI modules processing
- [ ] Alerts generating
- [ ] Monitoring configured
- [ ] Backups scheduled
- [ ] SSL certificates valid
- [ ] DNS configured
- [ ] Documentation updated
