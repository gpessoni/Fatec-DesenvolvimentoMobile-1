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
});

export default Ranking;
