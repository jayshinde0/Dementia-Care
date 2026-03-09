import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import axios from 'axios';

const API_URL = 'http://192.168.1.37:8000/api';

export default function HealthTrackingScreen() {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😐', label: 'Okay', value: 'okay' },
    { emoji: '😔', label: 'Sad', value: 'sad' },
    { emoji: '😰', label: 'Worried', value: 'anxious' },
    { emoji: '😕', label: 'Confused', value: 'confused' },
  ];

  const handleMoodSelection = async (mood) => {
    setSelectedMood(mood.value);
    Speech.speak(`You are feeling ${mood.label}`, { language: 'en' });

    try {
      const patientId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');

      await axios.post(
        `${API_URL}/activities/health`,
        {
          patient_id: patientId,
          mood: mood.value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert('Thank You', 'Your mood has been recorded');
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>

      <View style={styles.moodGrid}>
        {moods.map((mood, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.moodButton,
              selectedMood === mood.value && styles.moodButtonSelected,
            ]}
            onPress={() => handleMoodSelection(mood)}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={styles.moodLabel}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>Track Your Day</Text>

      <View style={styles.trackingOptions}>
        <TouchableOpacity style={styles.trackButton}>
          <Text style={styles.trackIcon}>😴</Text>
          <Text style={styles.trackText}>Sleep</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.trackButton}>
          <Text style={styles.trackIcon}>🚶</Text>
          <Text style={styles.trackText}>Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.trackButton}>
          <Text style={styles.trackIcon}>💧</Text>
          <Text style={styles.trackText}>Water</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  moodButton: {
    width: '28%',
    aspectRatio: 1,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  moodButtonSelected: {
    backgroundColor: '#4A90E2',
  },
  moodEmoji: {
    fontSize: 48,
    marginBottom: 5,
  },
  moodLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  trackingOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  trackButton: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '30%',
    elevation: 2,
  },
  trackIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  trackText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
