import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './home/homeReducers';
import middlewares from './utils/middlewares';
import { StyleSheet, View, Platform } from 'react-native';
import Home from './home/Home';
import DeckEdit from './deck/DeckEdit';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import FCStatusBar from './home/FCStatusBar';
import { COLORS } from './utils/constants';
import DeckItem from './deck/DeckItem';

const RouteConfigs = {
  ListDecks: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
      )
    }
  },
  EditDeck: {
    screen: DeckEdit,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
      tabBarIcon: ({ tintColor }) => (
        <MaterialIcons name="library-add" size={30} color={tintColor} />
      )
    }
  }
};

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? COLORS.BLUE : COLORS.WHITE,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? COLORS.WHITE : COLORS.BLUE,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};
const Tabs = createAppContainer(
  Platform.OS === 'ios'
    ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
    : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig)
);

const MainNavigator = createAppContainer(
  createStackNavigator({
    home: {
      screen: Tabs,
      navigationOptions: {
        header: null
      }
    },
    DeckDetail: {
      screen: DeckItem,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: COLORS.WHITE,
        headerStyle: {
          backgroundColor: COLORS.BLUE
        }
      })
    }
  })
);

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
