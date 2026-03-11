import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientHome from './pages/PatientHome';
import PatientDetails from './pages/PatientDetails';
import Alerts from './pages/Alerts';
import Analytics from './pages/Analytics';
import SendTask from './pages/SendTask';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });

  const DashboardRouter = () => {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'patient' ? <PatientHome /> : <Dashboard />;
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login setAuth={setIsAuthenticated} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <DashboardRouter /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/patients" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/patient/:id" 
          element={isAuthenticated ? <PatientDetails /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/alerts" 
          element={isAuthenticated ? <Alerts /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/analytics" 
          element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/send-task" 
          element={isAuthenticated ? <SendTask /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
