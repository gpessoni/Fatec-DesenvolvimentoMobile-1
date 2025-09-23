import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { MaskedTextInput } from "react-native-mask-text";
import Toast from "react-native-toast-message";

// Cursos disponíveis
const courses = [
  "Análise e Desenvolvimento de Sistemas",
  "Desenvolvimento de Software Multiplataforma",
  "Gestão da Produção Industrial",
  "Gestão de Recursos Humanos",
  "Gestão Empresarial (a distância)",
];

const Cadastro: React.FC = () => {
  const navigation = useNavigation<any>();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState(courses[0]);

  const handleCadastro = async (): Promise<void> => {
    if (!name || !password || !phone || !cpf || !email || !course) {
      Toast.show({ type: "info", text1: "Atenção", text2: "Preencha todos os campos!" });
      return;
    }

    const newUser = { name, password, phone, cpf, email, course };

    try {
      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      users.push(newUser);
      await AsyncStorage.setItem("users", JSON.stringify(users));

      // Salvar dados do usuário para o ranking
      await AsyncStorage.setItem(`user:${email}`, JSON.stringify({
        name,
        email,
        course,
        createdAt: new Date().toISOString(),
        pokemonCount: 0,
        lastActivity: new Date().toISOString(),
      }));

      Toast.show({ type: "success", text1: "Sucesso", text2: "Usuário cadastrado com sucesso!" });
      navigation.navigate("login");
    } catch (error) {
      Toast.show({ type: "error", text1: "Erro", text2: "Não foi possível salvar os dados." });
      console.error(error);
    }
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
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <MaskedTextInput
          mask="(99) 99999-9999"
          style={styles.input}
          placeholder="Telefone"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <MaskedTextInput
          mask="999.999.999-99"
          style={styles.input}
          placeholder="CPF"
          keyboardType="numeric"
          value={cpf}
          onChangeText={(text) => setCpf(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={course}
            style={styles.picker}
            onValueChange={(itemValue) => setCourse(itemValue)}
          >
            {courses.map((c, index) => (
              <Picker.Item key={index} label={c} value={c} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#2c3e50" }]}
          onPress={handleCadastro}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e74c3c", 
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
    backgroundColor: "#3498db", 
    borderWidth: 4,
    borderColor: "#fff",
    marginRight: 15,
  },
  smallCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ff3838",
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
    marginVertical: 8,
    width: "90%",
    backgroundColor: "#fff",
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: "#2c3e50",
    borderRadius: 8,
    marginVertical: 8,
    width: "90%",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  picker: {
    width: "100%",
    height: 50,
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

export default Cadastro;
