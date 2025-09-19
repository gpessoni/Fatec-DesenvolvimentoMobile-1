import Icon from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, Alert, ScrollView } from "react-native";
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

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
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

interface TypeResponse {
  pokemon: Array<{
    pokemon: {
      name: string;
      url: string;
    };
  }>;
}

interface AllPokemonsState {
  pokemons: PokemonData[];
  loading: boolean;
  loadingMore: boolean;
  searchTerm: string;
  showFilterModal: boolean;
  filterType: string;
  filterMinId: string;
  filterMaxId: string;
  filteredPokemons: PokemonData[];
  showTypeDropdown: boolean;
  sortField: 'id' | 'name';
  sortOrder: 'asc' | 'desc';
  nextUrl: string | null;
  myPokedex: PokemonData[];
  showSuccessToast: boolean;
  successMessage: string;
}

interface AllPokemonsProps {
  navigation?: any;
}

export default class AllPokemons extends Component<AllPokemonsProps, AllPokemonsState> {
  state: AllPokemonsState = {
    pokemons: [],
    loading: true,
    loadingMore: false,
    searchTerm: "",
    showFilterModal: false,
    filterType: "",
    filterMinId: "",
    filterMaxId: "",
    filteredPokemons: [],
    showTypeDropdown: false,
    sortField: 'id',
    sortOrder: 'asc',
    nextUrl: null,
    myPokedex: [],
    showSuccessToast: false,
    successMessage: ""
  };

  async componentDidMount(): Promise<void> {
    await this.loadMyPokedex();
    await this.loadPokemons();
  }

  loadMyPokedex = async (): Promise<void> => {
    try {
      const currentUser = await AsyncStorage.getItem("currentUser");
      if (!currentUser) return;
      const user = JSON.parse(currentUser);
      const key = `pokemons:${user.email}`;
      const pokemons = await AsyncStorage.getItem(key);
      if (pokemons) {
        const parsedPokemons = JSON.parse(pokemons);
        this.setState({ myPokedex: parsedPokemons });
      }
    } catch (error) {
      console.error("Erro ao carregar Pokédex:", error);
    }
  };

  loadPokemons = async (url?: string, filters?: { type?: string; minId?: number; maxId?: number }): Promise<void> => {
    try {
      if (url) {
        this.setState({ loadingMore: true });
      } else {
        this.setState({ loading: true });
      }

      let apiUrl = url || '/pokemon?limit=500';
      let pokemonList: PokemonListItem[] = [];

      // Se há filtro por tipo, buscar Pokémons desse tipo
      if (filters?.type && !url) {
        try {
          const typeResponse = await api.get<TypeResponse>(`/type/${filters.type}`);
          pokemonList = typeResponse.data.pokemon.map((p) => ({
            name: p.pokemon.name,
            url: p.pokemon.url
          }));
        } catch (error) {
          console.error("Erro ao buscar por tipo:", error);
          Alert.alert("Erro", "Tipo de Pokémon não encontrado");
          this.setState({ loading: false, loadingMore: false });
          return;
        }
      } else {
        const response = await api.get<PokemonListResponse>(apiUrl);
        pokemonList = response.data.results;
        this.setState({ nextUrl: response.data.next });
      }
      
      const pokemonPromises = pokemonList.map(async (pokemon) => {
        const pokemonResponse = await api.get<PokemonResponse>(`/pokemon/${pokemon.name}`);
        return {
          id: pokemonResponse.data.id,
          name: pokemonResponse.data.name,
          types: pokemonResponse.data.types.map((t: any) => t.type),
          sprites: pokemonResponse.data.sprites,
          height: pokemonResponse.data.height,
          weight: pokemonResponse.data.weight,
          stats: pokemonResponse.data.stats,
          abilities: pokemonResponse.data.abilities,
          base_experience: pokemonResponse.data.base_experience,
          species: pokemonResponse.data.species,
        };
      });

      const newPokemons = await Promise.all(pokemonPromises);
      
      // Aplicar filtros de ID se especificados
      let filteredPokemons = newPokemons;
      if (filters?.minId) {
        filteredPokemons = filteredPokemons.filter(p => p.id >= filters.minId!);
      }
      if (filters?.maxId) {
        filteredPokemons = filteredPokemons.filter(p => p.id <= filters.maxId!);
      }
      
      this.setState(prevState => ({
        pokemons: url ? [...prevState.pokemons, ...filteredPokemons] : filteredPokemons,
        filteredPokemons: url ? [...prevState.filteredPokemons, ...filteredPokemons] : filteredPokemons,
        loading: false,
        loadingMore: false
      }));
    } catch (error) {
      console.error("Erro ao carregar Pokémons:", error);
      Alert.alert("Erro", "Não foi possível carregar os Pokémons");
      this.setState({ loading: false, loadingMore: false });
    }
  };

