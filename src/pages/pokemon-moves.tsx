import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PokedexBody, PokedexContainer, PokedexScreen, SectionHeader } from "../styles";
import api from "../services/api";

type RootStackParamList = {
  "pokemon-moves": { id: number; types: string[] };
};

type PokemonMove = {
  move: { name: string };
  version_group_details: Array<{
    move_learn_method: { name: string };
    level_learned_at: number;
    version_group: { name: string };
  }>;
};

type PokemonResponse = {
  moves: PokemonMove[];
};

const typeColors: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ");

const PokemonMoves: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, "pokemon-moves">>();
  const { id, types } = route.params;

  const [moves, setMoves] = useState<PokemonMove[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        setLoading(true);
        const response = await api.get<PokemonResponse>(`/pokemon/${id}`);
        setMoves(response.data.moves);
      } catch (err: any) {
        setError(err.message || "Ocorreu um erro");
      } finally {
        setLoading(false);
      }
    };
    fetchMoves();
  }, [id]);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );

  // Agrupa movimentos por versão
  const movesByVersion: Record<string, PokemonMove[]> = {};
  moves.forEach((move) => {
    move.version_group_details.forEach((detail) => {
      const version = detail.version_group.name;
      if (!movesByVersion[version]) movesByVersion[version] = [];
      movesByVersion[version].push(move);
    });
  });

  return (
    <PokedexContainer>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <PokedexBody>
          <PokedexScreen>
          <SectionHeader>📊 Movimentos</SectionHeader>
            {Object.keys(movesByVersion).map((version) => (
              <View key={version} style={styles.versionSection}>
                <SectionHeader>{capitalize(version)}</SectionHeader>
                {movesByVersion[version].map((move, index) => {
                  const details = move.version_group_details.filter(
                    (d) => d.version_group.name === version
                  );
                  return (
                    <View
                      key={index}
                      style={[
                        styles.moveCard,
                        { borderLeftColor: typeColors[types[0]] || "#2c3e50" },
                      ]}
                    >
                      <Text style={styles.moveName}>
                        {capitalize(move.move.name)}
                      </Text>
                      {details.map((d, idx) => (
                        <View key={idx} style={styles.moveDetails}>
                          <Text style={styles.moveInfo}>
                            Método: {capitalize(d.move_learn_method.name)}
                          </Text>
                          <Text style={styles.moveInfo}>
                            Nível: {d.level_learned_at || "?"}
                          </Text>
                        </View>
                      ))}
                    </View>
                  );
                })}
              </View>
            ))}
          </PokedexScreen>
        </PokedexBody>
      </ScrollView>
    </PokedexContainer>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "#e74c3c", fontSize: 16 },
  title: { fontSize: 28,  marginBottom: 20, color: "#333" },
  versionSection: { marginBottom: 25 },
  versionTitle: { fontSize: 22,  marginBottom: 10 },
  moveCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 18,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  moveName: { fontSize: 20, fontWeight: "bold", marginBottom: 8, color: "#222" },
  moveDetails: { marginLeft: 0, marginBottom: 4 },
  moveInfo: { fontSize: 16, color: "#555" },
});

export default PokemonMoves;
