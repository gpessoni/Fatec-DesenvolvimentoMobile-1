import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { Animated } from "react-native";

// Estilos da Pokedex
export const Container = styled.View`
  flex: 1;
  background-color: #ff6b6b;
  padding: 20px;
`;

export const PokedexHeader = styled.View`
  background: #2c3e50;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  border: 4px solid #34495e;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 8;
`;

export const PokedexTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  margin-bottom: 10px;
`;

export const PokedexSubtitle = styled.Text`
  font-size: 14px;
  color: #bdc3c7;
  text-align: center;
`;

export const Form = styled.View`
  flex-direction: row;
  background: #ffffff;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 20px;
  border: 3px solid #e9ecef;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 4;
  align-items: center;
  gap: 10px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#7f8c8d",
})`
  flex: 1;
  height: 50px;
  justify-content: center;
  align-items: center;
  width: 80%;
  background: #ffffff;
  border-radius: 12px;
  padding: 0 15px;
  border: 2px solid #e9ecef;
  font-size: 16px;
  color: #2c3e50;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  background: #2c3e50;
  border-radius: 12px;
  padding: 0 18px;
  height: 50px;
  max-width: 30px;
  border: 2px solid #2c3e50;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 4;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const User = styled.View`
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  margin: 10px 0;
  border: 3px solid #34495e;
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  elevation: 6;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background: #ecf0f1;
  align-self: center;
  border: 3px solid #34495e;
`;

export const Name = styled.Text`
  font-size: 18px;
  color: #2c3e50;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
  text-transform: capitalize;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 14px;
  line-height: 20px;
  color: #7f8c8d;
  margin-top: 8px;
  text-align: center;
`;

export const ProfileButton = styled(RectButton)`
  margin-top: 15px;
  align-self: stretch;
  border-radius: 10px;
  background: #3498db;
  justify-content: center;
  align-items: center;
  height: 40px;
  border: 2px solid #2980b9;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;

export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

//Estilos da página Users
export const Header = styled.View`
  padding: 30px;
  align-items: center;
  justify-content: center;
`;

export const AvatarPerfil = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #eee;
`;

export const NamePerfil = styled.Text`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;

export const BioPerfil = styled.Text`
  font-size: 15px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const Stars = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Starred = styled.View`
  background: #f5f5f5;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const OwnerAvatar = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: #eee;
`;

export const Info = styled.Text`
  margin-left: 10px;
  flex: 1;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;

export const Author = styled.Text`
  font-size: 13px;
  color: #666;
  margin-top: 2px;
`;

// Estilos para página de detalhes do Pokemon
export const PokemonContainer = styled.View`
  flex: 1;
  background-color: #ff6b6b;
`;

export const PokemonHeader = styled.View`
  background-color: #2c3e50;
  padding: 30px 20px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 8;
`;

export const PokemonImage = styled.Image`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

export const PokemonName = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  text-transform: capitalize;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

export const PokemonNumber = styled.Text`
  font-size: 18px;
  color: #bdc3c7;
  margin-bottom: 15px;
`;

export const TypeContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export const TypeBadge = styled.View<{ color?: string }>`
  background-color: ${props => props.color || '#A8A878'};
  padding: 8px 16px;
  border-radius: 20px;
  margin: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;

export const TypeText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  text-transform: capitalize;
`;


export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15px;
  text-align: center;
`;

export const StatRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px 0;
`;


export const InfoGrid = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const InfoCard = styled.View`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 15px;
  flex: 1;
  margin: 5px;
  align-items: center;
  border: 2px solid #e9ecef;
`;


export const AbilitiesContainer = styled.View`
  background: #fff;
  margin: 20px;
  border-radius: 20px;
  padding: 20px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 8;
`;

export const AbilityItem = styled.View`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 8px;
  border-left-width: 4px;
  border-left-color: #3498db;
`;


export const ShinyButton = styled.TouchableOpacity`
  background: #f39c12;
  padding: 10px 20px;
  border-radius: 25px;
  margin: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 4;
`;

export const ShinyButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

// Estilos para Pokedex autêntica
export const PokedexContainer = styled.View`
  flex: 1;
  background-color: #2c3e50;
  padding: 20px;
