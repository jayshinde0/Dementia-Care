import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000/api'
  : 'http://172.17.30.107:8000/api';

export default function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [activities, setActivities] = useState([]);
  const [insights, setInsights] = useState([]);
  const [riskAssessment, setRiskAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatientData();
  }, [id]);

  const loadPatientData = async () => {
    try {
      const token = localStorage.getItem('token');

      const [patientRes, activitiesRes, insightsRes, riskRes] = await Promise.all([
        axios.get(`${API_URL}/patients/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/activities/patient/${id}?days=7`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/ai/care-insights/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/ai/risk-prediction/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setPatient(patientRes.data);
      setActivities(activitiesRes.data);
      setInsights(insightsRes.data.insights || []);
      setRiskAssessment(riskRes.data.risk_assessment);
    } catch (error) {
      console.error('Error loading patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return colors[level] || 'bg-gray-500';
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {patient.name.charAt(0)}
                </div>
                <div className="ml-6">
                  <h1 className="text-3xl font-bold">{patient.name}</h1>
                  <p className="text-gray-600">Age: {patient.age} | {patient.phone}</p>
                </div>
              </div>
              
              {riskAssessment && (
                <div className="text-center">
                  <div className={`${getRiskColor(riskAssessment.risk_level)} text-white px-6 py-3 rounded-lg`}>
                    <p className="text-sm uppercase">Risk Level</p>
                    <p className="text-2xl font-bold">{riskAssessment.risk_level}</p>
                    <p className="text-sm">{riskAssessment.overall_risk_score}/100</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">AI Care Insights</h2>
              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-2xl mr-3">
                      {insight.includes('🔴') ? '🔴' : insight.includes('⚠') ? '⚠️' : '✓'}
                    </span>
                    <p className="text-gray-700">{insight.replace(/🔴|⚠|✓/g, '').trim()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Risk Factors</h2>
              {riskAssessment && (
                <div className="space-y-3">
                  {riskAssessment.risk_factors.map((factor, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-700">{factor}</p>
                    </div>
                  ))}
                  <div className="mt-4 p-4 bg-blue-50 rounded">
                    <p className="font-semibold text-blue-900">Recommendation:</p>
                    <p className="text-blue-800 mt-1">{riskAssessment.recommendation}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity (Last 7 Days)</h2>
            <div className="space-y-2">
              {activities.slice(0, 10).map((activity) => (
                <div key={activity._id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {activity.completed && (
                    <span className="text-green-600 text-xl">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
