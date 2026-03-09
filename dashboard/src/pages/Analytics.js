import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000/api'
  : 'http://192.168.1.37:8000/api';

export default function Analytics() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [behaviorData, setBehaviorData] = useState(null);
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      loadAnalytics();
    }
  }, [selectedPatient]);

  const loadPatients = async () => {
    try {
      const token = localStorage.getItem('token');
      const caregiverId = localStorage.getItem('userId');

      const response = await axios.get(`${API_URL}/caregivers/${caregiverId}/patients`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPatients(response.data);
      if (response.data.length > 0) {
        setSelectedPatient(response.data[0]._id);
      }
    } catch (error) {
      console.error('Error loading patients:', error);
    }
  };

  const loadAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');

      const [behaviorRes, anomalyRes] = await Promise.all([
        axios.get(`${API_URL}/ai/behavior-analysis/${selectedPatient}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/ai/anomaly-detection/${selectedPatient}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setBehaviorData(behaviorRes.data.patterns);
      setAnomalies(anomalyRes.data.anomalies || []);
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  const formatChartData = () => {
    if (!behaviorData || !behaviorData.daily_activity_distribution) return [];
    
    return Object.entries(behaviorData.daily_activity_distribution).map(([day, count]) => ({
      day: day.substring(0, 3),
      activities: count
    }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Analytics</h1>
            <select
              value={selectedPatient || ''}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          {behaviorData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-2">Total Activities</h3>
                  <p className="text-4xl font-bold text-blue-600">
                    {behaviorData.total_activities_analyzed}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-2">Completion Rate</h3>
                  <p className="text-4xl font-bold text-green-600">
                    {behaviorData.completion_rate}%
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-2">Daily Average</h3>
                  <p className="text-4xl font-bold text-purple-600">
                    {behaviorData.average_daily_activities}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Weekly Activity Pattern</h2>
                <BarChart width={800} height={300} data={formatChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="activities" fill="#4A90E2" />
                </BarChart>
              </div>

              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Peak Activity Hours</h2>
                <div className="grid grid-cols-3 gap-4">
                  {behaviorData.peak_activity_hours.map((peak, index) => (
                    <div key={index} className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Peak #{index + 1}</p>
                      <p className="text-2xl font-bold">{peak.hour}:00</p>
                      <p className="text-sm text-gray-600">{peak.count} activities</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {anomalies.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Detected Anomalies</h2>
              <div className="space-y-3">
                {anomalies.map((anomaly, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      anomaly.severity === 'critical' ? 'bg-red-50 border-red-500' :
                      anomaly.severity === 'high' ? 'bg-orange-50 border-orange-500' :
                      'bg-yellow-50 border-yellow-500'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{anomaly.type.replace(/_/g, ' ').toUpperCase()}</p>
                        <p className="text-sm text-gray-700 mt-1">{anomaly.message}</p>
                      </div>
                      <span className="px-3 py-1 bg-white rounded text-sm font-semibold">
                        {anomaly.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
