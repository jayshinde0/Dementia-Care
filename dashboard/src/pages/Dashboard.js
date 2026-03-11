import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import MetricCards from '../components/MetricCards';
import AlertFeed from '../components/AlertFeed';
import PatientTable from '../components/PatientTable';

const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000/api'
  : 'http://172.17.30.107:8000/api';

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [reminders, setReminders] = useState(0);
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
      
      // Get reminders count from all patients
      let totalReminders = 0;
      for (const patient of patientsRes.data) {
        try {
          const remRes = await axios.get(`${API_URL}/reminders/patient/${patient._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          totalReminders += remRes.data.length;
        } catch (err) {
          console.error('Error loading reminders:', err);
        }
      }
      setReminders(totalReminders);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-slate-500 font-medium">Booting Command Center...</p>
          </div>
        </div>
      </div>
    );
  }

  const statsProps = [
    { label: 'Total Patients', value: patients.length, icon: 'users', color: 'bg-blue-500' },
    { label: 'Active Alerts', value: alerts.length, icon: 'bell', color: 'bg-red-500' },
    { label: 'Reminders', value: reminders, icon: 'clock', color: 'bg-green-500' },
    { label: 'Critical Issues', value: alerts.filter(a => a.severity === 'critical').length, icon: 'alert', color: 'bg-orange-500' }
  ];

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
        {/* Dynamic Abstract Background matching Landing Page */}
        <div className="absolute -top-[40%] -left-[10%] w-[80%] h-[80%] rounded-full bg-primary/5 blur-[120px] pointer-events-none mix-blend-multiply"></div>
        <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-alert-light/20 blur-[120px] pointer-events-none mix-blend-multiply"></div>

        <Sidebar />
        
        <main className="flex-1 flex flex-col ml-0 md:ml-0 overflow-y-auto px-4 md:px-8 py-8 relative z-10 w-full overflow-hidden">
           
           <header className="mb-10 animate-fade-in-up">
              <div className="flex justify-between items-end">
                 <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">Command Center</h1>
                    <p className="text-slate-500 text-lg">Good morning, {localStorage.getItem('userName') || 'Dr. Carter'}. Here is today's overview.</p>
                 </div>
                 <div className="hidden md:flex space-x-4">
                    <button className="px-5 py-2.5 bg-white text-slate-700 font-semibold rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all">
                       Export Report
                    </button>
                    <button className="px-5 py-2.5 bg-primary text-white font-semibold rounded-xl shadow-widget hover:-translate-y-0.5 transition-all">
                       + New Patient
                    </button>
                 </div>
              </div>
           </header>

           {/* Metrics Grid */}
           <MetricCards stats={statsProps} />

           {/* Main Content Grid */}
           <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-12">
              
              <div className="xl:col-span-2 shadow-sm rounded-[2rem] border border-slate-100/50 bg-white min-h-[500px] overflow-hidden">
                 <PatientTable patients={patients} />
              </div>

              <div className="xl:col-span-1 min-h-[500px]">
                 <AlertFeed alerts={alerts} />
              </div>
              
           </div>
        </main>
    </div>
  );
}
