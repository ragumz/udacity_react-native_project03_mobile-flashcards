import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './home/homeReducers';
import middlewares from './utils/middlewares';
import { View, Platform } from 'react-native';
import Home from './home/Home';
import DeckEdit from './deck/DeckEdit';
import DeckDetail from './deck/DeckDetail';
import DeckCardsQuiz from './deck/DeckCardsQuiz';
import CardEdit from './card/CardEdit';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import FCStatusBar from './home/FCStatusBar';
import { COLORS } from './utils/constants';

/**
 * @description Main screen tabs navigation route configuration
 */
const RouteConfigs = {
  ListDecks: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="cards" size={25} color={tintColor} />
      )
    }
  },
  NewDeck: {
    screen: DeckEdit,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => (
        <MaterialIcons name="library-add" size={25} color={tintColor} />
      )
    })
  }
};

/**
 * @description Main screen tabs layout
 */
const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    showLabel: true,
    showIcon: true,
    activeTintColor: Platform.OS === 'ios' ? COLORS.BLUE : COLORS.WHITE,
    style: {
      height: 60,
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowColor: 'rgba(0, 0, 0, 0.33)',
      shadowRadius: 5,
      shadowOpacity: 0.5,
      backgroundColor: Platform.OS === 'ios' ? COLORS.WHITE : COLORS.BLUE,
    }
  }
};

/**
 * @description Tab navigation container instance to join the tab route and layout
 */
const Tabs = createAppContainer(
  Platform.OS === 'ios'
    ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
    : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig)
);

/**
 * @description Stack navigation container instance with all navigable components
 */
const MainNavigator = createAppContainer(
  createStackNavigator({
    home: {
      screen: Tabs,
      navigationOptions: {
        header: null
      }
    },
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: COLORS.WHITE,
        headerStyle: {
          backgroundColor: COLORS.BLUE
        }
      })
    },
    DeckEdit: {
      screen: DeckEdit,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: COLORS.WHITE,
        headerStyle: {
          backgroundColor: COLORS.BLUE
        }
      })
    },
    CardEdit: {
      screen: CardEdit,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: COLORS.WHITE,
        headerStyle: {
          backgroundColor: COLORS.BLUE
        }
      })
    },
    DeckCardsQuiz: {
      screen: DeckCardsQuiz,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: COLORS.WHITE,
        headerStyle: {
          backgroundColor: COLORS.BLUE
        }
      })
    },
  })
);

/**
 * @description Main app layout and component configuration
 */
export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers, middlewares)}>
        <View style={{ flex: 1 }}>
          <FCStatusBar backgroundColor={COLORS.BLUE} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
