import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://172.17.30.107:8000/api';
const POLL_INTERVAL = 5000; // Check every 5 seconds

class TaskPollingService {
  constructor() {
    this.intervalId = null;
    this.taskCallback = null;
    this.lastCheckedTimestamp = new Date().toISOString();
  }

  start() {
    if (this.intervalId) {
      console.log('Polling already started');
      return;
    }

    console.log('Starting task polling service...');
    
    // Check immediately
    this.checkForNewTasks();
    
    // Then check every 5 seconds
    this.intervalId = setInterval(() => {
      this.checkForNewTasks();
    }, POLL_INTERVAL);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Task polling stopped');
    }
  }

  async checkForNewTasks() {
    try {
      const patientId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');
      
      console.log('Checking for tasks... Patient ID:', patientId);
      
      if (!patientId || !token) {
        console.log('No patient ID or token found');
        return;
      }

      const response = await axios.get(
        `${API_URL}/tasks/patient/${patientId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { since: this.lastCheckedTimestamp }
        }
      );

      const tasks = response.data;
      console.log(`Found ${tasks.length} total task(s)`);
      
      // Find new undelivered tasks
      const newTasks = tasks.filter(task => 
        !task.delivered && 
        new Date(task.created_at) > new Date(this.lastCheckedTimestamp)
      );

      if (newTasks.length > 0) {
        console.log(`📬 Found ${newTasks.length} NEW undelivered task(s)`);
        
        // Show the most recent task
        const latestTask = newTasks[0];
        console.log('Showing task:', latestTask.task_text);
        
        if (this.taskCallback) {
          this.taskCallback({
            task_text: latestTask.task_text,
            caregiver_name: latestTask.caregiver_name,
            timestamp: latestTask.created_at
          });
        }

        // Mark as delivered
        try {
          await axios.put(
            `${API_URL}/tasks/${latestTask._id}/delivered`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log('Task marked as delivered');
        } catch (err) {
          console.log('Could not mark as delivered:', err.message);
        }
      }

      this.lastCheckedTimestamp = new Date().toISOString();
    } catch (error) {
      // Log errors for debugging
      if (error.response) {
        console.error('API Error:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('Network Error: No response from server');
      } else {
        console.error('Error:', error.message);
      }
    }
  }

  onTaskReceived(callback) {
    this.taskCallback = callback;
  }
}

export default new TaskPollingService();
