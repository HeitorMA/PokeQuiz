import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/about.png')} style={styles.logo} />
      <Text style={styles.title}>PokeQuiz</Text>
      <Text style={styles.subtitle}>Desafio para os verdadeiros mestres Pokémon!</Text>

      <View style={styles.infoContainer}>
        <Ionicons name="game-controller" size={24} color="#00C2FF" />
        <Text style={styles.infoText}>Versão: 1.0.1</Text>
      </View>
      <View style={styles.infoContainer}>
        <Ionicons name="code-working" size={24} color="#00C2FF" />
        <Text style={styles.infoText}>Desenvolvido por: Heitor Dev</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00C2FF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAA',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 10,
  },
});

export default AboutScreen;
