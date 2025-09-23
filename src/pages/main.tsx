import Icon from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, Alert, Keyboard, ScrollView } from "react-native";
import api from "../services/api";
import {
  ActionButton,
  ActionButtonText,
  ApplyFiltersButton,
  ApplyFiltersButtonText,
  CloseButton,
  CloseButtonText,
  DropdownContainer,
  DropdownHeader,
  DropdownHeaderText,
  DropdownItem,
  DropdownItemText,
  DropdownList,
  EmptyState,
  EmptyStateSubtext,
  EmptyStateText,
  FilterButton,
  FilterButtonText,
  FilterInput,
  FilterLabel,
  FilterSection,
  Form,
  FormRow,
  Input,
  ModalContainer,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  PokedexHeader,
  PokedexMainBody,
  PokedexMainContainer,
  PokedexMainScreen,
  PokedexSubtitle,
  PokedexTitle,
  PokemonCard,
  PokemonCardActions,
  PokemonCardHeader,
  PokemonCardId,
  PokemonCardImage,
  PokemonCardInfo,
  PokemonCardName,
  PokemonCardType,
  PokemonCardTypes,
  PokemonCardTypeText,
  SuccessToast,
  SuccessToastIcon,
  SuccessToastText
} from "../styles";

interface PokemonType {
  name: string;
  url: string;
}

interface PokemonData {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
      'dream_world': {
        front_default: string;
      };
    };
  };
  height: number;
  weight: number;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  base_experience: number;
  species: {
    name: string;
    url: string;
  };
}

interface PokemonResponse {
  id: number;
  name: string;
  types: Array<{
    type: PokemonType;
  }>;
  sprites: {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
      'dream_world': {
        front_default: string;
      };
    };
  };
  height: number;
  weight: number;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  base_experience: number;
  species: {
    name: string;
    url: string;
  };
}

interface MainState {
  searchTerm: string;
  pokemons: PokemonData[];
  loading: boolean;
  showFilterModal: boolean;
  filterName: string;
  filterType: string;
  filterMinId: string;
  filterMaxId: string;
  filteredPokemons: PokemonData[];
  showTypeDropdown?: boolean;
  sortField?: 'id' | 'name';
  sortOrder?: 'asc' | 'desc';
  showSuccessToast: boolean;
  successMessage: string;
  showConfirmModal: boolean;
  pokemonToRemove: PokemonData | null;
}

interface MainProps {
  navigation?: any;
}

export default class Main extends Component<MainProps, MainState> {
  state: MainState = {
    searchTerm: "",
    pokemons: [],
    loading: false,
    showFilterModal: false,
    filterName: "",
    filterType: "",
    filterMinId: "",
    filterMaxId: "",
    filteredPokemons: [],
    showTypeDropdown: false,
    sortField: 'id',
    sortOrder: 'asc',
    showSuccessToast: false,
    successMessage: "",
    showConfirmModal: false,
    pokemonToRemove: null
  };

  async componentDidMount(): Promise<void> {
    const currentUserStr = await AsyncStorage.getItem("currentUser");
    if (!currentUserStr) return;
    const currentUser = JSON.parse(currentUserStr);
    const key = `pokemons:${currentUser.email}`;
    const pokemons = await AsyncStorage.getItem(key);
    if (pokemons) {
      const parsedPokemons = JSON.parse(pokemons);
      this.setState({
        pokemons: parsedPokemons,
        filteredPokemons: parsedPokemons
      });
    }
  }

  componentDidUpdate(_: MainProps, prevState: MainState): void {
    const { pokemons } = this.state;
    if (prevState.pokemons !== pokemons) {
      AsyncStorage.getItem("currentUser").then((u) => {
        if (!u) return;
        const user = JSON.parse(u);
        const key = `pokemons:${user.email}`;
        AsyncStorage.setItem(key, JSON.stringify(pokemons));
        this.setState({ filteredPokemons: pokemons });
      });
    }
  }

