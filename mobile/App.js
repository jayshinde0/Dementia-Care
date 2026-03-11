import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import taskPollingService from './src/services/taskPollingService';
import TaskOverlay from './src/components/TaskOverlay';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import RemindersScreen from './src/screens/RemindersScreen';
import TasksScreen from './src/screens/TasksScreen';
import HealthTrackingScreen from './src/screens/HealthTrackingScreen';
import CognitiveGamesScreen from './src/screens/CognitiveGamesScreen';
import EmergencyScreen from './src/screens/EmergencyScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  const [currentTask, setCurrentTask] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    requestPermissions();
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // Start polling for tasks (fallback for socket connection issues)
      console.log('User logged in, starting task polling...');
      taskPollingService.start();
      
      // Listen for incoming tasks
      taskPollingService.onTaskReceived((task) => {
        setCurrentTask(task);
      });

      return () => {
        taskPollingService.stop();
      };
    }
  }, [isLoggedIn]);

  const checkLoginStatus = async () => {
    const userId = await AsyncStorage.getItem('userId');
    setIsLoggedIn(!!userId);
  };

  const requestPermissions = async () => {
    await Location.requestForegroundPermissionsAsync();
  };

  const handleDismissTask = () => {
    setCurrentTask(null);
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Reminders" component={RemindersScreen} />
          <Stack.Screen name="Tasks" component={TasksScreen} />
          <Stack.Screen name="Health" component={HealthTrackingScreen} />
          <Stack.Screen name="Games" component={CognitiveGamesScreen} />
          <Stack.Screen name="Emergency" component={EmergencyScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* Task Overlay - Shows on top of everything */}
      {currentTask && (
        <TaskOverlay task={currentTask} onDismiss={handleDismissTask} />
      )}
    </>
  );
}
