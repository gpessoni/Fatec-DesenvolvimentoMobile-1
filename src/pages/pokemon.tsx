import React, { Component } from "react";
import { ActivityIndicator, Animated, ScrollView } from "react-native";
import api from "../services/api";
import {
    AbilityCard,
    AbilityDescription,
    AbilityName,
    AnimatedPokemonImage,
    BackButton,
    BackButtonText,
    DescriptionText,
    EncounterChance,
    EncounterDetails,
    EncounterLevel,
    EncounterMethod,
    EncountersSection,
    InfoLabel,
    InfoRow,
    InfoSection,
    InfoValue,
    LocationCard,
    LocationName,
    MoveButton,
    MoveButtonText,
    MoveCard,
    MoveLevel,
    MoveName,
    MovesGrid,
    MovesSection,
    NoEncountersText,
    PokedexBody,
    PokedexContainer,
    PokedexScreen,
    PokemonId,
    PokemonImageContainer,
    PokemonInfoHeader,
    PokemonTitle,
    SectionHeader,
    ShinyToggle,
    ShinyToggleText,
    StatBarContainer,
    StatBarFill,
    StatItem,
    StatLabel,
    StatsContainer,
    StatValue,
    TypeChip,
    TypeChipText,
    TypeRow,
    VersionContainer,
    VersionName
} from "../styles";

interface PokemonType {
    name: string;
    url: string;
}

interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

interface PokemonAbility {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

interface PokemonMove {
    move: {
        name: string;
        url: string;
    };
    version_group_details: Array<{
        level_learned_at: number;
        move_learn_method: {
            name: string;
            url: string;
        };
        version_group: {
            name: string;
            url: string;
        };
    }>;
}

interface PokemonSpecies {
    name: string;
    url: string;
    base_happiness: number;
    capture_rate: number;
    color: {
        name: string;
        url: string;
    };
    egg_groups: Array<{
        name: string;
        url: string;
    }>;
    evolution_chain: {
        url: string;
    };
    flavor_text_entries: Array<{
        flavor_text: string;
        language: {
            name: string;
            url: string;
        };
        version: {
            name: string;
            url: string;
        };
    }>;
    generation: {
        name: string;
        url: string;
    };
    habitat: {
        name: string;
        url: string;
    };
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    shape: {
        name: string;
        url: string;
    };
}

interface EncounterDetail {
    chance: number;
    condition_values: Array<{
        name: string;
        url: string;
    }>;
    max_level: number;
    method: {
        name: string;
        url: string;
    };
    min_level: number;
}

interface VersionDetail {
    encounter_details: EncounterDetail[];
    max_chance: number;
    version: {
        name: string;
        url: string;
    };
}

interface LocationArea {
    name: string;
    url: string;
}

interface PokemonEncounter {
    location_area: LocationArea;
    version_details: VersionDetail[];
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
    stats?: PokemonStat[];
    abilities?: PokemonAbility[];
    base_experience?: number;
    species?: PokemonSpecies;
    moves?: PokemonMove[];
    order?: number;
    is_default?: boolean;
    location_area_encounters?: string;
}

interface PokemonState {
    pokemon: PokemonData | null;
    isShiny: boolean;
    fadeAnim: Animated.Value;
    scaleAnim: Animated.Value;
    bounceAnim: Animated.Value;
    rotationAnim: Animated.Value;
    encounters: PokemonEncounter[];
    loadingEncounters: boolean;
}

interface PokemonProps {
    route?: {
        params: {
            pokemon: PokemonData;
        };
    };
    navigation?: any;
}

export default class Pokemon extends Component<PokemonProps, PokemonState> {
    state: PokemonState = {
        pokemon: null,
        isShiny: false,
        fadeAnim: new Animated.Value(0),
        scaleAnim: new Animated.Value(0.8),
        bounceAnim: new Animated.Value(1),
        rotationAnim: new Animated.Value(0),
        encounters: [],
        loadingEncounters: false,
    };

    componentDidMount(): void {
        const { route } = this.props;
        if (route?.params?.pokemon) {
            this.setState({ pokemon: route.params.pokemon });
            this.startAnimations();
            this.startPokemonAnimation();
            this.loadEncounters(route.params.pokemon.id);
        }
    }

    loadEncounters = async (pokemonId: number): Promise<void> => {
        try {
            this.setState({ loadingEncounters: true });
            const response = await api.get<PokemonEncounter[]>(`/pokemon/${pokemonId}/encounters`);
            this.setState({ encounters: response.data, loadingEncounters: false });
        } catch (error) {
            console.error("Erro ao carregar encounters:", error);
            this.setState({ loadingEncounters: false });
        }
    };

