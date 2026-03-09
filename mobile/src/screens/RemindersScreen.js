import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      medication: '💊',
      meal: '🍽️',
      appointment: '📅',
      task: '✓',
    };
    return icons[type] || '🔔';
  };

  const renderReminder = ({ item }) => (
    <TouchableOpacity
      style={styles.reminderCard}
      onPress={() => {
        Speech.speak(item.title + '. ' + item.description, { language: 'en' });
        completeReminder(item);
      }}
    >
      <Text style={styles.icon}>{getReminderIcon(item.type)}</Text>
      <View style={styles.reminderContent}>
        <Text style={styles.reminderTitle}>{item.title}</Text>
        <Text style={styles.reminderTime}>{item.scheduled_time}</Text>
        <Text style={styles.reminderDesc}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Reminders</Text>
      <FlatList
        data={reminders}
        renderItem={renderReminder}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No reminders for today</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#FFF',
  },
  list: {
    padding: 15,
  },
  reminderCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  icon: {
    fontSize: 40,
    marginRight: 15,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reminderTime: {
    fontSize: 20,
    color: '#4A90E2',
    marginBottom: 5,
  },
  reminderDesc: {
    fontSize: 18,
    color: '#666',
  },
  emptyText: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
  },
});
