import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000/api'
  : 'http://172.17.30.107:8000/api';

export default function PatientHome() {
  const [reminders, setReminders] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [remindersRes, activitiesRes] = await Promise.all([
        axios.get(`${API_URL}/reminders/patient/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/activities/patient/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      setReminders(remindersRes.data);
      setActivities(activitiesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmergency = async () => {
    try {
      // Use the dedicated emergency endpoint
      await axios.post(
        `${API_URL}/alerts/emergency?patient_id=${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('🚨 Emergency alert sent to your caregivers!');
      
      // Optionally refresh the page to show the alert was sent
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error sending emergency alert:', error);
      alert('⚠️ Could not send emergency alert. Please call your caregiver directly.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleBackToHome = () => {
    window.location.href = 'http://localhost:3001';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {userName}!</h1>
            <p className="text-gray-600">Your daily care companion</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleBackToHome}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
            >
              🌐 Home
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Emergency Button */}
        <div className="mb-8">
          <button
            onClick={handleEmergency}
            className="w-full bg-red-600 text-white py-6 rounded-2xl font-bold text-2xl hover:bg-red-700 shadow-lg transform hover:scale-105 transition"
          >
            🚨 EMERGENCY - CALL FOR HELP
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Today's Reminders */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">📅 Today's Reminders</h2>
            {reminders.length === 0 ? (
              <p className="text-gray-500">No reminders for today</p>
            ) : (
              <div className="space-y-3">
                {reminders.map((reminder) => (
                  <div key={reminder._id} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{reminder.title}</h3>
                        <p className="text-gray-600">{reminder.description}</p>
                        <p className="text-sm text-blue-600 mt-1">⏰ {reminder.time}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        reminder.completed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {reminder.completed ? '✓ Done' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">🎯 Recent Activities</h2>
            {activities.length === 0 ? (
              <p className="text-gray-500">No activities recorded</p>
            ) : (
              <div className="space-y-3">
                {activities.slice(0, 5).map((activity) => (
                  <div key={activity._id} className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{activity.activity_type}</h3>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition text-center">
            <div className="text-4xl mb-2">💊</div>
            <div className="font-semibold">Medications</div>
          </button>
          <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition text-center">
            <div className="text-4xl mb-2">🎮</div>
            <div className="font-semibold">Brain Games</div>
          </button>
          <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition text-center">
            <div className="text-4xl mb-2">❤️</div>
            <div className="font-semibold">Health</div>
          </button>
          <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition text-center">
            <div className="text-4xl mb-2">📞</div>
            <div className="font-semibold">Contacts</div>
          </button>
        </div>
      </div>
    </div>
  );
}
