import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    loadUserData();
    setGreetingMessage();
  }, []);

  const loadUserData = async () => {
    const name = await AsyncStorage.getItem('userName');
    setUserName(name || 'Friend');
  };

  const setGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  };

  const speak = (text) => {
    Speech.speak(text, { language: 'en' });
  };

  const menuItems = [
    { title: 'My Reminders', icon: '🔔', screen: 'Reminders', color: '#FF6B6B' },
    { title: 'My Tasks', icon: '✓', screen: 'Tasks', color: '#4ECDC4' },
    { title: 'How I Feel', icon: '😊', screen: 'Health', color: '#95E1D3' },
    { title: 'Brain Games', icon: '🧠', screen: 'Games', color: '#F38181' },
    { title: 'Emergency', icon: '🚨', screen: 'Emergency', color: '#E74C3C' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{greeting},</Text>
        <Text style={styles.name}>{userName}!</Text>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, { backgroundColor: item.color }]}
            onPress={() => {
              speak(item.title);
              navigation.navigate(item.screen);
            }}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 30,
    backgroundColor: '#4A90E2',
  },
  greeting: {
    fontSize: 28,
    color: '#FFF',
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
  },
  menu: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    fontSize: 48,
    marginRight: 20,
  },
  menuText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
