import axios from 'axios';

// Determine API URL based on environment
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000/api'
  : `http://${window.location.hostname}:8000/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (email, password, role) => 
    api.post('/auth/login', { email, password, role }),
  
  register: (userData) => 
    api.post('/auth/register', userData),
};

export const contactAPI = {
  sendMessage: (formData) => {
    // In a real app, this would send to backend
    // For now, just log it
    console.log('Contact form submitted:', formData);
    return Promise.resolve({ data: { message: 'Message sent successfully' } });
  },
};

export default api;
