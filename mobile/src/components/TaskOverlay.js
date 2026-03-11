import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const { width, height } = Dimensions.get('window');

const TaskOverlay = ({ task, onDismiss }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    // Speak the task
    Speech.speak(`New task from ${task.caregiver_name}: ${task.task_text}`, {
      language: 'en',
      pitch: 1.0,
      rate: 0.9
    });

    // Animate in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto dismiss after 8 seconds
    const timer = setTimeout(() => {
      dismissOverlay();
    }, 8000);

    return () => {
      clearTimeout(timer);
      Speech.stop();
    };
  }, []);

  const dismissOverlay = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onDismiss) onDismiss();
    });
  };

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="notifications" size={32} color="#FFFFFF" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.fromText}>New Task</Text>
            <Text style={styles.caregiverName}>{task.caregiver_name}</Text>
          </View>
        </View>

        {/* Task Content */}
        <View style={styles.content}>
          <Text style={styles.taskText}>{task.task_text}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 9999,
  },
  container: {
    margin: 20,
    marginTop: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0891B2',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  fromText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    marginBottom: 4,
  },
  caregiverName: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  content: {
    padding: 24,
    minHeight: 100,
  },
  taskText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 32,
    textAlign: 'center',
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#E2E8F0',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0891B2',
  },
});

export default TaskOverlay;
