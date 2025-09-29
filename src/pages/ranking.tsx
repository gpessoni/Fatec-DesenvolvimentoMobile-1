import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
    Modal,
    Pressable,
    ScrollView,
    Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    PokedexBody,
    PokedexContainer,
    PokedexScreen,
    PokemonCardImage,
    PokemonCardInfo,
    PokemonCardName,
    SectionHeader,
} from "../styles";

type RankingUser = {
    name: string;
    email: string;
    course?: string;
    pokemonCount: number;
    lastActivity?: string;
    pokemons?: any[];
};

const Ranking: React.FC = () => {
    const [ranking, setRanking] = useState<RankingUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<RankingUser | null>(null);
    const [battleResult, setBattleResult] = useState<{ winner: string; reason: string } | null>(null);
    const [battleLoading, setBattleLoading] = useState(false);

    useEffect(() => {
        const loadRanking = async () => {
            try {
                setLoading(true);

                const keys = await AsyncStorage.getAllKeys();
                console.log("Todas as chaves:", keys);

                // Filtra apenas as chaves de pokemons
                const pokemonKeys = keys.filter((k) => k.startsWith("pokemons:"));

                const usersData: RankingUser[] = [];

                for (const key of pokemonKeys) {
                    const email = key.replace("pokemons:", "");

                    // Pega os pokémons
                    const pokemonsStr = await AsyncStorage.getItem(key);
                    const pokemons = pokemonsStr ? JSON.parse(pokemonsStr) : [];

                    // Pega os dados do usuário usando a chave correta
                    const userStr = await AsyncStorage.getItem(`user:${email}`);
                    const userData = userStr ? JSON.parse(userStr) : null;

                    const name = userData?.name || email.split("@")[0];
                    const lastActivity = userData?.lastActivity || "Sem atividade";

                    usersData.push({
                        name,
                        email,
                        pokemonCount: pokemons.length,
                        lastActivity,
                        pokemons,
                    });

                    console.log("👤 Usuário carregado:", {
                        name,
                        email,
                        pokemonCount: pokemons.length,
                        lastActivity,
                    });
                }

                // Ordena pelo maior número de pokémons
                usersData.sort((a, b) => b.pokemonCount - a.pokemonCount);

                setRanking(usersData);
                console.log("📊 Ranking completo:", usersData);

            } catch (error) {
                console.error("❌ Erro ao carregar ranking:", error);
            } finally {
                setLoading(false);
            }
        };

        loadRanking();
    }, []);


    // --- BATTLE HELPERS ---
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

    const hasAdvantage = (attacker: any, defender: any): boolean => {
        const attackerTypes: string[] = (attacker?.types || []).map((t: any) => t.name || t.type?.name).filter(Boolean);
        const defenderTypes: string[] = (defender?.types || []).map((t: any) => t.name || t.type?.name).filter(Boolean);
        for (const atk of attackerTypes) {
            const strongAgainst = typeChart[atk];
            if (!strongAgainst) continue;
            for (const def of defenderTypes) {
                if (strongAgainst.includes(def)) return true;
            }
        }
        return false;
    };

    const sumTeamStats = (team: any[]): number => {
        return (team || []).reduce((total, p) => {
            const statsSum = (p?.stats || []).reduce((acc: number, s: any) => acc + (s?.base_stat || 0), 0);
            return total + statsSum;
        }, 0);
    };

    const countTeamAdvantages = (teamA: any[], teamB: any[]): number => {
        let count = 0;
        for (const a of teamA || []) {
            for (const b of teamB || []) {
                if (hasAdvantage(a, b)) {
                    count += 1;
                    break; // conta pelo menos uma vantagem por Pokémon
                }
            }
        }
        return count;
    };

    const handleBattle = async () => {
        if (!selectedUser) return;
        try {
            setBattleLoading(true);
            setBattleResult(null);

            const currentUserStr = await AsyncStorage.getItem("currentUser");
            if (!currentUserStr) {
                setBattleResult({ winner: selectedUser.name, reason: "Você não está logado." });
                return;
            }
            const currentUser = JSON.parse(currentUserStr);
            const myKey = `pokemons:${currentUser.email}`;
            const myPokemonsStr = await AsyncStorage.getItem(myKey);
            const myPokemons = myPokemonsStr ? JSON.parse(myPokemonsStr) : [];

            const opponentPokemons = selectedUser.pokemons || [];

            if ((myPokemons?.length || 0) === 0 && (opponentPokemons?.length || 0) === 0) {
                setBattleResult({ winner: "Empate", reason: "Nenhum dos dois tem Pokémons." });
                return;
            }
            if ((myPokemons?.length || 0) === 0) {
                setBattleResult({ winner: selectedUser.name, reason: "Você não possui Pokémons para batalhar." });
                return;
            }
            if ((opponentPokemons?.length || 0) === 0) {
                setBattleResult({ winner: "Você", reason: `${selectedUser.name} não possui Pokémons para batalhar.` });
                return;
            }

            const myStats = sumTeamStats(myPokemons);
            const oppStats = sumTeamStats(opponentPokemons);

            const myAdv = countTeamAdvantages(myPokemons, opponentPokemons);
            const oppAdv = countTeamAdvantages(opponentPokemons, myPokemons);

            const ADVANTAGE_BONUS = 50; // peso da vantagem de tipos
            const myScore = myStats + myAdv * ADVANTAGE_BONUS;
            const oppScore = oppStats + oppAdv * ADVANTAGE_BONUS;

            let winner = "Empate";
            let reason = `Seus pontos: ${myScore} (stats ${myStats} + vantagens ${myAdv}). ` +
                         `Pontos de ${selectedUser.name}: ${oppScore} (stats ${oppStats} + vantagens ${oppAdv}). `;

            if (myScore > oppScore) {
                winner = "Você";
                reason += "Sua equipe é mais forte considerando stats e vantagens de tipos.";
            } else if (oppScore > myScore) {
                winner = selectedUser.name;
                reason += "A equipe do oponente é mais forte considerando stats e vantagens de tipos.";
            } else {
                reason += "As equipes estão equilibradas.";
            }

            setBattleResult({ winner, reason });
        } catch (e) {
            setBattleResult({ winner: selectedUser?.name || "Oponente", reason: "Erro ao simular a batalha." });
        } finally {
            setBattleLoading(false);
        }
    };


    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#e74c3c" />
            </View>
        );
    }

    const renderItem = ({ item, index }: { item: RankingUser; index: number }) => {
        const podiumColors = ["#FFD700", "#C0C0C0", "#CD7F32"]; // ouro, prata, bronze
        const isTop3 = index < 3;

        return (
            <View
                style={[
                    styles.card,
                    isTop3 && { borderLeftColor: podiumColors[index] },
                ]}
            >
                <Text style={[styles.position, isTop3 && { color: podiumColors[index] }]}>
                    {index + 1}º
                </Text>
                <View style={{ flex: 1 }}>
                    <Pressable onPress={() => { setSelectedUser(item); setModalVisible(true); }}>
                        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                            {item.name}
                        </Text>
                    </Pressable>
                    {item.course && <Text style={styles.course}>{item.course}</Text>}
                </View>
                <Text style={styles.count}>{item.pokemonCount} 🐾</Text>
            </View>
        );
    };

    return (
        <>
            <PokedexContainer>
                <PokedexBody>
                    <PokedexScreen>
                        <SectionHeader>🏆 Ranking de Treinadores</SectionHeader>

                        <FlatList
                            data={ranking}
                            keyExtractor={(item) => item.email}
                            renderItem={renderItem}
                            contentContainerStyle={{ paddingBottom: 30 }}
                        />
                    </PokedexScreen>
                </PokedexBody>
            </PokedexContainer>

            {/* Modal com pokémons do usuário selecionado */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>Pokémons de {selectedUser?.name}</Text>
                        <ScrollView>
                            {selectedUser?.pokemons?.map((p, i) => (
                                <View key={i} style={styles.pokemonRow}>
                                    <PokemonCardImage source={{ uri: p.sprites.front_default }} />
                                    <PokemonCardInfo>
                                        <PokemonCardName>
                                            {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                                        </PokemonCardName>
                                    </PokemonCardInfo>

                                </View>
                            ))}
                            {(!selectedUser?.pokemons || selectedUser?.pokemons?.length === 0) && (
                                <Text style={styles.emptyText}>Nenhum Pokémon capturado.</Text>
                            )}
                        </ScrollView>
                        {battleResult && (
                            <View style={styles.resultCard}>
                                <Text style={styles.resultTitle}>Resultado da Batalha</Text>
                                <Text style={styles.resultWinner}>Vencedor: {battleResult.winner}</Text>
                                <Text style={styles.resultReason}>{battleResult.reason}</Text>
                            </View>
                        )}
                        <Pressable style={[styles.battleButton, battleLoading && { opacity: 0.7 }]} onPress={handleBattle} disabled={battleLoading}>
                            <Text style={styles.battleButtonText}>{battleLoading ? "Calculando..." : "Batalhar"}</Text>
                        </Pressable>
                        <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 8,
        borderLeftColor: "#2c3e50",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    position: { fontSize: 20, fontWeight: "bold", width: 40 },
    name: { fontSize: 18, fontWeight: "600", color: "#222" },
    course: { fontSize: 14, color: "#777" },
    count: { fontSize: 18, fontWeight: "bold", color: "#e74c3c" },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        padding: 20,
    },
    modalCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        maxHeight: "80%",
    },
    modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
    pokemonRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
    },
    pokemonAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
    pokemonAvatarFallback: { backgroundColor: "#eee" },
    pokemonName: { fontSize: 16 },
    emptyText: { textAlign: "center", color: "#777", marginVertical: 10 },
    closeButton: {
        marginTop: 12,
        backgroundColor: "#2196F3",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    closeButtonText: { color: "#fff", fontWeight: "bold" },
    battleButton: {
        marginTop: 12,
        backgroundColor: "#e74c3c",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    battleButtonText: { color: "#fff", fontWeight: "bold" },
    resultCard: {
        backgroundColor: "#f8f8f8",
        borderRadius: 10,
        padding: 12,
        marginTop: 10,
    },
    resultTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
    resultWinner: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
    resultReason: { fontSize: 14, color: "#555" },
});

export default Ranking;
