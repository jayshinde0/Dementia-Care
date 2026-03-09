import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Text, Animated, View } from 'react-native';
import { PhoneCall } from 'lucide-react-native';

const SOSButton = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Breathing animation (scale up and down 2%)
    const breathing = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.02,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    
    breathing.start();

    return () => breathing.stop();
  }, [scaleValue]);

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.container, { transform: [{ scale: scaleValue }] }]}>
        <TouchableOpacity 
          activeOpacity={0.8}
          style={styles.button}
        >
          {/* Subtle inner top highlight */}
          <View style={styles.highlight} />
          <PhoneCall size={32} color="#FFFFFF" />
          <Text style={styles.text}>I Need Help</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 30,
    left: 24,
    right: 24,
    zIndex: 50,
  },
  container: {
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  button: {
    backgroundColor: '#EF4444',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    overflow: 'hidden',
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    marginLeft: 16,
    letterSpacing: -0.5,
  }
});

export default SOSButton;