  handleSearchPokemon = async (): Promise<void> => {
    try {
      const { pokemons, searchTerm } = this.state;
      this.setState({ loading: true });

      console.log("🔍 Buscando Pokémon:", searchTerm);
      const response = await api.get<PokemonResponse>(`/pokemon/${searchTerm.toLowerCase()}`);

      console.log("📊 Dados completos da API:", JSON.stringify(response.data, null, 2));

      if (pokemons.find((pokemon) => pokemon.id === response.data.id)) {
        Alert.alert("Aviso", "Este Pokémon já está na sua Pokédex!");
        this.setState({ loading: false });
        return;
      }

      const pokemonData: PokemonData = {
        id: response.data.id,
        name: response.data.name,
        types: response.data.types.map(t => t.type),
        sprites: response.data.sprites,
        height: response.data.height,
        weight: response.data.weight,
        stats: response.data.stats,
        abilities: response.data.abilities,
        base_experience: response.data.base_experience,
        species: response.data.species,
      };

      console.log("✅ Pokémon processado:", pokemonData);

      this.setState({
        pokemons: [...pokemons, pokemonData],
        filteredPokemons: [...pokemons, pokemonData],
        searchTerm: "",
        loading: false,
      });

      // Mostrar notificação de sucesso
      this.showSuccessNotification(pokemonData.name);
      Keyboard.dismiss();
    } catch (error) {
      console.error("❌ Erro ao buscar Pokémon:", error);
      alert("Pokémon não encontrado!");
      this.setState({ loading: false });
    }
  };

