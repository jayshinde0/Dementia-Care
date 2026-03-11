import React, { useState } from 'react';
import axios from 'axios';

// Use IP address so it works from phone too
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000/api'
  : 'http://172.17.30.107:8000/api';

export default function Login({ setAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('caregiver');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    try {
      console.log('Attempting login with:', { email, role });
      
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
        role
      });

      console.log('Login successful:', response.data);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user_id);
      localStorage.setItem('userName', response.data.name);
      localStorage.setItem('userRole', response.data.role);
      
      setAuth(true);
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      const errorMsg = err.response?.data?.detail || 'Invalid credentials. Please try again.';
      setError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <button
            onClick={() => window.location.href = 'http://localhost:3001'}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium mb-6 inline-flex items-center transition"
          >
            ← Back to Home
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {role === 'caregiver' ? 'Caregiver Portal' : 'Patient Portal'}
          </h1>
          <p className="text-gray-500 text-sm">
            {role === 'caregiver' ? 'Sign in to monitor your patients' : 'Sign in to view your care plan'}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-3">I am a</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setRole('caregiver');
                  setError('');
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  role === 'caregiver'
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Caregiver
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('patient');
                  setError('');
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  role === 'patient'
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Patient
              </button>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
