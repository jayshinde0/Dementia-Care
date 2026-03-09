import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import * as Location from 'expo-location';
import axios from 'axios';

const API_URL = 'http://192.168.1.37:8000/api';

export default function EmergencyScreen() {
  const [sending, setSending] = useState(false);

  const handleEmergency = async () => {
    setSending(true);
    Speech.speak('Sending emergency alert to your caregiver', { language: 'en' });

    try {
      const location = await Location.getCurrentPositionAsync({});
      const patientId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');

      await axios.post(
        `${API_URL}/alerts/emergency`,
        {
          patient_id: patientId,
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert(
        'Help is Coming',
        'Your caregiver has been notified and will contact you soon.',
        [{ text: 'OK' }]
      );

      Speech.speak('Help is on the way. Your caregiver has been notified.', { language: 'en' });
    } catch (error) {
      Alert.alert('Error', 'Could not send emergency alert. Please call your caregiver.');
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Help</Text>
      <Text style={styles.subtitle}>Press the button if you need help</Text>

      <TouchableOpacity
        style={[styles.sosButton, sending && styles.sosButtonDisabled]}
        onPress={handleEmergency}
        disabled={sending}
      >
        <Text style={styles.sosIcon}>🚨</Text>
        <Text style={styles.sosText}>SOS</Text>
        <Text style={styles.sosSubtext}>Press for Help</Text>
      </TouchableOpacity>

      <Text style={styles.info}>
        This will immediately notify your caregiver with your current location
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 50,
    textAlign: 'center',
    color: '#666',
  },
  sosButton: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#E74C3C',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  sosButtonDisabled: {
    backgroundColor: '#95A5A6',
  },
  sosIcon: {
    fontSize: 80,
  },
  sosText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
  },
  sosSubtext: {
    fontSize: 20,
    color: '#FFF',
    marginTop: 5,
  },
  info: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
    paddingHorizontal: 20,
  },
});
