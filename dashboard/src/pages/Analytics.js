import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Brain, Activity, Clock, AlertCircle } from 'lucide-react';

const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000/api'
  : 'http://172.17.30.107:8000/api';

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

  const getAIInsights = () => {
    if (!behaviorData) return [];
    
    const insights = [];
    const completionRate = behaviorData.completion_rate;
    const avgActivities = behaviorData.average_daily_activities;
    
    if (completionRate > 80) {
      insights.push({
        type: 'positive',
        icon: <TrendingUp className="w-5 h-5" />,
        title: 'Excellent Adherence',
        message: `${completionRate}% task completion rate indicates strong routine compliance.`
      });
    } else if (completionRate < 50) {
      insights.push({
        type: 'warning',
        icon: <AlertCircle className="w-5 h-5" />,
        title: 'Low Completion Rate',
        message: `Only ${completionRate}% completion. Consider simplifying daily tasks.`
      });
    }
    
    if (avgActivities > 10) {
      insights.push({
        type: 'positive',
        icon: <Activity className="w-5 h-5" />,
        title: 'High Activity Level',
        message: `${avgActivities} daily activities shows excellent engagement.`
      });
    }
    
    if (behaviorData.peak_activity_hours && behaviorData.peak_activity_hours.length > 0) {
      const peakHour = behaviorData.peak_activity_hours[0].hour;
      insights.push({
        type: 'info',
        icon: <Clock className="w-5 h-5" />,
        title: 'Peak Activity Pattern',
        message: `Most active around ${peakHour}:00. Schedule important tasks during this window.`
      });
    }
    
    return insights;
  };

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -top-[40%] -left-[10%] w-[80%] h-[80%] rounded-full bg-primary/5 blur-[120px] pointer-events-none mix-blend-multiply"></div>
      <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-accent/10 blur-[120px] pointer-events-none mix-blend-multiply"></div>

      <Sidebar />
      
      <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Analytics & Insights</h1>
              <p className="text-slate-500 text-lg">AI-powered behavioral analysis and predictions</p>
            </div>
            <select
              value={selectedPatient || ''}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="px-5 py-3 border border-slate-200 rounded-2xl bg-white shadow-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
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
              {/* AI Insights Section */}
              {getAIInsights().length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 bg-gradient-to-br from-primary to-accent rounded-[2rem] p-8 text-white shadow-xl"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                      <Brain className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">AI Insights</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getAIInsights().map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-xl ${
                            insight.type === 'positive' ? 'bg-emerald-400/20' :
                            insight.type === 'warning' ? 'bg-amber-400/20' :
                            'bg-blue-400/20'
                          }`}>
                            {insight.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-sm mb-1">{insight.title}</h3>
                            <p className="text-sm text-white/80 leading-relaxed">{insight.message}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Total Activities</h3>
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-4xl font-black text-slate-900 tracking-tighter">
                    {behaviorData.total_activities_analyzed}
                  </p>
                  <p className="text-sm text-slate-500 mt-2">Analyzed this period</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Completion Rate</h3>
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                  </div>
                  <p className="text-4xl font-black text-slate-900 tracking-tighter">
                    {behaviorData.completion_rate}%
                  </p>
                  <p className="text-sm text-emerald-600 mt-2 font-semibold">+5% from last week</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Daily Average</h3>
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-4xl font-black text-slate-900 tracking-tighter">
                    {behaviorData.average_daily_activities}
                  </p>
                  <p className="text-sm text-slate-500 mt-2">Activities per day</p>
                </motion.div>
              </div>

              {/* Area Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 mb-8"
              >
                <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Weekly Activity Pattern</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={formatChartData()}>
                    <defs>
                      <linearGradient id="colorActivities" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0891B2" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0891B2" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="day" 
                      stroke="#94A3B8"
                      style={{ fontSize: '14px', fontWeight: '600' }}
                    />
                    <YAxis 
                      stroke="#94A3B8"
                      style={{ fontSize: '14px', fontWeight: '600' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#FFFFFF', 
                        border: '1px solid #E2E8F0',
                        borderRadius: '16px',
                        padding: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="activities" 
                      stroke="#0891B2" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorActivities)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Peak Activity Hours */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 mb-8"
              >
                <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Peak Activity Hours</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {behaviorData.peak_activity_hours.map((peak, index) => (
                    <div key={index} className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-2xl border border-primary/20">
                      <p className="text-sm font-semibold text-slate-500 mb-2">Peak #{index + 1}</p>
                      <p className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{peak.hour}:00</p>
                      <p className="text-sm text-slate-600 font-medium">{peak.count} activities</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}

          {/* Anomalies */}
          {anomalies.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Detected Anomalies</h2>
              <div className="space-y-4">
                {anomalies.map((anomaly, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-2xl border-l-4 ${
                      anomaly.severity === 'critical' ? 'bg-alert-light/20 border-alert' :
                      anomaly.severity === 'high' ? 'bg-amber-50 border-amber-400' :
                      'bg-yellow-50 border-yellow-400'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-xl ${
                          anomaly.severity === 'critical' ? 'bg-alert text-white' :
                          anomaly.severity === 'high' ? 'bg-amber-200 text-amber-800' :
                          'bg-yellow-200 text-yellow-800'
                        }`}>
                          <AlertCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{anomaly.type.replace(/_/g, ' ').toUpperCase()}</p>
                          <p className="text-sm text-slate-600 mt-1 leading-relaxed">{anomaly.message}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        anomaly.severity === 'critical' ? 'bg-alert text-white' :
                        anomaly.severity === 'high' ? 'bg-amber-200 text-amber-800' :
                        'bg-yellow-200 text-yellow-800'
                      }`}>
                        {anomaly.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
