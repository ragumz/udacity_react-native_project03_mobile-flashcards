import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Text, View, StyleSheet } from 'react-native';
import * as commons from '../utils/commons';
import { COLORS } from '../utils/constants';
import DeckItem from './DeckItem';
import CustomButton from '../common/CustomButton';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: `Deck : ${deckId}`,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  handleAddCard = () => {
    const { deck, navigation } = this.props;
    navigation.navigate('CardEdit', {
      deckId: deck.id,
      deckTitle: deck.title,
      cardId: null,
    });
  }

  handleStartQuiz = () => {
    const { deck, navigation } = this.props;
    navigation.navigate('DeckCardsQuiz', {
      deckId: deck.id,
      deckTitle: deck.title,
    });
  }

  render() {
    const { deck, cards } = this.props;
    const { created, quizStatistics, bestScore, worstScore } = deck;
    const totalTime = commons.msToTime(quizStatistics.totalTimeMilis);
    let bestScorePercent, bestScoreTime, bestScoreDate;
    if (bestScore.correctAnswers > -1) {
      bestScorePercent = (bestScore.correctAnswers/bestScore.deckSize)*100;
      bestScorePercent = bestScorePercent.toFixed(0);
      bestScoreTime = commons.msToTime(commons.getDateMilisDifference(bestScore.startTime, bestScore.endTime));
      bestScoreDate = commons.formatDate(bestScore.startTime);
    }
    let worstScorePercent='', worstScoreTime='', worstScoreDate='';
    if (worstScore.correctAnswers > -1 && worstScore.correctAnswers !== bestScore.correctAnswers) {
      worstScorePercent = (worstScore.correctAnswers/worstScore.deckSize)*100;
      worstScorePercent = worstScorePercent.toFixed(0);
      worstScoreTime = commons.msToTime(commons.getDateMilisDifference(worstScore.startTime, worstScore.endTime));
      worstScoreDate = commons.formatDate(worstScore.startTime);
    }
    return (
      <View style={styles.detail}>
        <View style={{marginTop: 25}}>
          <DeckItem deck={deck} doNavigate={false} />
          <Text style={[styles.fieldsText, {marginTop: 5}]}>
            Created at {commons.formatDate(created)}
          </Text>
        </View>
        <View>
          {bestScore.correctAnswers > -1 &&
            <Text style={styles.statsText}>
              Quiz completed {quizStatistics.timesCompleted} times in a total of {totalTime}.
            </Text>
          }
          {bestScore.correctAnswers > -1 &&
            <Text style={[styles.statsText, {color: COLORS.DARDK_GREEN}]}>
              Best score of {bestScorePercent}% with {bestScore.correctAnswers} correct answers of {bestScore.deckSize} in {bestScoreTime} at {bestScoreDate}.
            </Text>
          }
          {commons.isEmpty(worstScorePercent) === false &&
            <Text style={[styles.statsText, {color: COLORS.DARK_RED}]}>
              Worst score of {worstScorePercent}% with {worstScore.deckSize-worstScore.correctAnswers} incorrect answers of {worstScore.deckSize} in {worstScoreTime} at {worstScoreDate}.
            </Text>
          }
        </View>
        <View>
          <CustomButton
            style={[styles.button, {marginBottom: 10}]}
            onPress={() => this.handleAddCard()}>
            Add Card
          </CustomButton>
          <CustomButton
            style={[styles.button, {marginBottom: 25}]}
            disabled={ commons.isEmpty(cards) }
            onPress={() => this.handleStartQuiz()}>
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
function mapStateToProps({ decks, cards }, { navigation }) {
  let deck = null;
  let deckCards = null;
  let deckId = commons.getNavigationParam(navigation, 'deckId');
  if (!commons.isEmpty(deckId)) {
    deck = decks[deckId];
    deckCards = Object.values(cards).filter(card => card.deck === deckId);
  }
  return {
    deck,
    cards: deckCards,
    navigation,
  };
}

export default withNavigation(connect(mapStateToProps)(DeckDetail));

const styles = StyleSheet.create({
  detail: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: 200,
    fontSize: 16,
    fontWeight: 'bold',
  },
  fieldsText: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.GRAY
  },
  statsText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});