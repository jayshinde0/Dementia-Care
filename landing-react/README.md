# Dementia Care System - React Landing Page

Modern, minimal landing page built with React for the Dementia Care System.

## Features

- Modern, clean design with minimal white theme
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- React Router for navigation
- **Backend API Integration** via Axios
- Component-based architecture
- Professional typography (Inter font)
- Accessible design

## Backend Integration

### API Service
The landing page connects to the backend API through `src/services/api.js`:

```javascript
// Automatic API URL detection
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000/api'
  : `http://${window.location.hostname}:8000/api`;
```

### Features
- ✅ Automatic token management
- ✅ Request/response interceptors
- ✅ Environment-aware API URLs
- ✅ Error handling
- ✅ Contact form integration

### API Endpoints Used
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- Contact form (logged to console, can be connected to backend)

## Pages

- **Home** - Hero, features, how it works, impact, CTA
- **About** - Mission, values, company story
- **Contact** - Contact form with backend integration
- **Features** - Detailed feature showcase

## Quick Start

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm start
```

The landing page will open at **http://localhost:3001**

### Build for Production
```bash
npm run build
```

## Project Structure

```
landing-react/
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Navigation with mobile menu
│   │   ├── Navbar.css
│   │   ├── Footer.js          # Footer with links
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Home.js            # Main landing page
│   │   ├── Home.css
│   │   ├── About.js           # About page
│   │   ├── About.css
│   │   ├── Contact.js         # Contact form
│   │   ├── Contact.css
│   │   └── Features.js        # Features page
│   ├── services/
│   │   └── api.js             # Backend API integration ✨
│   ├── App.js                 # Main app component
│   ├── App.css                # Global styles
│   └── index.js               # Entry point
└── public/
```

## Design System

### Colors
- Primary: #2563eb (Blue)
- Secondary: #64748b (Gray)
- Accent: #0ea5e9 (Light Blue)
- Text Primary: #1e293b
- Text Secondary: #64748b
- Background: #ffffff, #f8fafc

### Typography
- Font Family: Inter
- Headings: 700 weight
- Body: 400 weight
- Links: 500 weight

### Spacing
- Section Padding: 100px (desktop), 60px (mobile)
- Container Max Width: 1200px
- Grid Gap: 32px-48px

## Integration with Main System

### Service Ports
- **Landing Page**: http://localhost:3001 (This app)
- **Dashboard**: http://localhost:3000 (Main application)
- **Backend API**: http://localhost:8000 (REST API)

### Navigation Flow
1. User visits landing page (port 3001)
2. Clicks "Get Started" button
3. Redirects to dashboard (port 3000)
4. Dashboard connects to backend API (port 8000)

### API Connection
The landing page automatically detects the backend API:
- **Local Development**: `http://localhost:8000/api`
- **Network Access**: `http://<YOUR_IP>:8000/api`

## Customization

### Update Colors
Edit CSS variables in `src/App.css`:
```css
:root {
  --primary: #2563eb;
  --secondary: #64748b;
  /* ... */
}
```

### Add New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.js`
3. Add navigation link in `src/components/Navbar.js`

### Modify Content
Edit the data arrays in each page component:
```javascript
const features = [
  { title: '...', description: '...', iconClass: '...' }
];
```

### Connect New API Endpoints
Add to `src/services/api.js`:
```javascript
export const myAPI = {
  getData: () => api.get('/my-endpoint'),
  postData: (data) => api.post('/my-endpoint', data),
};
```

## Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.x",
  "axios": "^1.x"
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images and assets
- Code splitting with React Router
- Minimal dependencies
- Fast load times
- Lazy loading for routes

## Deployment

### Build
```bash
npm run build
```

### Deploy
The `build/` folder can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

### Environment Variables
For production, update API URLs in `src/services/api.js` or use environment variables:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
```

## Development Tips

### Hot Reload
Changes to components automatically reload in the browser.

### Debugging
- Open browser console (F12)
- Check Network tab for API calls
- Use React DevTools extension

### Testing API Integration
1. Start backend: `cd backend && venv\Scripts\python.exe main.py`
2. Start landing page: `npm start`
3. Test contact form or navigation to dashboard

## Troubleshooting

### Port Already in Use
```bash
# Change port in package.json or use:
set PORT=3002
npm start
```

### API Connection Failed
- Ensure backend is running on port 8000
- Check CORS settings in backend
- Verify API URL in `src/services/api.js`

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Contributing

When adding new features:
1. Create components in appropriate folders
2. Follow existing naming conventions
3. Update this README
4. Test on mobile and desktop
5. Ensure API integration works

## License

Part of the Dementia Care System project.

---

**Ready to showcase your healthcare platform!** 🎉
