import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { handleInitialData, showAlert } from '../common/sharedOperations';
import { hideMessage } from '../common/sharedActions';
import { View } from 'react-native';
import DeckList from '../deck/DeckList';
import { OWNER_VIEWS } from '../utils/constants';
import * as commons from '../utils/commons';
//import { clearStorage } from '../utils/api';

/**
 * @description Home page React Component with all categories and posts lists
 */
class Home extends Component {
  /**
   * @description Lifecycle function to initialize application state
   */
  componentDidMount() {
//    console.log('Restarting data...');
//    clearStorage();
    console.log('Loading data...');
    this.props.dispatch(handleInitialData(OWNER_VIEWS.HOME));
  }

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  render() {
    const { loading, userMessage, dispatch } = this.props;
    if (commons.canShowLoading(OWNER_VIEWS.HOME, loading)) {
      return <AppLoading />;
    }
    if (commons.canShowAlert(OWNER_VIEWS.HOME, userMessage)) {
      showAlert(
        Object.assign({}, userMessage, {
          buttons: [{ text: 'OK', onPress: () => dispatch(hideMessage(OWNER_VIEWS.HOME)) }]
        })
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <DeckList />
      </View>
    );
  }
}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps({ shared }) {
  return {
    //global redux user message
    userMessage: shared.userMessage,
    //global loading state
    loading: shared.loading
  };
}

export default connect(mapStateToProps)(Home);
