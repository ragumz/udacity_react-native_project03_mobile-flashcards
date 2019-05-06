import React from 'react';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { handleInitialData, showAlert } from '../common/sharedOperations';
import { hideMessage } from '../common/sharedActions';
import { StyleSheet, Text, View } from 'react-native';

/**
 * @description Home page React Component with all categories and posts lists
 */
class Home extends React.Component {
  /**
   * @description Lifecycle function to initialize application state
   */
  componentDidMount() {
    //this.props.dispatch(handleInitialData());
    console.log('Loading data...');
  }

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  render() {
    const { loading, userMessage, dispatch } = this.props;
    if (loading === true) {
      return <AppLoading />;
    }
    if (userMessage) {
      return showAlert(
        Object.assign({}, userMessage, {
          buttons: [{ text: 'OK', onPress: () => dispatch(hideMessage) }]
        })
      );
    }
    return (
      <View>
        <View style={styles.home}>
          <Text>Mobile Flash Cards</Text>
        </View>
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

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
