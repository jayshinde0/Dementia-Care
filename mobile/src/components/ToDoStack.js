import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pill, Droplets, Utensils, Footprints } from 'lucide-react-native';

const ToDoStack = () => {
  const todos = [
    { id: 1, title: 'Morning Meds', time: '8:00 AM', icon: <Pill size={40} color="#0F766E" />, color: '#E0F2FE', completed: false },
    { id: 2, title: 'Drink Water', time: '10:00 AM', icon: <Droplets size={40} color="#0EA5E9" />, color: '#F0F9FF', completed: false },
    { id: 3, title: 'Lunch Time', time: '12:30 PM', icon: <Utensils size={40} color="#F59E0B" />, color: '#FEF3C7', completed: false },
    { id: 4, title: 'Short Walk', time: '3:00 PM', icon: <Footprints size={40} color="#10B981" />, color: '#D1FAE5', completed: false },
  ];

  return (
    <View style={styles.container}>
      {todos.map((todo) => (
        <TouchableOpacity 
          key={todo.id} 
          activeOpacity={0.7}
          style={[styles.card, { backgroundColor: todo.color }]}
        >
          {/* Inner Shadow Fake (React Native doesn't support inset shadow well, so use borders/layers) */}
          <View style={styles.innerShadowContainer}>
            <View style={styles.iconContainer}>
              {todo.icon}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{todo.title}</Text>
              <Text style={styles.time}>{todo.time}</Text>
            </View>
            <View style={styles.checkbox}></View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 100, // Space for SOS button
    gap: 16,
  },
  card: {
    borderRadius: 32,
    minHeight: 120,
    elevation: 4, // subtle drop shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  innerShadowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderRadius: 32,
    borderTopWidth: 2,
    borderTopColor: 'rgba(255,255,255,0.8)',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.6)',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  iconContainer: {
    width: 72,
    height: 72,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  checkbox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 3,
    borderColor: '#CBD5E1',
  }
});

export default ToDoStack;