`;

export const PokedexBody = styled.View`
  background-color: #e74c3c;
  border-radius: 30px;
  padding: 20px;
  margin: 10px 0;
  border: 8px solid #c0392b;
  shadow-color: #000;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.4;
  shadow-radius: 15px;
  elevation: 15;
  min-height: 600px;
`;

export const PokedexScreen = styled.View`
  background-color:rgb(255, 255, 255);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  border: 6px solid #34495e;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 8;
`;

export const PokemonImageContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

export const AnimatedPokemonImage = styled(Animated.Image)`
  width: 180px;
  height: 180px;
`;

export const PokemonInfoHeader = styled.View`
  background-color: #2c3e50;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  border: 3px solid #34495e;
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 6;
`;

export const PokemonTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  text-transform: capitalize;
  margin-bottom: 5px;
`;

export const PokemonId = styled.Text`
  font-size: 16px;
  color: #bdc3c7;
  text-align: center;
  margin-bottom: 10px;
`;

export const TypeRow = styled.View`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export const TypeChip = styled.View<{ color?: string }>`
  background-color: ${props => props.color || '#A8A878'};
  padding: 8px 16px;
  border-radius: 20px;
  margin: 4px;
  border: 3px solid #fff;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 4;
`;

export const TypeChipText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  text-transform: capitalize;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
`;

export const InfoSection = styled.View`
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  border: 4px solid #34495e;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 8;
`;

export const SectionHeader = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15px;
  text-align: center;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom-width: 1px;
  border-bottom-color: #ecf0f1;
`;

export const InfoLabel = styled.Text`
  font-size: 14px;
  color: #7f8c8d;
  font-weight: 600;
  text-transform: uppercase;
`;

export const InfoValue = styled.Text`
  font-size: 14px;
  color: #2c3e50;
  font-weight: bold;
`;

export const StatsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const StatCard = styled.View`
  background-color: #f8f9fa;
  border-radius: 15px;
  padding: 15px;
  margin: 8px;
  width: 48%;
  align-items: center;
  border: 3px solid #e9ecef;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 4;
`;

export const StatName = styled.Text`
  font-size: 12px;
  color: #6c757d;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 5px;
`;


export const AbilityCard = styled.View`
  background-color: #f8f9fa;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 12px;
  border-left-width: 5px;
  border-left-color: #3498db;
  border: 2px solid #e9ecef;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 4;
`;

export const AbilityName = styled.Text`
  font-size: 14px;
  color: #2c3e50;
  font-weight: bold;
  text-transform: capitalize;
`;

export const AbilityDescription = styled.Text`
  font-size: 12px;
  color: #6c757d;
  margin-top: 4px;
`;

export const EvolutionSection = styled.View`
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  border: 4px solid #34495e;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 8;
`;

export const EvolutionChain = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
`;


export const HabitatSection = styled.View`
  background-color: #fff;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 15px;
  border: 3px solid #34495e;
`;

export const HabitatInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const HabitatCard = styled.View`
  background-color: #e8f5e8;
  border-radius: 10px;
  padding: 10px;
  flex: 1;
  margin: 5px;
  align-items: center;
`;

export const HabitatLabel = styled.Text`
  font-size: 12px;
  color: #27ae60;
  font-weight: bold;
  text-transform: uppercase;
`;

export const HabitatValue = styled.Text`
  font-size: 14px;
  color: #2c3e50;
  font-weight: bold;
  margin-top: 5px;
`;

export const ShinyToggle = styled.TouchableOpacity`
  background-color: #f39c12;
  padding: 15px 30px;
  border-radius: 30px;
  margin: 15px;
  border: 4px solid #e67e22;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.4;
  shadow-radius: 8px;
  elevation: 8;
`;

export const ShinyToggleText = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-size: 16px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
`;

export const PokedexButton = styled.TouchableOpacity`
  background-color: #3498db;
  padding: 15px 25px;
  border-radius: 25px;
  margin: 8px;
  border: 4px solid #2980b9;
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 6;
`;

export const PokedexButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-size: 14px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 25px;
  left: 25px;
  background-color: #e74c3c;
  padding: 12px 18px;
  border-radius: 25px;
  border: 4px solid #c0392b;
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.4;
  shadow-radius: 6px;
  elevation: 6;
  z-index: 1000;
`;

