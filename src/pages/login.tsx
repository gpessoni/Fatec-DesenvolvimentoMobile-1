import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

type RootStackParamList = {
  main: undefined;
  cadastro: undefined;
};

type NavigationProp = ReturnType<
  typeof useNavigation<
    import("@react-navigation/native").NavigationProp<RootStackParamList>
  >
>;

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<NavigationProp>();

  const handleLogin = async (): Promise<void> => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");

      if (!storedUsers) {
        Toast.show({ type: "info", text1: "Atenção", text2: "Nenhum usuário cadastrado." });
        return;
      }

      const users = JSON.parse(storedUsers) as { email: string; password: string }[];
      const foundUser = users.find((u) => u.email === email && u.password === password);

      if (foundUser) {
        await AsyncStorage.setItem("currentUser", JSON.stringify(foundUser));
        navigation.navigate("main");
      } else {
        Toast.show({ type: "error", text1: "Erro", text2: "E-mail ou senha inválidos!" });
      }
    } catch (error) {
      console.error("Erro ao tentar logar:", error);
      Toast.show({ type: "error", text1: "Erro", text2: "Ocorreu um problema ao tentar logar." });
    }
  };

  const handleCadastro = (): void => {
    navigation.navigate("cadastro");
  };

  return (
    <View style={styles.container}>
      {/* Topo da Pokédex */}
      <View style={styles.topBar}>
        <View style={styles.bigCircle} />
        <View style={styles.smallCircle} />
        <View style={[styles.smallCircle, { backgroundColor: "yellow" }]} />
        <View style={[styles.smallCircle, { backgroundColor: "green" }]} />
      </View>

      {/* "Tela" da Pokédex */}
      <View style={styles.screen}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={[styles.button, { backgroundColor: "#2c3e50" }]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#e74c3c" }]} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e74c3c", // Vermelho da Pokédex
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 30,
  },
  bigCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3498db", // Azul "lente"
    borderWidth: 4,
    borderColor: "#fff",
    marginRight: 15,
  },
  smallCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ff3838", // Vermelho padrão
    marginHorizontal: 5,
  },
  screen: {
    backgroundColor: "#ecf0f1",
    borderRadius: 15,
    width: "100%",
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: "#2c3e50",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    width: "90%",
    backgroundColor: "#fff",
  },
  button: {
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Login;