  loadMorePokemons = (): void => {
    const { nextUrl, loadingMore, filterType } = this.state;
    // Só carregar mais se não há filtro por tipo (que já retorna todos os Pokémons do tipo)
    if (nextUrl && !loadingMore && !filterType) {
      this.loadPokemons(nextUrl);
    }
  };

  addToPokedex = async (pokemon: PokemonData): Promise<void> => {
    try {
      const { myPokedex } = this.state;
      
      if (myPokedex.find(p => p.id === pokemon.id)) {
        Alert.alert("Aviso", "Este Pokémon já está na sua Pokédex!");
        return;
      }

      const updatedPokedex = [...myPokedex, pokemon];
      const currentUser = await AsyncStorage.getItem("currentUser");
      if (!currentUser) return;
      const user = JSON.parse(currentUser);
      const key = `pokemons:${user.email}`;
      await AsyncStorage.setItem(key, JSON.stringify(updatedPokedex));
      this.setState({ myPokedex: updatedPokedex });
      
      // Mostrar notificação de sucesso
      this.showSuccessNotification(pokemon.name);
    } catch (error) {
      console.error("Erro ao adicionar Pokémon:", error);
      Alert.alert("Erro", "Não foi possível adicionar o Pokémon à sua Pokédex");
    }
  };

  handleSearch = async (): Promise<void> => {
    const { searchTerm } = this.state;
    
    if (!searchTerm.trim()) {
      // Se não há termo de busca, recarregar todos os Pokémons
      this.setState({ 
        pokemons: [], 
        filteredPokemons: [], 
        nextUrl: null 
      });
      await this.loadPokemons();
      return;
    }

    try {
      this.setState({ loading: true });
      
      // Tentar buscar Pokémon específico por nome ou ID
      const pokemonResponse = await api.get<PokemonResponse>(`/pokemon/${searchTerm.toLowerCase()}`);
      
      const pokemon: PokemonData = {
        id: pokemonResponse.data.id,
        name: pokemonResponse.data.name,
        types: pokemonResponse.data.types.map((t: any) => t.type),
        sprites: pokemonResponse.data.sprites,
        height: pokemonResponse.data.height,
        weight: pokemonResponse.data.weight,
        stats: pokemonResponse.data.stats,
        abilities: pokemonResponse.data.abilities,
        base_experience: pokemonResponse.data.base_experience,
        species: pokemonResponse.data.species,
      };

      this.setState({
        pokemons: [pokemon],
        filteredPokemons: [pokemon],
        nextUrl: null,
        loading: false
      });
    } catch (error) {
      console.error("Erro ao buscar Pokémon:", error);
      Alert.alert("Erro", "Pokémon não encontrado!");
      this.setState({ loading: false });
    }
  };

  handleFilter = async (): Promise<void> => {
    const { filterType, filterMinId, filterMaxId, sortField, sortOrder } = this.state;

    // Preparar filtros para a API
    const filters: { type?: string; minId?: number; maxId?: number } = {};
    
    if (filterType) {
      filters.type = filterType;
    }
    
    if (filterMinId) {
      const minId = parseInt(filterMinId);
      if (!isNaN(minId)) {
        filters.minId = minId;
      }
    }
    
    if (filterMaxId) {
      const maxId = parseInt(filterMaxId);
      if (!isNaN(maxId)) {
        filters.maxId = maxId;
      }
    }

    // Limpar lista atual e carregar com filtros
    this.setState({ 
      pokemons: [], 
      filteredPokemons: [], 
      nextUrl: null,
      showFilterModal: false 
    });

    // Carregar Pokémons com filtros aplicados
    await this.loadPokemons(undefined, filters);

    // Aplicar ordenação localmente após carregar
    this.setState(prevState => {
      const sortFn = (a: PokemonData, b: PokemonData): number => {
        const dir = sortOrder === 'desc' ? -1 : 1;
        if (sortField === 'name') {
          return a.name.localeCompare(b.name) * dir;
        }
        return (a.id - b.id) * dir;
      };

      return {
        pokemons: [...prevState.pokemons].sort(sortFn),
        filteredPokemons: [...prevState.filteredPokemons].sort(sortFn)
      };
    });
  };

  clearFilters = async (): Promise<void> => {
    this.setState({
      filterType: "",
      filterMinId: "",
      filterMaxId: "",
      pokemons: [],
      filteredPokemons: [],
      nextUrl: null,
      showFilterModal: false
    });

    // Recarregar todos os Pokémons sem filtros
    await this.loadPokemons();
  };

  isInPokedex = (pokemonId: number): boolean => {
    return this.state.myPokedex.some(p => p.id === pokemonId);
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
      filteredPokemons,
      loading,
      loadingMore,
      searchTerm,
      showFilterModal,
      filterType,
      filterMinId,
      filterMaxId,
      showTypeDropdown,
      sortField,
      sortOrder
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
              <PokedexTitle>TODOS OS POKÉMONS</PokedexTitle>
              <PokedexSubtitle>Explore e adicione Pokémons à sua Pokédex</PokedexSubtitle>
            </PokedexHeader>
            
            <Form>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Buscar Pokémon por nome ou ID"
                value={searchTerm}
                onChangeText={(text) => this.setState({ searchTerm: text })}
                returnKeyType="search"
                onSubmitEditing={this.handleSearch}
              />
              <div style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} onClick={this.handleSearch}>
                <Icon name="search" size={20} color="#2c3e50" />
              </div>
            </Form>
            