export const BackButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
`;

// Novos estilos para seções expandidas
export const DescriptionText = styled.Text`
  font-size: 14px;
  color: #555;
  line-height: 20px;
  text-align: center;
  font-style: italic;
  margin: 10px 0;
`;

export const MovesGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
`;

export const MoveCard = styled.View`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 10px;
  margin: 5px;
  width: 48%;
  align-items: center;
  border: 2px solid #e9ecef;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
`;

export const MoveName = styled.Text`
  font-size: 12px;
  color: #2c3e50;
  font-weight: bold;
  text-align: center;
  text-transform: capitalize;
`;

export const MoveLevel = styled.Text`
  font-size: 10px;
  color: #6c757d;
  margin-top: 4px;
`;

export const SpeciesInfo = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
`;

export const SpeciesCard = styled.View`
  background-color: #e8f5e8;
  border-radius: 12px;
  padding: 12px;
  margin: 5px;
  flex: 1;
  min-width: 45%;
  align-items: center;
  border: 2px solid #c3e6c3;
`;

export const SpeciesLabel = styled.Text`
  font-size: 12px;
  color: #27ae60;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

export const SpeciesValue = styled.Text`
  font-size: 14px;
  color: #2c3e50;
  font-weight: bold;
  text-align: center;
  text-transform: capitalize;
`;

export const LegendaryBadge = styled.View`
  background-color: #f39c12;
  padding: 6px 12px;
  border-radius: 15px;
  margin: 5px;
  border: 2px solid #e67e22;
`;

export const LegendaryText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
`;

export const StatsContainer = styled.View`
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  border: 4px solid #34495e;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 8;
`;

export const StatItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e9ecef;
`;

export const StatLabel = styled.Text`
  font-size: 14px;
  color: #2c3e50;
  font-weight: bold;
  text-transform: uppercase;
  min-width: 120px;
`;

export const StatBarContainer = styled.View`
  flex: 1;
  height: 12px;
  background-color: #e9ecef;
  border-radius: 6px;
  margin: 0 15px;
  overflow: hidden;
`;

export const StatBarFill = styled.View<{ color?: string; percentage?: number }>`
  height: 100%;
  background-color: ${props => props.color || '#3498db'};
  border-radius: 6px;
  width: ${props => props.percentage || 0}%;
`;

export const StatValue = styled.Text`
  font-size: 16px;
  color: #2c3e50;
  font-weight: bold;
  min-width: 40px;
  text-align: right;
`;

export const EvolutionItem = styled.View`
  align-items: center;
  flex: 1;
  margin: 10px;
`;

export const EvolutionImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #ecf0f1;
  border: 3px solid #bdc3c7;
`;

export const EvolutionName = styled.Text`
  font-size: 14px;
  color: #2c3e50;
  font-weight: bold;
  text-align: center;
  margin-top: 8px;
  text-transform: capitalize;
`;

export const EvolutionArrow = styled.Text`
  font-size: 24px;
  color: #3498db;
  font-weight: bold;
  margin: 0 10px;
`;

export const MovesSection = styled.View`
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  border: 4px solid #34495e;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 8;
`;

export const SpeciesSection = styled.View`
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  border: 4px solid #34495e;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 8;
`;

// Estilos para tela principal Pokedex
export const PokedexMainContainer = styled.View`
  flex: 1;
  background-color: #2c3e50;
  padding: 20px;
`;

export const PokedexMainBody = styled.View`
  flex: 1;
  background-color: #e74c3c;
  border-radius: 30px;
  min-height: 590px;
  padding: 20px;
  margin-bottom: 20px;
  border: 8px solid #c0392b;
  shadow-color: #000;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.4;
  shadow-radius: 15px;
  elevation: 15;
`;

export const PokedexMainScreen = styled.View`
  background-color: #f8f9fa;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  border: 6px solid #34495e;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 8;
  position: relative;
`;

export const FilterButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(52, 73, 94, 0.9);
  padding: 12px;
  border-radius: 25px;
  border: 2px solid #34495e;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
  z-index: 10;
`;

export const FilterButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin-left: 8px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`;

export const PokemonCard = styled.View`
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 15px;
  border: 4px solid #34495e;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 8;
  min-height: 100px;
`;

export const PokemonCardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const PokemonCardImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #ecf0f1;
  border: 3px solid #bdc3c7;
  margin-right: 15px;
`;

export const PokemonCardInfo = styled.View`
  flex: 1;
`;

