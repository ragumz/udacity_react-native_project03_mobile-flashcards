import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData, showAlert } from '../common/sharedOperations';
import { hideMessage } from '../common/sharedActions';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import DeckList from '../deck/DeckList';
import { OWNER_VIEWS } from '../utils/constants';
import * as commons from '../utils/commons';
import { COLORS } from '../utils/constants'
import { STORAGE_KEYS } from '../utils/constants';
import { scheduleNotification } from '../utils/notifications';
//import { clearStorage } from '../utils/api';

/**
 * @description Home page component to initialize AsyncStorage and show all Decks
 */
class Home extends Component {
  /**
   * @description Lifecycle function to initialize application state
   */
  componentDidMount() {
    //clear the AsyncStorage and reset to default Decks and Cards data
//    clearStorage();

    //schedule a new daily notification for everyday study quiz
    try {
      scheduleNotification(STORAGE_KEYS.NOTIFICATION_TODAY);
    } catch (error) {
      console.log(error.stack);
    }

    //load AsyncStorage data
    this.props.dispatch(handleInitialData(OWNER_VIEWS.HOME));
  }

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  render() {
    const { loading, userMessage, dispatch } = this.props;
    if (commons.canShowLoading(OWNER_VIEWS.HOME, loading)) {
      //show loading ui if directed to this component
      return <View style={styles.loading}>
          <ActivityIndicator size='large' color={COLORS.BLUE} />
        </View>;
    }
    if (commons.canShowAlert(OWNER_VIEWS.HOME, userMessage)) {
      //show alert dialog if directed to this component
      showAlert(
        Object.assign({}, userMessage, {
          buttons: [{ text: 'OK', onPress: () => dispatch(hideMessage(OWNER_VIEWS.HOME)) }]
        })
      );
    }
    //presents the DeckList component
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

/**
 * @description Component Flexbox styles definitions
 */
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10
  }
});