            <FilterButton onPress={() => this.setState({ showFilterModal: true })}>
              <Icon name="tune" size={18} color="white" />
            </FilterButton>
          </PokedexMainScreen>

          <ScrollView 
            style={{ flex: 1, height: '100%' }}
            onScroll={({ nativeEvent }) => {
              const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
              const paddingToBottom = 20;
              if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
                this.loadMorePokemons();
              }
            }}
            scrollEventThrottle={400}
          >
            {loading ? (
              <EmptyState>
                <ActivityIndicator size="large" color="#3498db" />
                <EmptyStateText>Carregando Pokémons...</EmptyStateText>
              </EmptyState>
            ) : filteredPokemons.length === 0 ? (
              <EmptyState>
                <Icon name="pets" size={60} color="#bdc3c7" />
                <EmptyStateText>Nenhum Pokémon encontrado</EmptyStateText>
                <EmptyStateSubtext>
                  Tente ajustar os filtros ou termo de busca
                </EmptyStateSubtext>
              </EmptyState>
            ) : (
              <>
                {filteredPokemons.map((pokemon) => (
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
                        variant={this.isInPokedex(pokemon.id) ? "danger" : undefined}
                        onPress={() => this.addToPokedex(pokemon)}
                        disabled={this.isInPokedex(pokemon.id)}
                      >
                        <ActionButtonText>
                          {this.isInPokedex(pokemon.id) ? "Obtido" : "Capturar"}
                        </ActionButtonText>
                      </ActionButton>
                    </PokemonCardActions>
                  </PokemonCard>
                ))}
                
                {loadingMore && (
                  <EmptyState>
                    <ActivityIndicator size="small" color="#3498db" />
                    <EmptyStateText>Carregando mais Pokémons...</EmptyStateText>
                  </EmptyState>
                )}
              </>
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
                <FilterLabel>Tipo</FilterLabel>
                <DropdownContainer>
                  <DropdownHeader onPress={() => this.setState({ showTypeDropdown: !showTypeDropdown })}>
                    <DropdownHeaderText>{filterType ? filterType : 'Selecione um tipo'}</DropdownHeaderText>
                    <Icon name={showTypeDropdown ? 'expand-less' : 'expand-more'} size={20} color="#2c3e50" />
                  </DropdownHeader>
                  {showTypeDropdown && (
                    <DropdownList>
                      {['', ...pokemonTypes].map((type) => (
                        <DropdownItem key={type || 'any'} onPress={() => this.setState({ filterType: type, showTypeDropdown: false })}>
                          <DropdownItemText>{type || 'Qualquer'}</DropdownItemText>
                        </DropdownItem>
                      ))}
                    </DropdownList>
                  )}
                </DropdownContainer>
              </FilterSection>

              <FilterSection>
                <FilterLabel>ID Mínimo</FilterLabel>
                <FilterInput
                  placeholder="Ex: 1"
                  value={filterMinId}
                  onChangeText={(text: string) => this.setState({ filterMinId: text })}
                  keyboardType="numeric"
                />
              </FilterSection>

              <FilterSection>
                <FilterLabel>ID Máximo</FilterLabel>
                <FilterInput
                  placeholder="Ex: 151"
                  value={filterMaxId}
                  onChangeText={(text: string) => this.setState({ filterMaxId: text })}
                  keyboardType="numeric"
                />
              </FilterSection>

              <FilterSection>
                <FilterLabel>Ordenar por</FilterLabel>
                <FormRow>
                  <DropdownContainer style={{ flex: 1, marginRight: 8 }}>
                    <DropdownHeader onPress={() => this.setState({ sortField: sortField === 'id' ? 'name' : 'id' })}>
                      <DropdownHeaderText>{sortField === 'id' ? 'ID' : 'Nome'}</DropdownHeaderText>
                      <Icon name="swap-vert" size={20} color="#2c3e50" />
                    </DropdownHeader>
                  </DropdownContainer>
                  <DropdownContainer style={{ flex: 1, marginLeft: 8 }}>
                    <DropdownHeader onPress={() => this.setState({ sortOrder: sortOrder === 'asc' ? 'desc' : 'asc' })}>
                      <DropdownHeaderText>{sortOrder === 'asc' ? 'Crescente' : 'Decrescente'}</DropdownHeaderText>
                      <Icon name={sortOrder === 'asc' ? 'north' : 'south'} size={20} color="#2c3e50" />
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
      </PokedexMainContainer>
    );
  }
}
