import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { View, Text } from 'react-native';
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
      <View>
        <DeckItem deck={deck} doNavigate={false} />
        <CustomButton>
          Add Card
        </CustomButton>
        <CustomButton>
          Start Quiz
        </CustomButton>
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
  if (!commons.isEmpty(navigation)
      && !commons.isNull(navigation.state)
      && !commons.isNull(navigation.state.params)
      && !commons.isNull(navigation.state.params.deckId)) {
    const { deckId } = navigation.state.params;
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
