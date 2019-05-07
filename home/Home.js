import React from 'react';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { handleInitialData, showAlert } from '../common/sharedOperations';
import { hideMessage } from '../common/sharedActions';
import { StyleSheet, View } from 'react-native';
import * as commons from '../utils/commons';
import DeckList from '../deck/DeckList';

/**
 * @description Home page React Component with all categories and posts lists
 */
class Home extends React.Component {
  /**
   * @description Lifecycle function to initialize application state
   */
  componentDidMount() {
    console.log('Loading data...');
    this.props.dispatch(handleInitialData());
  }

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  render() {
    const { loading, userMessage, dispatch } = this.props;
    if (loading === true) {
      return <AppLoading />;
    }
    if (!commons.isNull(userMessage)) {
      return showAlert(
        Object.assign({}, userMessage, {
          buttons: [{ text: 'OK', onPress: () => dispatch(hideMessage) }]
        })
      );
    }
    return (
      <View style={{flex: 1}}>
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

