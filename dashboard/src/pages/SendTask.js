import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import io from 'socket.io-client';

const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000/api'
  : 'http://172.17.30.107:8000/api';

const SOCKET_URL = 'http://172.17.30.107:8001';

export default function SendTask() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [taskText, setTaskText] = useState('');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    loadPatients();
    
    // Connect to Socket.io
    const socketConnection = io(SOCKET_URL, {
      transports: ['websocket'],
    });

    socketConnection.on('connect', () => {
      console.log('Caregiver connected to socket');
    });

    socketConnection.on('task_sent', (data) => {
      // Socket confirmation (optional - polling is primary method)
      console.log('Socket confirmation:', data);
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, []);

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

  const handleSendTask = async () => {
    if (!taskText.trim() || !selectedPatient) {
      setMessage({ type: 'error', text: 'Please enter a task and select a patient' });
      return;
    }

    setSending(true);
    setMessage(null);

    const caregiverName = localStorage.getItem('userName') || 'Your Caregiver';

    // Save to database (polling system will pick it up)
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/tasks/send`,
        {
          patient_id: selectedPatient,
          task_text: taskText,
          caregiver_name: caregiverName,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessage({ type: 'success', text: 'Task sent successfully! Patient will receive it within 5 seconds.' });
      setSending(false);

      // Clear form after 2 seconds
      setTimeout(() => {
        setTaskText('');
        setMessage(null);
      }, 2000);

    } catch (error) {
      console.error('Error saving task:', error);
      setMessage({ type: 'error', text: 'Failed to send task. Please try again.' });
      setSending(false);
    }

    // Also try to send via Socket.io if connected (optional enhancement)
    if (socket && socket.connected) {
      socket.emit('send_task_to_patient', {
        patient_id: selectedPatient,
        task_text: taskText,
        caregiver_name: caregiverName,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const quickTasks = [
    'Take your morning medication',
    'Time to drink water',
    'Lunch is ready',
    'Time for your walk',
    'Call me when you can',
  ];

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      <div className="absolute -top-[40%] -left-[10%] w-[80%] h-[80%] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>
      
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Send Task to Patient</h1>
            <p className="text-slate-500 text-lg">Send real-time reminders and tasks to your patient's device</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 mb-6"
          >
            {/* Patient Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Select Patient</label>
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl bg-white font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              >
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Task Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Task / Reminder</label>
              <textarea
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Enter task or reminder for the patient..."
                rows={4}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
            </div>

            {/* Quick Tasks */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Quick Tasks</label>
              <div className="flex flex-wrap gap-2">
                {quickTasks.map((task, index) => (
                  <button
                    key={index}
                    onClick={() => setTaskText(task)}
                    className="px-4 py-2 bg-slate-100 hover:bg-primary/10 text-slate-700 rounded-full text-sm font-medium transition-colors"
                  >
                    {task}
                  </button>
                ))}
              </div>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendTask}
              disabled={sending || !taskText.trim()}
              className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl shadow-widget hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Send size={20} />
              <span>{sending ? 'Sending...' : 'Send to Patient'}</span>
            </button>

            {/* Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-2xl flex items-center space-x-3 ${
                  message.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <span className="font-semibold">{message.text}</span>
              </motion.div>
            )}
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-[2rem] p-6 border border-primary/20"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-2">How it works</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Task is saved to database</li>
              <li>• Patient app checks for new tasks every 5 seconds</li>
              <li>• Task appears as overlay with voice on patient device</li>
              <li>• Overlay stays for 8 seconds then auto-dismisses</li>
            </ul>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
