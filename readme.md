# Pokedéx DSM - Gabriel Pessoni

Aplicativo mobile desenvolvido com Expo (React Native + TypeScript) que permite pesquisar, capturar e gerenciar Pokémons utilizando a API pública PokeAPI.

Desenvolvido por Gabriel Pessoni para a matéria de Desenvolvimento Mobile, FATEC Franca

## Sumário
- Visão geral
- Requisitos
- Instalação e execução
- Estrutura de pastas
- Bibliotecas utilizadas
- Rotas e páginas
- Fluxo de autenticação (Login/Cadastro)
- Integração com a PokeAPI
- Armazenamento local
- Estilos e UI

## Visão geral
Este projeto é uma Pokedéx: você pode buscar Pokémons, visualizar detalhes, filtrar/ordenar, comparar e manter uma coleção persistida por usuário no dispositivo.

## Requisitos
- Node.js LTS (>= 18)
- npm ou yarn
- Expo CLI (será instalado ao rodar os scripts do Expo)
- Emulador Android/iOS ou dispositivo físico com o aplicativo Expo Go

## Instalação e execução
1. Instalar dependências:
```bash
npm install
```
2. Executar em desenvolvimento:
```bash
npm start
# ou
npm run android
# ou
npm run ios
# ou
npm run web
```
3. Leia o QR Code no terminal com o aplicativo Expo Go (dispositivo físico) ou rode no emulador.

## Estrutura de pastas
```
src/
  pages/
    all-pokemons.tsx      # Lista completa e utilidades de navegação
    cadastro.tsx          # Tela de cadastro de usuário
    login.tsx             # Tela de login
    main.tsx              # Pokedéx (busca, filtros, coleção)
    pokemon.tsx           # Detalhes de um Pokémon
    pokemon-moves.tsx     # Movimentos de um Pokémon
    compare-pokemons.tsx  # Comparação entre dois Pokémons
  routes.tsx              # Navegação (stack) e modal de logout
  services/
    api.ts                # Axios configurado (PokeAPI)
styles.ts                 # Componentes estilizados (styled-components)
App.tsx                   # Componente raiz (Toast provider + rotas)
index.ts                  # Registro do root component (Expo)
```

## Bibliotecas utilizadas
- React Native + Expo
  - "expo": ~53.x
  - "react": 19.x
  - "react-native": 0.79.x
- Navegação
  - "@react-navigation/native"
  - "@react-navigation/stack"
  - "react-native-gesture-handler", "react-native-screens", "react-native-safe-area-context"
- UI/Estilos
  - "styled-components"
  - "@expo/vector-icons" (MaterialIcons)
- Formulários/Inputs
  - "@react-native-picker/picker"
  - "react-native-mask-text"
- Armazenamento local
  - "@react-native-async-storage/async-storage"
- HTTP Client
  - "axios"
- Notificações toast
  - "react-native-toast-message" (host em App.tsx e usado em telas como Login/Cadastro)

## Rotas e páginas
A navegação é controlada em `src/routes.tsx` usando um Stack Navigator e lógica para definir a rota inicial conforme o usuário logado.

- login: Tela de autenticação (e botão para ir ao cadastro)
- cadastro: Criação de usuário local
- main: Pokedéx principal (busca, filtros, coleção, logout)
- all-pokemons: Atalhos/listagem ampliada de Pokémons (e navegação para páginas relacionadas)
- pokemon: Detalhes do Pokémon escolhido (sprites, tipos, stats, etc.)
- pokemon-moves: Movimentos do Pokémon (nome, tipo, etc.)
- compare-pokemons: Tela para comparar atributos de dois Pokémons

Além disso, `routes.tsx` fornece um modal de confirmação de logout e insere ícones de logout no header de telas principais.

## Fluxo de autenticação (Login/Cadastro)
Não há backend próprio; todo o gerenciamento é local via AsyncStorage.

- Cadastro (`src/pages/cadastro.tsx`)
  - Campos: nome, senha, telefone (com máscara), CPF (com máscara), e-mail e curso.
  - Validação simples: impede continuar se houver campos vazios.
  - Persiste o usuário no Array `users` (chave `users` no AsyncStorage).
  - Mostra feedback com Toast (sucesso/erro/info) e redireciona para login após sucesso.

- Login (`src/pages/login.tsx`)
  - Busca a lista `users` e procura um item com e-mail e senha informados.
  - Em caso de sucesso, persiste `currentUser` e navega para `main`.
  - Em falhas (sem usuários cadastrados, credenciais inválidas, erro de I/O) exibe Toast.

- Sessão inicial
  - Em `routes.tsx`, um `useEffect` lê `currentUser` para decidir a rota inicial: `main` se logado, senão `login`.

- Logout
  - Disponível no header (ícone). Abre modal de confirmação; se confirmado, remove `currentUser` e reseta a navegação para `login`.

## Integração com a PokeAPI
O cliente HTTP está em `src/services/api.ts`:
```ts
import axios from 'axios';
const api = axios.create({ baseURL: 'https://pokeapi.co/api/v2' });
export default api;
```
Principais endpoints utilizados (exemplos):
- `GET /pokemon/{name|id}`: dados completos de um Pokémon (sprites, tipos, stats, habilidades etc.). Usado, por exemplo, na busca da `main.tsx`.
- `GET /pokemon?limit={n}&offset={k}`: paginação/listagem de Pokémons. Usado em `all-pokemons.tsx`.
- `GET /move/{name|id}` e/ou campos `moves` do Pokémon: utilizados em `pokemon-moves.tsx` para exibir movimentos.
- Outros sub-recursos (`species`, `types`, etc.) podem ser utilizados em páginas de detalhes.

## Armazenamento local
- Chaves principais no AsyncStorage:
  - `users`: Array de usuários cadastrados localmente.
  - `currentUser`: Usuário atualmente autenticado.
  - `pokemons:{email}`: Coleção de Pokémons do usuário autenticado (cada usuário mantém sua própria lista/coleção no dispositivo).
- Persistência da Pokedéx: ao adicionar/remover Pokémons na `main.tsx`, a lista é atualizada para a chave do usuário logado.

## Estilos e UI
- O app utiliza `styled-components` em `src/styles.ts` para estruturar a UI (cartões, cabeçalhos, modais, toasts de sucesso customizados na `main.tsx`, etc.).
- Ícones: `@expo/vector-icons/MaterialIcons`.
- Toasts globais: `react-native-toast-message` com `<Toast />` montado em `App.tsx` e uso de `Toast.show({ type, text1, text2 })` nas telas.

---
