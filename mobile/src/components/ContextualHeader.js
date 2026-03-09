import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sun, CloudRain } from 'lucide-react-native';

const ContextualHeader = ({ userName = "John" }) => {
  const currentHour = new Date().getHours();
  
  let greeting = "Good Morning";
  let weatherCondition = "sunny";
  
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good Afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good Evening";
    weatherCondition = "clear";
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>{greeting},</Text>
        <Text style={styles.name}>{userName}</Text>
      </View>
      
      <View style={styles.weatherWidget}>
         {weatherCondition === 'sunny' || weatherCondition === 'clear' ? (
             <Sun size={32} color="#F59E0B" />
         ) : (
             <CloudRain size={32} color="#3B82F6" />
         )}
         <Text style={styles.temp}>72°</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#F8FAFC',
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '500',
    color: '#64748B',
    marginBottom: 4,
  },
  name: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0F766E',
    letterSpacing: -1,
  },
  weatherWidget: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  temp: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F766E',
    marginLeft: 8,
  }
});

export default ContextualHeader;
