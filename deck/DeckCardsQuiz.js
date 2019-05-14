import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { AppLoading } from 'expo';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import * as commons from '../utils/commons';
import * as constants from '../utils/constants';
import CardQuiz from '../card/CardQuiz';
import CustomButton from '../common/CustomButton';
import { showAlert } from '../common/sharedOperations';
import { handleUpdateMultiCards } from '../card/cardOperations';
import { handleUpdateDeck } from './deckOperations';

/**
 * @description React component to start a Deck's Card Quiz.
 */
class DeckCardsQuiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const deckTitle = commons.getNavigationParam(navigation, 'deckTitle');
    return {
      title: `Quiz : Deck ${deckTitle}`,
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    };
  };

  /**
   * @description Initializes component states
   */
  state = {
    startTime: null,
    endTime: null,
    isFinished: false,
    currentCardIndex: 0,
    cardsAnswer: [],
    isShowingAlert: false,
  };

  handleDeviceBackPress = () => {
    const { navigation } = this.props;
    const { isFinished } = this.state;
    if (isFinished === false) {
      showAlert(commons.getUserMessage('QUESTION', 'Do you really want to interrupt the current quiz?  It will not be included on its deck statistics.', null,
                                      [{text: 'NO'}, {text: 'YES', onPress: () => navigation.goBack()}]));
    }
    return true;
  }

  handleAnswer = (card, answer, startTime) => {
    const endTime = new Date();
    const { quizCards } = this.props;
    this.setState(currState => {
      currState.currentCardIndex += 1;
      if (currState.currentCardIndex === quizCards.length) {
        currState.isFinished = true;
        currState.endTime = endTime;
      }
      currState.cardsAnswer.push({ id: card.id, answer, startTime, endTime });
      return currState;
    }, () => {
      if (this.state.isFinished === true) {
        this.handleDeckAndCardsStatistics();
      }
    });
  }

  handleDeckAndCardsStatistics = () => {
    let card, correctCount=0;
    const { cardsAnswer, startTime, endTime } = this.state;
    const { deck, cards, quizCards, dispatch } = this.props;
    const cardsUpd = {};
    //calculate card global individual statistics
    cardsAnswer.map(ca => {
      card = cards[ca.id];
      const { quizStatistics, bestScore, worstScore } = card;
      if (ca.answer === constants.QUIZ_ANSWERS.CORRECT.value) {
        correctCount = correctCount + 1;
        quizStatistics.correct = quizStatistics.correct + 1;
      } else {
        quizStatistics.incorrect = quizStatistics.incorrect + 1;
      }
      quizStatistics.totalTimeMilis = quizStatistics.totalTimeMilis + commons.getDateMilisDifference(ca.startTime, ca.endTime);
      if (commons.isNull(bestScore.startTime)
          || ca.startTime < bestScore.startTime) {
        bestScore.startTime = ca.startTime;
        bestScore.endTime = ca.endTime;
      }
      if (commons.isNull(worstScore.startTime)
          || ca.startTime > worstScore.startTime) {
        worstScore.startTime = ca.startTime;
        worstScore.endTime = ca.endTime;
      }
      //TODO: acumular totalTime, atualizar best e worst
      cardsUpd[ca.id] = Object.assign({}, card, { quizStatistics, bestScore, worstScore });
    });
    //calculate deck global statistics
    const { quizStatistics, bestScore, worstScore } = deck;
    quizStatistics.timesCompleted = quizStatistics.timesCompleted + 1;
    quizStatistics.totalTimeMilis = quizStatistics.totalTimeMilis + commons.getDateMilisDifference(startTime, endTime);
    if (bestScore.correctAnswers < 0
        || correctCount >= bestScore.correctAnswers) {
      bestScore.correctAnswers = correctCount;
      bestScore.startTime = startTime;
      bestScore.endTime = endTime;
      bestScore.deckSize = quizCards.length;
    }
    if (worstScore.correctAnswers < 0
        || correctCount <= worstScore.correctAnswers) {
      worstScore.correctAnswers = correctCount;
      worstScore.startTime = startTime;
      worstScore.endTime = endTime;
      worstScore.deckSize = quizCards.length;
    }
    const deckUpd = Object.assign({}, deck, { quizStatistics, bestScore, worstScore });
    //update storage and redux state
    var promiseChain = Promise.resolve();
    promiseChain = promiseChain.then(() => dispatch(handleUpdateMultiCards(constants.OWNER_VIEWS.DECK_QUIZ, cardsUpd)));
    promiseChain = promiseChain.then(() => dispatch(handleUpdateDeck(constants.OWNER_VIEWS.DECK_QUIZ, deckUpd, false)));
  }

  handleRestartQuiz = () => {
    this.setState({
      startTime: new Date(),
      endTime: null,
      isFinished: false,
      currentCardIndex: 0,
      cardsAnswer: [],
      isShowingAlert: false,
    });
  };

  handleBackToDeck = () => {
    this.props.navigation.goBack();
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleDeviceBackPress);
    this.setState(currState => {
      currState.startTime = new Date();
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleDeviceBackPress);
  }

  render() {
    const { cards, quizCards, shared } = this.props;
    if (commons.canShowLoading(constants.OWNER_VIEWS.DECK_QUIZ, shared.loading)) {
      //show loading
      return <AppLoading />;
    }
    if (commons.canShowAlert(constants.OWNER_VIEWS.DECK_QUIZ, shared.userMessage)) {
      //show error/success alert modal dialog
      showAlert(
        Object.assign({}, shared.userMessage, {
          buttons: [{ text: 'OK', onPress: () => dispatch(hideMessage(constants.OWNER_VIEWS.DECK_QUIZ)) }]
        })
      );
    }
    const { isFinished, currentCardIndex, cardsAnswer } = this.state;
    const cardsCount = quizCards.length;
    let card = null;
    let correct=0, incorrect=0, percentCorrect=0, percentIncorrect=0;
    if (isFinished === false) {
      card = cards[quizCards[currentCardIndex].id];
    } else {
      cardsAnswer.forEach(card => {
        if (card.answer === constants.QUIZ_ANSWERS.CORRECT.value) {
          correct = correct + 1;
        } else {
          incorrect = incorrect + 1;
        }
      });
      percentCorrect = (correct/cardsCount)*100;
      percentCorrect = percentCorrect.toFixed(0);
      percentIncorrect = (incorrect/cardsCount)*100;
      percentIncorrect = percentIncorrect.toFixed(0);
    }
    return (
      <View style={styles.main}>
        <Text style={styles.answerCount}>
          {`${currentCardIndex < cardsCount ? currentCardIndex+1 : cardsCount}/${cardsCount}`}
        </Text>
        { !isFinished &&
          <CardQuiz card={card} handleAnswer={this.handleAnswer} />
        }
        { isFinished &&
        <View style={styles.panel}>
          <View style={styles.panel}>
            <Text style={{marginBottom: 5}}>You finished this quiz!</Text>
            { percentCorrect >= percentIncorrect &&
              <View style={styles.panel}>
                <Text>{percentCorrect}% of your answers were correct. Total of {correct} from {cardsCount}.</Text>
                <Text>{incorrect > 0 ? `You gave ${incorrect} incorrect answer${incorrect > 1 ? 's' : ''}.` : 'None incorrect answers.'}</Text>
              </View>
            }
            { percentCorrect < percentIncorrect &&
              <View style={styles.panel}>
                <Text>{percentIncorrect}% of your answers were incorrect. Total of {incorrect} from {cardsCount}.</Text>
                <Text>{correct > 0 ? `You gave ${correct} correct answer${correct > 1 ? 's' : ''}.` : 'None correct answers.'}</Text>
              </View>
            }
            <Text>{percentCorrect > 80 ? 'Congratulations! But don\'t get cocky, keep studying.' : 'Set aside time to study and practice more!'}</Text>
          </View>
          <View style={styles.panel}>
            <CustomButton
              style={ [styles.button, {backgroundColor: constants.COLORS.BLUE}] }
              onPress={() => this.handleRestartQuiz()}>
              Restart Quiz
            </CustomButton>
            <CustomButton
              style={ [styles.button] }
              onPress={() => this.handleBackToDeck()}>
              Back to Deck
            </CustomButton>
          </View>
        </View>
        }
      </View>
    );
  }
}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps({ decks, cards, shared }, { navigation }) {
  let deck = null;
  let quizCards = null;
  let deckId = commons.getNavigationParam(navigation, 'deckId');
  if (!commons.isEmpty(deckId)) {
    deck = decks[deckId];
    quizCards = Object.values(cards).filter(card => card.deck === deckId);
  }
  return {
    deck,
    cards,
    quizCards,
    shared,
    navigation
  };
}

export default withNavigation(connect(mapStateToProps)(DeckCardsQuiz));

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  panel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  answerCount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    width: 200,
    fontSize: 16,
    fontWeight: 'bold',
  },
});