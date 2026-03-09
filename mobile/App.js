import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RemindersScreen from './src/screens/RemindersScreen';
import TasksScreen from './src/screens/TasksScreen';
import EmergencyScreen from './src/screens/EmergencyScreen';
import HealthTrackingScreen from './src/screens/HealthTrackingScreen';
import CognitiveGamesScreen from './src/screens/CognitiveGamesScreen';

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
    requestPermissions();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setLoading(false);
    }
  };

  const requestPermissions = async () => {
    const { status: notifStatus } = await Notifications.requestPermissionsAsync();
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    
    if (locationStatus === 'granted') {
      startLocationTracking();
    }
  };

  const startLocationTracking = async () => {
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 300000,
        distanceInterval: 100,
      },
      (location) => {
        updateLocationOnServer(location.coords);
      }
    );
  };

  const updateLocationOnServer = async (coords) => {
    try {
      const patientId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');
      
      await fetch(`http://192.168.1.37:8000/api/patients/${patientId}/location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      });
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#4A90E2' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 24 },
        }}
      >
        {!isLoggedIn ? (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Day' }} />
            <Stack.Screen name="Reminders" component={RemindersScreen} options={{ title: 'Reminders' }} />
            <Stack.Screen name="Tasks" component={TasksScreen} options={{ title: 'My Tasks' }} />
            <Stack.Screen name="Emergency" component={EmergencyScreen} options={{ title: 'Emergency' }} />
            <Stack.Screen name="Health" component={HealthTrackingScreen} options={{ title: 'How I Feel' }} />
            <Stack.Screen name="Games" component={CognitiveGamesScreen} options={{ title: 'Brain Games' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