  handleFilter = (): void => {
    const { pokemons, filterName, filterType, filterMinId, filterMaxId, sortField, sortOrder } = this.state;

    let filtered = pokemons;

    // Filtro por nome
    if (filterName) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    // Filtro por tipo
    if (filterType) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.some(type => type.name === filterType)
      );
    }

    // Filtro por ID mínimo
    if (filterMinId) {
      const minId = parseInt(filterMinId);
      if (!isNaN(minId)) {
        filtered = filtered.filter(pokemon => pokemon.id >= minId);
      }
    }

    // Filtro por ID máximo
    if (filterMaxId) {
      const maxId = parseInt(filterMaxId);
      if (!isNaN(maxId)) {
        filtered = filtered.filter(pokemon => pokemon.id <= maxId);
      }
    }

    // Ordenação
    const sortFn = (a: PokemonData, b: PokemonData): number => {
      const dir = sortOrder === 'desc' ? -1 : 1;
      if (sortField === 'name') {
        return a.name.localeCompare(b.name) * dir;
      }
      return (a.id - b.id) * dir;
    };

    this.setState({
      filteredPokemons: [...filtered].sort(sortFn),
      showFilterModal: false
    });
  };

  clearFilters = (): void => {
    this.setState({
      filterName: "",
      filterType: "",
      filterMinId: "",
      filterMaxId: "",
      filteredPokemons: this.state.pokemons,
      showFilterModal: false
    });
  };

  removePokemon = (pokemonId: number): void => {
    const { pokemons } = this.state;
    const updatedPokemons = pokemons.filter(p => p.id !== pokemonId);
    this.setState({
      pokemons: updatedPokemons,
      filteredPokemons: updatedPokemons
    });
  };

  confirmRemovePokemon = (pokemon: PokemonData): void => {
    this.setState({
      showConfirmModal: true,
      pokemonToRemove: pokemon
    });
  };

  handleConfirmRemove = (): void => {
    const { pokemonToRemove } = this.state;
    if (pokemonToRemove) {
      this.removePokemon(pokemonToRemove.id);
      this.setState({
        showConfirmModal: false,
        pokemonToRemove: null
      });
    }
  };

  handleCancelRemove = (): void => {
    this.setState({
      showConfirmModal: false,
      pokemonToRemove: null
    });
  };

  showSuccessNotification = (pokemonName: string): void => {
    const message = `${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)} capturado com sucesso!`;
    this.setState({
      showSuccessToast: true,
      successMessage: message
    });

    // Auto-ocultar após 3 segundos
    setTimeout(() => {
      this.setState({ showSuccessToast: false });
    }, 3000);
  };

  render(): React.JSX.Element {
    const {
      searchTerm,
      filteredPokemons,
      loading,
      showFilterModal,
      filterName,
      filterType,
      showConfirmModal,
      pokemonToRemove,
    } = this.state;

    const typeColors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };

    const pokemonTypes = [
      'normal', 'fire', 'water', 'electric', 'grass', 'ice',
      'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
      'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
    ];

    return (
      <PokedexMainContainer>
        {/* Notificação de Sucesso */}
        {this.state.showSuccessToast && (
          <SuccessToast>
            <SuccessToastIcon>
              <Icon name="check" size={24} color="#fff" />
            </SuccessToastIcon>
            <SuccessToastText>{this.state.successMessage}</SuccessToastText>
          </SuccessToast>
        )}

        <PokedexMainBody>
          <PokedexMainScreen>
            <PokedexHeader>
              <PokedexTitle>POKÉDEX</PokedexTitle>
              <PokedexSubtitle>Capture e gerencie seus Pokémons</PokedexSubtitle>


              <PokedexSubtitle onPress={() => {
                this.props.navigation?.navigate("compare-pokemons");
              }} style={{ marginLeft: 10, marginTop: 10, color: "#fff" }}>Compare Pokémons</PokedexSubtitle>
              
            </PokedexHeader>
            <Form>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Buscar Pokémon"
                value={searchTerm}
                onChangeText={(text) => this.setState({ searchTerm: text })}
                returnKeyType="search"
                onSubmitEditing={this.handleSearchPokemon}
              />
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <div style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} onClick={this.handleSearchPokemon}>
                  <Icon name="search" size={20} color="#2c3e50" />
                </div>
              )}
            </Form>
            <FilterButton onPress={() => this.setState({ showFilterModal: true })}>
              <Icon name="tune" size={18} color="white" />
            </FilterButton>

            <FilterButton
              style={{ top: 20, right: 220 }}
              onPress={() => this.props.navigation?.navigate("all-pokemons")}
            >
              <Icon name="list" size={18} color="white" />
            </FilterButton>

            <FilterButton
              style={{ top: 20, right: 360 }}
              onPress={async () => {
                await AsyncStorage.removeItem("currentUser");
                this.props.navigation?.navigate("login");
              }}
            >
              <Icon name="logout" size={18} color="white" />
            </FilterButton>
          </PokedexMainScreen>

          <ScrollView style={{ flex: 1, height: '100%' }} >
            {filteredPokemons.length === 0 ? (
              <EmptyState>
                <Icon name="pets" size={60} color="#bdc3c7" />
                <EmptyStateText>Nenhum Pokémon capturado</EmptyStateText>
                <EmptyStateSubtext>
                  Use a busca para adicionar Pokémons à sua Pokédex
                </EmptyStateSubtext>
              </EmptyState>
            ) : (
              filteredPokemons.map((pokemon) => (
                <PokemonCard key={pokemon.id}>
                  <PokemonCardHeader>
                    <PokemonCardImage source={{ uri: pokemon.sprites.front_default }} />
                    <PokemonCardInfo>
                      <PokemonCardName>
                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                      </PokemonCardName>
                      <PokemonCardId>#{pokemon.id.toString().padStart(3, '0')}</PokemonCardId>
                      <PokemonCardTypes>
                        {pokemon.types.map((type, index) => (
                          <PokemonCardType key={index} color={typeColors[type.name]}>
                            <PokemonCardTypeText>{type.name}</PokemonCardTypeText>
                          </PokemonCardType>
                        ))}
                      </PokemonCardTypes>
                    </PokemonCardInfo>
                  </PokemonCardHeader>

                  <PokemonCardActions>
                    <ActionButton
                      onPress={() => {
                        this.props.navigation?.navigate("pokemon", { pokemon });
                      }}
                    >
                      <ActionButtonText>Detalhes</ActionButtonText>
                    </ActionButton>
                    <ActionButton
                      variant="danger"
                      onPress={() => this.confirmRemovePokemon(pokemon)}
                    >
                      <ActionButtonText>Liberar</ActionButtonText>
                    </ActionButton>
                  </PokemonCardActions>
                </PokemonCard>
              ))
            )}
          </ScrollView>
        </PokedexMainBody>

        {showFilterModal && (
          <ModalOverlay>
            <ModalContainer>
              <ModalHeader>
                <ModalTitle>Filtros</ModalTitle>
                <CloseButton onPress={() => this.setState({ showFilterModal: false })}>
                  <CloseButtonText>Fechar</CloseButtonText>
                </CloseButton>
              </ModalHeader>

              <FilterSection>
                <FilterLabel>Nome</FilterLabel>
                <FilterInput
                  placeholder="Ex: pikachu"
                  value={filterName}
                  onChangeText={(text: string) => this.setState({ filterName: text })}
                />
              </FilterSection>

              <FilterSection>
                <FilterLabel>Tipo</FilterLabel>
                <DropdownContainer>
                  <DropdownHeader onPress={() => this.setState({ showTypeDropdown: !this.state.showTypeDropdown })}>
                    <DropdownHeaderText>{filterType ? filterType : 'Selecione um tipo'}</DropdownHeaderText>
                    <Icon name={this.state.showTypeDropdown ? 'expand-less' : 'expand-more'} size={20} color="#2c3e50" />
                  </DropdownHeader>
                  {this.state.showTypeDropdown && (
                    <DropdownList>
                      {['', 'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'].map((type) => (
                        <DropdownItem key={type || 'any'} onPress={() => this.setState({ filterType: type, showTypeDropdown: false })}>
                          <DropdownItemText>{type || 'Qualquer'}</DropdownItemText>
                        </DropdownItem>
                      ))}
                    </DropdownList>
                  )}
                </DropdownContainer>
              </FilterSection>

              <FilterSection>
                <FilterLabel>Ordenar por</FilterLabel>
                <FormRow>
                  <DropdownContainer style={{ flex: 1, marginRight: 8 }}>
                    <DropdownHeader onPress={() => this.setState({ sortField: this.state.sortField === 'id' ? 'name' : 'id' })}>
                      <DropdownHeaderText>{this.state.sortField === 'id' ? 'ID' : 'Nome'}</DropdownHeaderText>
                      <Icon name="swap-vert" size={20} color="#2c3e50" />
                    </DropdownHeader>
                  </DropdownContainer>
                  <DropdownContainer style={{ flex: 1, marginLeft: 8 }}>
                    <DropdownHeader onPress={() => this.setState({ sortOrder: this.state.sortOrder === 'asc' ? 'desc' : 'asc' })}>
                      <DropdownHeaderText>{this.state.sortOrder === 'asc' ? 'Crescente' : 'Decrescente'}</DropdownHeaderText>
                      <Icon name={this.state.sortOrder === 'asc' ? 'north' : 'south'} size={20} color="#2c3e50" />
                    </DropdownHeader>
                  </DropdownContainer>
                </FormRow>
              </FilterSection>


              <ApplyFiltersButton onPress={this.handleFilter}>
                <ApplyFiltersButtonText>Aplicar</ApplyFiltersButtonText>
              </ApplyFiltersButton>

              <ApplyFiltersButton variant='secondary' onPress={this.clearFilters}>
                <ApplyFiltersButtonText variant='secondary'>Limpar</ApplyFiltersButtonText>
              </ApplyFiltersButton>
            </ModalContainer>
          </ModalOverlay>
        )}

        {/* Modal de Confirmação para Liberar Pokémon */}
        {showConfirmModal && pokemonToRemove && (
          <ModalOverlay>
            <ModalContainer>
              <ModalHeader>
                <ModalTitle>Confirmar Liberação</ModalTitle>
                <CloseButton onPress={this.handleCancelRemove}>
                  <CloseButtonText>Fechar</CloseButtonText>
                </CloseButton>
              </ModalHeader>

              <div style={{ padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#2c3e50' }}>
                  Tem certeza que deseja liberar?
                </div>
                <div style={{ fontSize: 16, color: '#7f8c8d', marginBottom: 20 }}>
                  {pokemonToRemove.name.charAt(0).toUpperCase() + pokemonToRemove.name.slice(1)} será removido da sua Pokédex
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                  <ActionButton
                    variant="secondary"
                    onPress={this.handleCancelRemove}
                    style={{ flex: 1 }}
                  >
                    <ActionButtonText>Cancelar</ActionButtonText>
                  </ActionButton>
                  <ActionButton
                    variant="danger"
                    onPress={this.handleConfirmRemove}
                    style={{ flex: 1 }}
                  >
                    <ActionButtonText>Liberar</ActionButtonText>
                  </ActionButton>
                </div>
              </div>
            </ModalContainer>
          </ModalOverlay>
        )}

      </PokedexMainContainer >
    );
  }
}