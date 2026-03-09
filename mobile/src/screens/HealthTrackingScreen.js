import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

export default function HealthTrackingScreen() {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { icon: 'happy-outline', label: 'Happy', value: 'happy', color: '#10B981' },
    { icon: 'remove-circle-outline', label: 'Okay', value: 'okay', color: '#0891B2' },
    { icon: 'sad-outline', label: 'Sad', value: 'sad', color: '#FB7185' },
    { icon: 'alert-circle-outline', label: 'Worried', value: 'anxious', color: '#F59E0B' },
    { icon: 'help-circle-outline', label: 'Confused', value: 'confused', color: '#94A3B8' },
  ];

  const trackingOptions = [
    { icon: 'bed-outline', label: 'Sleep', color: '#E0F2FE' },
    { icon: 'walk-outline', label: 'Activity', color: '#D1FAE5' },
    { icon: 'water-outline', label: 'Water', color: '#F0F9FF' },
  ];

  const handleMoodSelection = async (mood) => {
    setSelectedMood(mood.value);
    Speech.speak(`You are feeling ${mood.label}`, { language: 'en' });

    // Save mood locally for now since backend endpoint might not be set up
    try {
      await AsyncStorage.setItem('currentMood', mood.value);
      await AsyncStorage.setItem('moodTimestamp', new Date().toISOString());
      
      Alert.alert('Thank You', 'Your mood has been recorded');
    } catch (error) {
      console.error('Error saving mood locally:', error);
    }
  };

  const handleTrackingOption = (option) => {
    Speech.speak(`Tracking ${option.label}`, { language: 'en' });
    Alert.alert(option.label, `${option.label} tracking feature coming soon!`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E293B" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Health Tracking</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>How are you feeling today?</Text>

        <View style={styles.moodGrid}>
          {moods.map((mood, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.moodButton,
                selectedMood === mood.value && { backgroundColor: mood.color, borderColor: mood.color },
              ]}
              onPress={() => handleMoodSelection(mood)}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={mood.icon} 
                size={40} 
                color={selectedMood === mood.value ? '#FFFFFF' : mood.color} 
              />
              <Text style={[
                styles.moodLabel,
                selectedMood === mood.value && { color: '#FFFFFF' }
              ]}>
                {mood.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subtitle}>Track Your Day</Text>

        <View style={styles.trackingOptions}>
          {trackingOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.trackButton, { backgroundColor: option.color }]}
              onPress={() => handleTrackingOption(option)}
              activeOpacity={0.7}
            >
              <View style={styles.trackIconContainer}>
                <Ionicons name={option.icon} size={32} color="#1E293B" />
              </View>
              <Text style={styles.trackText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 24,
    textAlign: 'center',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  moodButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#F8F9FA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  moodLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 20,
  },
  trackingOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackButton: {
    width: '31%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  trackIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  trackText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
});
