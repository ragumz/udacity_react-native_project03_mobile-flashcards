import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './home/homeReducers';
import middlewares from './utils/middlewares';
import { View, Platform } from 'react-native';
import Home from './home/Home';
import DeckEdit from './deck/DeckEdit';
import DeckDetail from './deck/DeckDetail';
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

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? COLORS.BLUE : COLORS.WHITE,
    showLabel: true,
    showIcon: true,
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