export const PokemonCardName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  text-transform: capitalize;
  margin-bottom: 5px;
`;

export const PokemonCardId = styled.Text`
  font-size: 16px;
  color: #7f8c8d;
  font-weight: 600;
`;

export const PokemonCardTypes = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const PokemonCardType = styled.View<{ color?: string }>`
  background-color: ${props => props.color || '#A8A878'};
  padding: 4px 12px;
  border-radius: 15px;
  margin: 2px;
  border: 2px solid #fff;
`;

export const PokemonCardTypeText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  text-transform: capitalize;
`;

export const PokemonCardActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
`;

export const ActionButton = styled.TouchableOpacity<{ variant?: string }>`
  background-color: ${props => props.variant === 'danger' ? '#e74c3c' : '#3498db'};
  padding: 12px 20px;
  border-radius: 20px;
  border: 3px solid ${props => props.variant === 'danger' ? '#c0392b' : '#2980b9'};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 4;
  flex: 1;
  margin: 0 5px;
`;

export const ActionButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-size: 14px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`;

export const EmptyState = styled.View`
  background-color: #fff;
  border-radius: 20px;
  padding: 40px 20px;
  margin: 20px 0;
  border: 4px solid #34495e;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 8;
`;

export const EmptyStateText = styled.Text`
  font-size: 18px;
  color: #7f8c8d;
  text-align: center;
  font-weight: 600;
  margin-top: 15px;
`;

export const EmptyStateSubtext = styled.Text`
  font-size: 14px;
  color: #bdc3c7;
  text-align: center;
  margin-top: 5px;
`;

// Modal de Filtros
export const ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.View`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  margin: 20px;
  border: 2px solid #e5e7eb;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  elevation: 8;
  max-height: 90%;
  width: 90%;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
`;

export const CloseButton = styled.TouchableOpacity`
  background-color: transparent;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #2c3e50;
`;

export const CloseButtonText = styled.Text`
  color: #2c3e50;
  font-weight: 600;
  font-size: 14px;
`;

export const FilterSection = styled.View`
  margin-bottom: 20px;
`;

export const FilterLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
`;

export const FilterInput = styled.TextInput`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 12px 15px;
  border: 1px solid #e5e7eb;
  font-size: 16px;
  color: #2c3e50;
`;

export const FilterOptions = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const FilterOption = styled.TouchableOpacity<{ selected?: boolean }>`
  background-color: ${props => props.selected ? '#3498db' : '#ecf0f1'};
  padding: 8px 16px;
  border-radius: 20px;
  margin: 5px;
  border: 2px solid ${props => props.selected ? '#2980b9' : '#bdc3c7'};
`;

export const FilterOptionText = styled.Text<{ selected?: boolean }>`
  color: ${props => props.selected ? '#fff' : '#2c3e50'};
  font-weight: bold;
  font-size: 14px;
  text-transform: capitalize;
`;

export const ApplyFiltersButton = styled.TouchableOpacity<{ variant?: 'primary' | 'secondary' }>`
  background-color: ${props => props.variant === 'secondary' ? 'transparent' : '#2c3e50'};
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #2c3e50;
  shadow-color: transparent;
  elevation: 0;
  margin-top: 12px;
`;

export const ApplyFiltersButtonText = styled.Text<{ variant?: 'primary' | 'secondary' }>`
  color: ${props => props.variant === 'secondary' ? '#2c3e50' : '#ffffff'};
  font-weight: 600;
  text-align: center;
  font-size: 14px;
`;

// Minimal dropdown components
export const DropdownContainer = styled.View`
  margin-top: 8px;
`;

export const DropdownHeader = styled.TouchableOpacity`
  background-color: #f8f9fa;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 14px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DropdownHeaderText = styled.Text`
  color: #2c3e50;
  font-size: 16px;
`;

export const DropdownList = styled.View`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  margin-top: 6px;
  overflow: hidden;
`;

export const DropdownItem = styled.TouchableOpacity`
  padding: 12px 14px;
`;

export const DropdownItemText = styled.Text`
  color: #2c3e50;
  font-size: 16px;
`;

export const FormRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

// Estilos para seção de encounters
export const EncountersSection = styled.View`
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  border: 4px solid #34495e;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 8;
`;

export const LocationCard = styled.View`
  background-color: #f8f9fa;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 12px;
  border: 2px solid #e9ecef;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 4;
