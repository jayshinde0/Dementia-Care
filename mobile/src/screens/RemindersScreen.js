import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import axios from 'axios';

const API_URL = 'http://192.168.1.37:8000/api';

export default function RemindersScreen() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const patientId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');

      const response = await axios.get(`${API_URL}/reminders/patient/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReminders(response.data);
    } catch (error) {
      console.error('Error loading reminders:', error);
    }
  };

  const completeReminder = async (reminder) => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      await axios.post(
        `${API_URL}/reminders/${reminder._id}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Speech.speak('Great job! Reminder completed.', { language: 'en' });
      loadReminders();
    } catch (error) {
      console.error('Error completing reminder:', error);
    }
  };

  const getReminderIcon = (type) => {
    const icons = {
      medication: 'medical-outline',
      meal: 'restaurant-outline',
      appointment: 'calendar-outline',
      task: 'checkmark-circle-outline',
    };
    return icons[type] || 'notifications-outline';
  };

  const renderReminder = ({ item }) => (
    <TouchableOpacity
      style={styles.reminderCard}
      onPress={() => {
        Speech.speak(item.title + '. ' + item.description, { language: 'en' });
        completeReminder(item);
      }}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={getReminderIcon(item.type)} size={28} color="#1E293B" />
      </View>
      <View style={styles.reminderContent}>
        <Text style={styles.reminderTitle}>{item.title}</Text>
        <Text style={styles.reminderTime}>{item.scheduled_time}</Text>
        {item.description && (
          <Text style={styles.reminderDesc}>{item.description}</Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E293B" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reminders</Text>
      </View>

      <FlatList
        data={reminders}
        renderItem={renderReminder}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="checkmark-done-circle-outline" size={64} color="#CBD5E1" />
            <Text style={styles.emptyText}>All caught up!</Text>
            <Text style={styles.emptySubtext}>No reminders for today</Text>
          </View>
        }
      />
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
  list: {
    padding: 20,
    paddingBottom: 40,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  reminderTime: {
    fontSize: 14,
    color: '#0891B2',
    fontWeight: '500',
    marginBottom: 4,
  },
  reminderDesc: {
    fontSize: 14,
    color: '#94A3B8',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
});
