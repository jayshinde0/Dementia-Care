import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState('John Smith');
  const [greeting, setGreeting] = useState('Good Morning');

  useEffect(() => {
    loadUserData();
    setGreetingMessage();
  }, []);

  const loadUserData = async () => {
    const name = await AsyncStorage.getItem('userName');
    if (name) setUserName(name);
  };

  const setGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  };

  const menuItems = [
    {
      title: 'Reminders',
      subtitle: 'View your daily reminders',
      icon: 'notifications-outline',
      screen: 'Reminders',
      bgColor: '#F8F9FA',
    },
    {
      title: 'Tasks',
      subtitle: 'Check your to-do list',
      icon: 'checkmark-circle-outline',
      screen: 'Tasks',
      bgColor: '#F8F9FA',
    },
    {
      title: 'Health',
      subtitle: 'Track how you feel',
      icon: 'heart-outline',
      screen: 'Health',
      bgColor: '#F8F9FA',
    },
    {
      title: 'Brain Games',
      subtitle: 'Exercise your mind',
      icon: 'game-controller-outline',
      screen: 'Games',
      bgColor: '#F8F9FA',
    },
    {
      title: 'Emergency',
      subtitle: 'Get help immediately',
      icon: 'alert-circle-outline',
      screen: 'Emergency',
      bgColor: '#FFE8E8',
      textColor: '#DC3545',
    },
  ];

  const handleMenuPress = (item) => {
    Speech.speak(`Opening ${item.title}`, { language: 'en' });
    navigation.navigate(item.screen);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E293B" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Day</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.name}>{userName}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuCard, { backgroundColor: item.bgColor }]}
              onPress={() => handleMenuPress(item)}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons 
                  name={item.icon} 
                  size={28} 
                  color={item.textColor || '#1E293B'} 
                />
              </View>
              <View style={styles.menuContent}>
                <Text style={[styles.menuTitle, item.textColor && { color: item.textColor }]}>
                  {item.title}
                </Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
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
    paddingBottom: 40,
  },
  greetingSection: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  greeting: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 4,
  },
  name: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
  },
});