`;

export const LocationName = styled.Text`
  font-size: 16px;
  color: #2c3e50;
  font-weight: bold;
  text-transform: capitalize;
  margin-bottom: 8px;
`;

export const VersionContainer = styled.View`
  margin-top: 8px;
`;

export const MoveButton = styled.TouchableOpacity`
  background-color: #e74c3c;
  padding: 12px 20px;
  border-radius: 10px;
  align-items: center;
  margin-top: 10px;
`;

export const MoveButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

export const VersionName = styled.Text`
  font-size: 14px;
  color: #7f8c8d;
  font-weight: 600;
  margin-bottom: 4px;
  text-transform: capitalize;
`;

export const EncounterDetails = styled.View`
  background-color: #e8f5e8;
  border-radius: 8px;
  padding: 8px;
  margin: 4px 0;
  border-left-width: 3px;
  border-left-color: #27ae60;
`;

export const EncounterMethod = styled.Text`
  font-size: 13px;
  color: #27ae60;
  font-weight: bold;
  text-transform: capitalize;
`;

export const EncounterLevel = styled.Text`
  font-size: 12px;
  color: #2c3e50;
  margin-top: 2px;
`;

export const EncounterChance = styled.Text`
  font-size: 12px;
  color: #7f8c8d;
  margin-top: 2px;
`;

export const NoEncountersText = styled.Text`
  font-size: 14px;
  color: #7f8c8d;
  text-align: center;
  font-style: italic;
  margin: 20px 0;
`;

// Estilos para notificação de sucesso
export const SuccessToast = styled.View`
  position: absolute;
  top: 50px;
  left: 20px;
  right: 20px;
  background-color: #27ae60;
  border-radius: 15px;
  padding: 15px 20px;
  flex-direction: row;
  align-items: center;
  border: 3px solid #2ecc71;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 8;
  z-index: 1000;
`;

export const SuccessToastText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
  flex: 1;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`;

export const SuccessToastIcon = styled.View`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

// Estilos para notificação de erro
export const ErrorToast = styled.View`
  position: absolute;
  top: 50px;
  left: 20px;
  right: 20px;
  background-color: #c0392b;
  border-radius: 15px;
  padding: 15px 20px;
  flex-direction: row;
  align-items: center;
  border: 3px solid #e74c3c;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 8;
  z-index: 1000;
`;

export const ErrorToastText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
  flex: 1;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`;

export const ErrorToastIcon = styled.View`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

// ====== Compare Screen Styles ======
export const CompareCard = styled.View`
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  border: 4px solid #34495e;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 8;
`;

export const CompareHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CompareVS = styled.Text`
  font-size: 24px;
  font-weight: 900;
  color: #2c3e50;
  padding: 0 10px;
`;

export const CompareRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CompareColumn = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

export const CompareAvatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: #ecf0f1;
  border: 4px solid #bdc3c7;
`;

export const CompareName = styled.Text`
  margin-top: 10px;
  font-size: 18px;
  color: #2c3e50;
  font-weight: bold;
  text-transform: capitalize;
`;

export const CompareTypesRow = styled.View`
  margin-top: 8px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CompareTypeChip = styled.View`
  background-color: #95a5a6;
  padding: 4px 10px;
  border-radius: 12px;
  margin: 2px;
  border: 2px solid #ecf0f1;
`;

export const CompareTypeChipText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  text-transform: capitalize;
`;

export const CompareSectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 12px;
`;

export const DualStatRow = styled.View`
  margin-bottom: 12px;
`;

export const DualStatLabel = styled.Text`
  color: #7f8c8d;
  font-size: 13px;
  text-transform: capitalize;
  margin-bottom: 6px;
`;

export const DualStatBars = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DualStatBar = styled.View<{ percentage: number; color: string }>`
  height: 10px;
  background-color: ${props => props.color};
  width: ${props => `${Math.max(8, Math.min(100, props.percentage))}%`};
  border-radius: 8px;
`;

export const DualStatValue = styled.Text<{ alignRight?: boolean }>`
  color: #2c3e50;
  font-weight: 700;
  font-size: 12px;
  margin-top: 6px;
  ${props => props.alignRight ? 'text-align: right;' : 'text-align: left;'}
`;
