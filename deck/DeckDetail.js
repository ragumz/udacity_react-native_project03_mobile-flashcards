import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import * as commons from '../utils/commons';
import DeckItem from './DeckItem';
import CustomButton from '../common/CustomButton';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params;
    return {
      title: `${deckTitle}`,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };
  render() {
    const { deck } = this.props;
    return (
      <View style={styles.detail}>
        <DeckItem deck={deck} doNavigate={false} />
        <View>
          <CustomButton style={[{marginBottom: 10}, styles.button]}>
            Add Card
          </CustomButton>
          <CustomButton style={styles.button}>
            Start Quiz
          </CustomButton>
        </View>
      </View>
    );
  }
}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps({ decks, questions }, { navigation }) {
  let deck = null;
  let deckQuestions = null;
  let deckId = commons.getNavigationParam(navigation, 'deckId');
  if (!commons.isEmpty(deckId)) {
    deck = decks[deckId];
    deckQuestions = Object.values(questions).filter(question => question.decks === deckId);
  }
  return {
    deck,
    questions: deckQuestions,
    navigation,
  };
}

export default withNavigation(connect(mapStateToProps)(DeckDetail));

const styles = StyleSheet.create({
  detail: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    width: 150,
    fontSize: 16,
    fontWeight: 'bold',
  }
});