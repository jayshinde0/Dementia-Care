import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';

export default function CognitiveGamesScreen() {
  const games = [
    { title: 'Memory Match', icon: '🎴', description: 'Match the cards' },
    { title: 'Word Puzzle', icon: '🔤', description: 'Find the words' },
    { title: 'Number Game', icon: '🔢', description: 'Count and match' },
    { title: 'Photo Album', icon: '📷', description: 'Remember faces' },
  ];

  const handleGamePress = (game) => {
    Speech.speak(`Starting ${game.title}`, { language: 'en' });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Brain Exercise Games</Text>
      <Text style={styles.subtitle}>Keep your mind active!</Text>

      {games.map((game, index) => (
        <TouchableOpacity
          key={index}
          style={styles.gameCard}
          onPress={() => handleGamePress(game)}
        >
          <Text style={styles.gameIcon}>{game.icon}</Text>
          <View style={styles.gameInfo}>
            <Text style={styles.gameTitle}>{game.title}</Text>
            <Text style={styles.gameDesc}>{game.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 30,
  },
  gameCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 3,
  },
  gameIcon: {
    fontSize: 60,
    marginRight: 20,
  },
  gameInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  gameTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gameDesc: {
    fontSize: 18,
    color: '#666',
  },
});
