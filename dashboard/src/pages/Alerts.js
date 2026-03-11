import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000/api'
  : 'http://172.17.30.107:8000/api';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadAlerts();
    
    // Auto-refresh every 10 seconds to check for new alerts
    const interval = setInterval(() => {
      loadAlerts();
    }, 10000);
    
    return () => clearInterval(interval);
  }, [filter]);

  const loadAlerts = async () => {
    try {
      const token = localStorage.getItem('token');
      const caregiverId = localStorage.getItem('userId');

      const url = filter === 'all' 
        ? `${API_URL}/alerts/caregiver/${caregiverId}`
        : `${API_URL}/alerts/caregiver/${caregiverId}?acknowledged=false`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAlerts(response.data);
    } catch (error) {
      console.error('Error loading alerts:', error);
    }
  };

  const acknowledgeAlert = async (alertId) => {
    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `${API_URL}/alerts/${alertId}/acknowledge`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      loadAlerts();
    } catch (error) {
      console.error('Error acknowledging alert:', error);
    }
  };

  const getAlertColor = (severity) => {
    const colors = {
      critical: 'border-l-red-500 bg-red-50',
      high: 'border-l-orange-500 bg-orange-50',
      medium: 'border-l-yellow-500 bg-yellow-50',
      low: 'border-l-blue-500 bg-blue-50'
    };
    return colors[severity] || colors.medium;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Alerts</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unacknowledged')}
                className={`px-4 py-2 rounded ${filter === 'unacknowledged' ? 'bg-blue-600 text-white' : 'bg-white'}`}
              >
                Unacknowledged
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert._id}
                className={`bg-white border-l-4 rounded-lg shadow p-6 ${getAlertColor(alert.severity)}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-white rounded text-sm font-semibold">
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600">
                        {new Date(alert.created_at).toLocaleString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{alert.title}</h3>
                    <p className="text-gray-700 mb-2">{alert.message}</p>
                    <p className="text-sm text-gray-600">Type: {alert.type}</p>
                  </div>
                  
                  {!alert.acknowledged && (
                    <button
                      onClick={() => acknowledgeAlert(alert._id)}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Acknowledge
                    </button>
                  )}
                  
                  {alert.acknowledged && (
                    <span className="ml-4 px-4 py-2 bg-green-100 text-green-800 rounded">
                      ✓ Acknowledged
                    </span>
                  )}
                </div>
              </div>
            ))}

            {alerts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No alerts to display
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
