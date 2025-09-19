import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, TouchableOpacity, Modal, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "@expo/vector-icons/MaterialIcons";

import AllPokemons from "./pages/all-pokemons";
import Cadastro from "./pages/cadastro";
import Login from "./pages/login";
import Main from "./pages/main";
import Pokemon from "./pages/pokemon";
import PokemonMoves from "./pages/pokemon-moves";
import PokemonCompare from "./pages/compare-pokemons";

const Stack = createStackNavigator();

// Componente modal de logout
const LogoutConfirm: React.FC<{ visible: boolean; onConfirm: () => void; onCancel: () => void }> = ({
  visible,
  onConfirm,
  onCancel,
}) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Deseja realmente sair?</Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity style={[styles.modalButton, styles.cancel]} onPress={onCancel}>
            <Text style={styles.modalButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.confirm]} onPress={onConfirm}>
            <Text style={styles.modalButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default function Routes(): React.JSX.Element {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [currentNavigation, setCurrentNavigation] = useState<any>(null);

  // Verifica usuário logado
  useEffect(() => {
    const checkUser = async () => {
      const userStr = await AsyncStorage.getItem("currentUser");
      setInitialRoute(userStr ? "main" : "login");
    };
    checkUser();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  // Função para logout
  const handleLogout = async () => {
    if (currentNavigation) {
      await AsyncStorage.removeItem("currentUser");
      setShowLogoutConfirm(false);
      currentNavigation.reset({ index: 0, routes: [{ name: "login" }] });
    }
  };

  // Função que abre o modal de logout
  const openLogoutModal = (navigation: any) => {
    setCurrentNavigation(navigation);
    setShowLogoutConfirm(true);
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="cadastro" component={Cadastro} options={{
            title: "CADASTRO",
            headerTitleAlign: "center",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#e74c3c" },
            headerTitleStyle: { color: "#fff", fontWeight: "bold" },
          }} />

          <Stack.Screen
            name="main"
            component={Main}
            options={({ navigation }) => ({
              title: "POKÉDEX",
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#e74c3c" },
              headerTitleStyle: { color: "#fff", fontWeight: "bold" },
              headerRight: () => (
                <TouchableOpacity onPress={() => openLogoutModal(navigation)} style={{ marginRight: 15 }}>
                  <Icon name="logout" size={24} color="#fff" />
                </TouchableOpacity>
              ),
            })}
          />

          <Stack.Screen
            name="all-pokemons"
            component={AllPokemons}
            options={({ navigation }) => ({
              title: "TODOS OS POKÉMONS",
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#e74c3c" },
              headerTitleStyle: { color: "#fff", fontWeight: "bold" },
              headerRight: () => (
                <TouchableOpacity onPress={() => openLogoutModal(navigation)} style={{ marginRight: 15 }}>
                  <Icon name="logout" size={24} color="#fff" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="compare-pokemons"
            component={PokemonCompare}
            options={({ navigation }) => ({
              title: "COMPARAR POKÉMONS",
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#e74c3c" },
              headerTitleStyle: { color: "#fff", fontWeight: "bold" },
            })}
          />

          <Stack.Screen
            name="pokemon"
            component={Pokemon}
            options={({ navigation }) => ({
              title: "DETALHES",
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#e74c3c" },
              headerTitleStyle: { color: "#fff", fontWeight: "bold" },
              headerRight: () => (
                <TouchableOpacity onPress={() => openLogoutModal(navigation)} style={{ marginRight: 15 }}>
                  <Icon name="logout" size={24} color="#fff" />
                </TouchableOpacity>
              ),
            })}
          />

          <Stack.Screen
            name="pokemon-moves"
            component={PokemonMoves}
            options={{
              title: "Movimentos",
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#e74c3c" },
              headerTitleStyle: { color: "#fff", fontWeight: "bold" },
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>


      {/* Modal de logout */}
      <LogoutConfirm
        visible={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancel: { backgroundColor: "#bdc3c7" },
  confirm: { backgroundColor: "#e74c3c" },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
