import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const SOCKET_URL = 'http://172.17.30.107:8001'; // Change this to your computer's IP

class SocketService {
  constructor() {
    this.socket = null;
    this.taskCallback = null;
    this.isConnected = false;
  }

  connect() {
    if (this.socket?.connected) {
      console.log('Socket already connected');
      return;
    }

    console.log('Attempting to connect to:', SOCKET_URL);

    try {
      this.socket = io(SOCKET_URL, {
        transports: ['polling', 'websocket'], // Try polling first, then websocket
        reconnection: true,
        reconnectionDelay: 2000,
        reconnectionAttempts: 5,
        timeout: 20000, // Increased timeout to 20 seconds
        forceNew: true,
      });

      this.socket.on('connect', async () => {
        console.log('✅ Socket connected successfully');
        this.isConnected = true;
        
        // Register patient device
        const patientId = await AsyncStorage.getItem('userId');
        console.log('Patient ID from storage:', patientId);
        
        if (patientId) {
          this.socket.emit('register_patient', { patient_id: patientId });
          console.log('Sent register_patient event with ID:', patientId);
        } else {
          console.warn('⚠️ No patient ID found in storage');
        }
      });

      this.socket.on('disconnect', (reason) => {
        console.log('❌ Socket disconnected. Reason:', reason);
        this.isConnected = false;
      });

      this.socket.on('registered', (data) => {
        console.log('✅ Patient registered successfully:', data);
      });

      this.socket.on('new_task', (data) => {
        console.log('📬 New task received:', data);
        if (this.taskCallback) {
          this.taskCallback(data);
        }
      });

      this.socket.on('connect_error', (error) => {
        console.error('❌ Socket connection error:', error.message);
        console.error('Make sure socket server is running on:', SOCKET_URL);
        this.isConnected = false;
      });

      this.socket.on('reconnect_attempt', (attemptNumber) => {
        console.log(`🔄 Reconnection attempt ${attemptNumber}...`);
      });

      this.socket.on('reconnect_failed', () => {
        console.error('❌ All reconnection attempts failed');
        this.isConnected = false;
      });
    } catch (error) {
      console.error('Error creating socket:', error);
      this.isConnected = false;
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  onTaskReceived(callback) {
    this.taskCallback = callback;
  }

  sendTaskToPatient(patientId, taskText, caregiverName) {
    if (this.socket?.connected) {
      this.socket.emit('send_task_to_patient', {
        patient_id: patientId,
        task_text: taskText,
        caregiver_name: caregiverName,
        timestamp: new Date().toISOString(),
      });
    } else {
      console.error('Socket not connected');
    }
  }

  getConnectionStatus() {
    return this.isConnected;
  }
}

export default new SocketService();
