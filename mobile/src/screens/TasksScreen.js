import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';

export default function TasksScreen() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Brush teeth', completed: false },
    { id: '2', title: 'Take morning walk', completed: false },
    { id: '3', title: 'Call family', completed: false },
    { id: '4', title: 'Water plants', completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    Speech.speak('Task completed. Great job!', { language: 'en' });
  };

  const renderTask = ({ item }) => (
    <TouchableOpacity
      style={[styles.taskCard, item.completed && styles.taskCompleted]}
      onPress={() => toggleTask(item.id)}
    >
      <View style={styles.checkbox}>
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Daily Tasks</Text>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
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
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
  },
  taskCompleted: {
    backgroundColor: '#E8F5E9',
  },
  checkbox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#4A90E2',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 28,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  taskText: {
    fontSize: 24,
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});
