import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import reducers from './home/homeReducers';
import middlewares from './utils/middlewares';
import { StyleSheet, View } from 'react-native';
import Home from './home/Home';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers, middlewares)}>
        <View style={styles.container}>
          <Home />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});