    startAnimations = (): void => {
        Animated.parallel([
            Animated.timing(this.state.fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
            }),
            Animated.spring(this.state.scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: false,
            }),
        ]).start();
    };

    startPokemonAnimation = (): void => {
        // Animação sutil de movimento do Pokémon
        const bounceAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.bounceAnim, {
                    toValue: 1.05,
                    duration: 3000,
                    useNativeDriver: false,
                }),
                Animated.timing(this.state.bounceAnim, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: false,
                }),
            ])
        );

        // Animação sutil de rotação (apenas alguns graus)
        const rotationAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.rotationAnim, {
                    toValue: 0.1,
                    duration: 4000,
                    useNativeDriver: false,
                }),
                Animated.timing(this.state.rotationAnim, {
                    toValue: -0.1,
                    duration: 4000,
                    useNativeDriver: false,
                }),
                Animated.timing(this.state.rotationAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: false,
                }),
            ])
        );

        bounceAnimation.start();
        rotationAnimation.start();
    };

    toggleShiny = (): void => {
        this.setState({ isShiny: !this.state.isShiny });

        // Animação de rotação ao alternar shiny
        Animated.sequence([
            Animated.timing(this.state.rotationAnim, {
                toValue: 0.5,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(this.state.rotationAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }),
        ]).start();
    };

    render(): React.JSX.Element {
        const { pokemon, isShiny, fadeAnim, scaleAnim, bounceAnim, rotationAnim } = this.state;
        console.log(pokemon);
        if (!pokemon) {
            return (
                <PokedexContainer>
                    <PokedexBody>
                        <PokedexScreen>
                            <PokemonTitle>Pokémon não encontrado</PokemonTitle>
                        </PokedexScreen>
                    </PokedexBody>
                </PokedexContainer>
            );
        }

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

        const statColors: { [key: string]: string } = {
            hp: '#e74c3c',
            attack: '#f39c12',
            defense: '#3498db',
            'special-attack': '#9b59b6',
            'special-defense': '#2ecc71',
            speed: '#f1c40f',
        };

        const getStatPercentage = (stat: number): number => {
            return Math.min((stat / 255) * 100, 100);
        };

        const getPokemonImage = (): string => {
            if (isShiny) {
                return pokemon.sprites.other?.['official-artwork']?.front_shiny ||
                    pokemon.sprites.front_shiny ||
                    pokemon.sprites.other?.['official-artwork']?.front_default ||
                    pokemon.sprites.front_default;
            }
            return pokemon.sprites.other?.['official-artwork']?.front_default ||
                pokemon.sprites.front_default;
        };

        const rotation = rotationAnim.interpolate({
            inputRange: [-0.1, 0, 0.1],
            outputRange: ['-5deg', '0deg', '5deg'],
        });

        return (
            <PokedexContainer>
                <BackButton onPress={() => this.props.navigation?.goBack()}>
                    <BackButtonText>← Voltar</BackButtonText>
                </BackButton>

                <ScrollView
                    style={{ flex: 1, marginTop: 70 }}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }]
                        }}
                    >
                        <PokedexBody>
                            <PokedexScreen>
                                <PokemonImageContainer>
                                    <AnimatedPokemonImage
                                        source={{ uri: getPokemonImage() }}
                                        style={{
                                            transform: [
                                                { scale: bounceAnim },
                                                { rotate: rotation }
                                            ]
                                        }}
                                    />
                                </PokemonImageContainer>

                                <PokemonInfoHeader>
                                    <PokemonTitle>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</PokemonTitle>
                                    <PokemonId>#{pokemon.id.toString().padStart(3, '0')}</PokemonId>

                                    <TypeRow>
                                        {pokemon.types.map((type, index) => (
                                            <TypeChip key={index} color={typeColors[type.name]}>
                                                <TypeChipText>{type.name}</TypeChipText>
                                            </TypeChip>
                                        ))}
                                    </TypeRow>

                                    <ShinyToggle onPress={this.toggleShiny}>
                                        <ShinyToggleText>
                                            {isShiny ? '⭐ Shiny Ativo' : '✨ Ver Shiny'}
                                        </ShinyToggleText>
                                    </ShinyToggle>

                                    <MoveButton onPress={() => this.props.navigation?.navigate("pokemon-moves", { id: pokemon.id, types: pokemon.types })}>
                                        <MoveButtonText>Ver Movimentos</MoveButtonText>
                                    </MoveButton>
                                </PokemonInfoHeader>
                            </PokedexScreen>

                            {/* Descrição do Pokémon */}
                            {pokemon.species?.flavor_text_entries && (
                                <InfoSection>
                                    <SectionHeader>📖 Descrição</SectionHeader>
                                    <DescriptionText>
                                        {pokemon.species.flavor_text_entries
                                            .find(entry => entry.language.name === 'en')?.flavor_text
                                            ?.replace(/\f/g, ' ') || 'Descrição não disponível.'}
                                    </DescriptionText>
                                </InfoSection>
                            )}

                            {/* Informações Básicas Expandidas */}
                            <InfoSection>
                                <SectionHeader>📏 Informações Básicas</SectionHeader>
                                <InfoRow>
                                    <InfoLabel>Altura</InfoLabel>
                                    <InfoValue>{(pokemon.height / 10).toFixed(1)} m</InfoValue>
                                </InfoRow>
                                <InfoRow>
                                    <InfoLabel>Peso</InfoLabel>
                                    <InfoValue>{(pokemon.weight / 10).toFixed(1)} kg</InfoValue>
                                </InfoRow>
                                <InfoRow>
                                    <InfoLabel>Experiência Base</InfoLabel>
                                    <InfoValue>{pokemon.base_experience || 'N/A'}</InfoValue>
                                </InfoRow>
                                <InfoRow>
                                    <InfoLabel>Ordem Nacional</InfoLabel>
                                    <InfoValue>#{pokemon.order || pokemon.id}</InfoValue>
                                </InfoRow>
                                <InfoRow>
                                    <InfoLabel>Forma Padrão</InfoLabel>
                                    <InfoValue>{pokemon.is_default ? 'Sim' : 'Não'}</InfoValue>
                                </InfoRow>
                            </InfoSection>

                            {/* Estatísticas Melhoradas */}
                            {pokemon.stats && pokemon.stats.length > 0 && (
                                <StatsContainer>
                                    <SectionHeader>📊 Estatísticas de Batalha</SectionHeader>
                                    {pokemon.stats.map((stat, index) => (
                                        <StatItem key={index}>
                                            <StatLabel>{stat.stat.name.replace('-', ' ')}</StatLabel>
                                            <StatBarContainer>
                                                <StatBarFill
                                                    percentage={getStatPercentage(stat.base_stat)}
                                                    color={statColors[stat.stat.name] || '#3498db'}
                                                />
                                            </StatBarContainer>
                                            <StatValue>{stat.base_stat}</StatValue>
                                        </StatItem>
                                    ))}
                                </StatsContainer>
                            )}

                            {/* Habilidades */}
                            {pokemon.abilities && pokemon.abilities.length > 0 && (
                                <InfoSection>
                                    <SectionHeader>⚡ Habilidades</SectionHeader>
                                    {pokemon.abilities.map((ability, index) => (
                                        <AbilityCard key={index}>
                                            <AbilityName>
                                                {ability.ability.name.replace('-', ' ')}
                                                {ability.is_hidden && ' (Oculta)'}
                                            </AbilityName>
                                            <AbilityDescription>
                                                {ability.is_hidden
                                                    ? 'Habilidade especial que só pode ser obtida através de métodos específicos.'
                                                    : 'Habilidade padrão deste Pokémon.'
                                                }
                                            </AbilityDescription>
                                        </AbilityCard>
                                    ))}
                                </InfoSection>
                            )}



                            {/* Movimentos */}
                            {pokemon.moves && pokemon.moves.length > 0 && (
                                <MovesSection>
                                    <SectionHeader>🥊 Movimentos ({pokemon.moves.length})</SectionHeader>
                                    <MovesGrid>
                                        {pokemon.moves.slice(0, 20).map((move, index) => (
                                            <MoveCard key={index}>
                                                <MoveName>{move.move.name.replace('-', ' ')}</MoveName>
                                                <MoveLevel>
                                                    Nível {move.version_group_details[0]?.level_learned_at || '?'}
                                                </MoveLevel>
                                            </MoveCard>
                                        ))}
                                    </MovesGrid>
                                    {pokemon.moves.length > 20 && (
                                        <DescriptionText>
                                            ... e mais {pokemon.moves.length - 20} movimentos
                                        </DescriptionText>
                                    )}
                                </MovesSection>
                            )}

                            {/* Locais de Encontro */}
                            <EncountersSection>
                                <SectionHeader>🗺️ Locais de Encontro</SectionHeader>
                                {this.state.loadingEncounters ? (
                                    <ActivityIndicator size="small" color="#3498db" style={{ margin: 20 }} />
                                ) : this.state.encounters.length > 0 ? (
                                    this.state.encounters.map((encounter, index) => (
                                        <LocationCard key={index}>
                                            <LocationName>
                                                {encounter.location_area.name.replace(/-/g, ' ')}
                                            </LocationName>
                                            {encounter.version_details.map((versionDetail, vIndex) => (
                                                <VersionContainer key={vIndex}>
                                                    <VersionName>
                                                        {versionDetail.version.name.replace(/-/g, ' ')}
                                                    </VersionName>
                                                    {versionDetail.encounter_details.map((encounterDetail, eIndex) => (
                                                        <EncounterDetails key={eIndex}>
                                                            <EncounterMethod>
                                                                {encounterDetail.method.name.replace(/-/g, ' ')}
                                                            </EncounterMethod>
                                                            <EncounterLevel>
                                                                Nível {encounterDetail.min_level}
                                                                {encounterDetail.min_level !== encounterDetail.max_level
                                                                    ? ` - ${encounterDetail.max_level}`
                                                                    : ''
                                                                }
                                                            </EncounterLevel>
                                                            {encounterDetail.chance < 100 && (
                                                                <EncounterChance>
                                                                    Chance: {encounterDetail.chance}%
                                                                </EncounterChance>
                                                            )}
                                                        </EncounterDetails>
                                                    ))}
                                                </VersionContainer>
                                            ))}
                                        </LocationCard>
                                    ))
                                ) : (
                                    <NoEncountersText>
                                        Este Pokémon não pode ser encontrado em locais selvagens.
                                    </NoEncountersText>
                                )}
                            </EncountersSection>
                        </PokedexBody>
                    </Animated.View>
                </ScrollView>
            </PokedexContainer>
        );
    }
}