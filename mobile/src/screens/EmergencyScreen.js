import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Animated, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import * as Location from 'expo-location';
import axios from 'axios';

const API_URL = 'http://172.17.30.107:8000/api';

export default function EmergencyScreen() {
  const [sending, setSending] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

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
      <StatusBar barStyle="light-content" backgroundColor="#1E293B" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergency</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Need Help?</Text>
        <Text style={styles.subtitle}>Press the button below to alert your caregiver</Text>

        <View style={styles.buttonContainer}>
          <Animated.View style={[styles.sosButton, { transform: [{ scale: pulseAnim }] }]}>
            <TouchableOpacity
              style={[styles.sosInner, sending && styles.sosButtonDisabled]}
              onPress={handleEmergency}
              disabled={sending}
              activeOpacity={0.9}
            >
              <Ionicons name="alert-circle" size={80} color="#FFFFFF" />
              <Text style={styles.sosText}>SOS</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={24} color="#1E293B" />
          <Text style={styles.info}>
            This will immediately notify your caregiver with your current location
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#1E293B',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 60,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  sosButton: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#DC3545',
    shadowColor: '#DC3545',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  sosInner: {
    width: '100%',
    height: '100%',
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  sosText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 12,
    letterSpacing: 4,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    maxWidth: 320,
  },
  info: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    marginLeft: 12,
    lineHeight: 20,
  },
});
