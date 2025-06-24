import axios from 'axios';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Pokemon {
  name: string;
  image: string;
}

const Index = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const randomId = Math.floor(Math.random() * 151) + 1;
      const id = randomId.toString().padStart(3, '0');

      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const fullImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;

      const correctName = response.data.name;
      const wrongOptions = await fetchWrongOptions(correctName);
      const choices = shuffleArray([correctName, ...wrongOptions]);

      setPokemon({ name: correctName, image: fullImage });
      setOptions(choices);
    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);
    }
    setLoading(false);
  };

  const fetchWrongOptions = async (correctName: string) => {
    const wrongNames = new Set<string>();
    while (wrongNames.size < 3) {
      const randomId = Math.floor(Math.random() * 151) + 1;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (response.data.name !== correctName) {
        wrongNames.add(response.data.name);
      }
    }
    return Array.from(wrongNames);
  };

  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (selected: string) => {
    if (selected === pokemon?.name) {
      Alert.alert('🎉 Correto!', 'Você acertou!', [{ text: 'Próximo', onPress: fetchPokemon }]);
    } else {
      Alert.alert('❌ Errado!', `O nome correto era ${pokemon?.name}`, [{ text: 'Tentar novamente' }]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFF" />
      ) : (
        <>
          <Image source={{ uri: pokemon?.image }} style={styles.pokemonImage} resizeMode="contain" />
          <Text style={styles.questionText}>Qual é esse Pokémon?</Text>
          {options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={() => handleAnswer(option)}>
              <Text style={styles.buttonText}>{option.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
          <Link href="/about" style={styles.about}>Sobre</Link>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  pokemonImage: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00C2FF',
    padding: 12,
    width: '80%',
    alignItems: 'center',
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  about: {
    fontSize: 12,
    color: '#888',
    fontWeight: 'bold',
    marginTop: 40,
  },
});

export default Index;
