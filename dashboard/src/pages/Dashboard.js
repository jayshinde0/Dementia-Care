import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000/api'
  : 'http://192.168.1.37:8000/api';

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = localStorage.getItem('token');
      const caregiverId = localStorage.getItem('userId');

      const [patientsRes, alertsRes] = await Promise.all([
        axios.get(`${API_URL}/caregivers/${caregiverId}/patients`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/alerts/caregiver/${caregiverId}?acknowledged=false`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setPatients(patientsRes.data);
      setAlerts(alertsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAlertColor = (severity) => {
    const colors = {
      critical: 'bg-red-100 border-red-500 text-red-800',
      high: 'bg-orange-100 border-orange-500 text-orange-800',
      medium: 'bg-yellow-100 border-yellow-500 text-yellow-800',
      low: 'bg-blue-100 border-blue-500 text-blue-800'
    };
    return colors[severity] || colors.medium;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

          {alerts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Active Alerts ({alerts.length})</h2>
              <div className="space-y-3">
                {alerts.slice(0, 5).map((alert) => (
                  <div
                    key={alert._id}
                    className={`p-4 border-l-4 rounded ${getAlertColor(alert.severity)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{alert.title}</h3>
                        <p className="text-sm mt-1">{alert.message}</p>
                        <p className="text-xs mt-2 opacity-75">
                          {new Date(alert.created_at).toLocaleString()}
                        </p>
                      </div>
                      <Link
                        to={`/patient/${alert.patient_id}`}
                        className="text-sm bg-white px-3 py-1 rounded hover:bg-gray-50"
                      >
                        View Patient
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              {alerts.length > 5 && (
                <Link to="/alerts" className="text-blue-600 hover:underline mt-3 inline-block">
                  View all alerts →
                </Link>
              )}
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-4">My Patients ({patients.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patients.map((patient) => (
                <Link
                  key={patient._id}
                  to={`/patient/${patient._id}`}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {patient.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{patient.name}</h3>
                      <p className="text-sm text-gray-600">Age: {patient.age}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>📞 {patient.phone}</p>
                    <p>📍 {patient.address}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
