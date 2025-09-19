import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { PokedexContainer, PokedexBody, PokedexScreen, SectionHeader } from "../styles";

type PokemonData = {
  id: number;
  name: string;
  sprites: { other?: { ["official-artwork"]: { front_default: string } } };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  height: number;
  weight: number;
};

const PokemonCompare: React.FC = () => {
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [data1, setData1] = useState<PokemonData | null>(null);
  const [data2, setData2] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = async (nameOrId: string): Promise<PokemonData> => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase().trim()}`);
    if (!res.ok) throw new Error("Pokémon não encontrado");
    return res.json();
  };

  const handleCompare = async () => {
    if (!pokemon1 || !pokemon2) {
      setError("Digite dois pokémons para comparar");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const [p1, p2] = await Promise.all([fetchPokemon(pokemon1), fetchPokemon(pokemon2)]);
      setData1(p1);
      setData2(p2);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar pokémons");
    } finally {
      setLoading(false);
    }
  };

  // Matriz de fraquezas/resistências básica
  const typeChart: Record<string, string[]> = {
    fire: ["grass", "ice", "bug", "steel"],
    water: ["fire", "ground", "rock"],
    grass: ["water", "ground", "rock"],
    electric: ["water", "flying"],
    ground: ["fire", "electric", "poison", "rock", "steel"],
    rock: ["fire", "ice", "flying", "bug"],
    fighting: ["normal", "rock", "steel", "ice", "dark"],
    psychic: ["fighting", "poison"],
    dark: ["psychic", "ghost"],
    ghost: ["psychic", "ghost"],
    ice: ["grass", "ground", "flying", "dragon"],
    dragon: ["dragon"],
    bug: ["grass", "psychic", "dark"],
    steel: ["ice", "rock", "fairy"],
    fairy: ["fighting", "dragon", "dark"],
    poison: ["grass", "fairy"],
    flying: ["grass", "fighting", "bug"],
  };

  const hasTypeAdvantage = (attacker: PokemonData, defender: PokemonData) => {
    const attackerTypes = attacker.types.map(t => t.type.name);
    const defenderTypes = defender.types.map(t => t.type.name);
    for (let atkType of attackerTypes) {
      if (typeChart[atkType]) {
        for (let strongAgainst of typeChart[atkType]) {
          if (defenderTypes.includes(strongAgainst)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const getComparisonResult = (p1: PokemonData, p2: PokemonData) => {
    const total1 = p1.stats.reduce((acc, s) => acc + s.base_stat, 0);
    const total2 = p2.stats.reduce((acc, s) => acc + s.base_stat, 0);

    const p1Adv = hasTypeAdvantage(p1, p2);
    const p2Adv = hasTypeAdvantage(p2, p1);

    let winner: PokemonData | null = null;
    let reason = "";

    if (total1 > total2) {
      winner = p1;
      reason += `Tem stats totais mais altos (${total1} vs ${total2}). `;
    } else if (total2 > total1) {
      winner = p2;
      reason += `Tem stats totais mais altos (${total2} vs ${total1}). `;
    } else {
      reason += `Ambos têm stats totais iguais (${total1}). `;
    }

    if (p1Adv && !p2Adv) {
      winner = p1;
      reason += `${p1.name} tem vantagem de tipo contra ${p2.name}.`;
    } else if (p2Adv && !p1Adv) {
      winner = p2;
      reason += `${p2.name} tem vantagem de tipo contra ${p1.name}.`;
    } else if (p1Adv && p2Adv) {
      reason += `Ambos têm tipos que se contra-atacam.`;
    } else {
      reason += `Nenhum tem vantagem clara de tipos.`;
    }

    return { winner, reason };
  };

  const renderPokemonCard = (pokemon: PokemonData) => (
    <View style={styles.card}>
      <Image
        source={{ uri: pokemon.sprites.other?.["official-artwork"].front_default }}
        style={styles.image}
      />
      <Text style={styles.name}>{pokemon.name}</Text>

      <SectionHeader>🔥 Tipos</SectionHeader>
      <Text style={styles.info}>{pokemon.types.map(t => t.type.name).join(", ")}</Text>

      <SectionHeader>📏 Altura e Peso</SectionHeader>
      <Text style={styles.info}>
        {(pokemon.height / 10).toFixed(1)} m / {(pokemon.weight / 10).toFixed(1)} kg
      </Text>

      <SectionHeader>📊 Estatísticas</SectionHeader>
      {pokemon.stats.map((stat, idx) => (
        <View key={idx} style={styles.statRow}>
          <Text style={styles.label}>{stat.stat.name.replace("-", " ")}</Text>
          <Text style={styles.value}>{stat.base_stat}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <PokedexContainer>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <PokedexBody>
            <PokedexScreen>
              <SectionHeader>⚔️ Comparar Pokémons</SectionHeader>

              <TextInput
                style={styles.input}
                placeholder="Nome ou número do 1º Pokémon"
                value={pokemon1}
                onChangeText={setPokemon1}
              />
              <TextInput
                style={styles.input}
                placeholder="Nome ou número do 2º Pokémon"
                value={pokemon2}
                onChangeText={setPokemon2}
              />
              <TouchableOpacity style={styles.button} onPress={handleCompare}>
                <Text style={styles.buttonText}>Comparar</Text>
              </TouchableOpacity>

              {loading && (
                <View style={styles.center}>
                  <ActivityIndicator size="large" color="#e74c3c" />
                </View>
              )}

              {error && <Text style={styles.error}>{error}</Text>}

              {data1 && renderPokemonCard(data1)}
              {data2 && renderPokemonCard(data2)}

              {data1 && data2 && (
                (() => {
                  const { winner, reason } = getComparisonResult(data1, data2);
                  if (!winner) {
                    return (
                      <View style={styles.resultCard}>
                        <SectionHeader>🏆 Resultado</SectionHeader>
                        <Text style={styles.resultText}>Empate!</Text>
                        <Text style={styles.resultReason}>{reason}</Text>
                      </View>
                    );
                  }
                  return (
                    <View style={styles.resultCard}>
                      <SectionHeader>🏆 Vencedor</SectionHeader>
                      <Image
                        source={{ uri: winner.sprites.other?.["official-artwork"].front_default }}
                        style={styles.winnerImage}
                      />
                      <Text style={styles.winnerName}>{winner.name}</Text>
                      <Text style={styles.resultReason}>{reason}</Text>
                    </View>
                  );
                })()
              )}
            </PokedexScreen>
          </PokedexBody>
        </ScrollView>
      </KeyboardAvoidingView>
    </PokedexContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#e74c3c",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
  },
  image: { width: 150, height: 150, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 10, textTransform: "capitalize" },
  info: { fontSize: 16, textAlign: "center", marginBottom: 10 },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 4,
  },
  label: { fontSize: 16, fontWeight: "600" },
  value: { fontSize: 16, fontWeight: "bold" },
  center: { marginVertical: 20, alignItems: "center" },
  error: { color: "#e74c3c", textAlign: "center", marginVertical: 10 },
  resultCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    alignItems: "center",
  },
  resultText: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  winnerImage: { width: 180, height: 180, marginBottom: 10 },
  winnerName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "capitalize",
    color: "#2c3e50",
  },
  resultReason: { fontSize: 16, textAlign: "center", color: "#555" },
});

export default PokemonCompare;
