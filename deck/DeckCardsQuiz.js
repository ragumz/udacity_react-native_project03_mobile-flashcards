import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet, BackHandler, ActivityIndicator } from 'react-native';
import * as commons from '../utils/commons';
import * as constants from '../utils/constants';
import CardQuiz from '../card/CardQuiz';
import CustomButton from '../common/CustomButton';
import { showAlert } from '../common/sharedOperations';
import { handleUpdateMultiCards } from '../card/cardOperations';
import { handleUpdateDeck } from './deckOperations';
//import { AntDesign } from '@expo/vector-icons';

/**
 * @description React component to start a Deck's Card Quiz.
 */
class DeckCardsQuiz extends Component {

  /**
   * @description Update the app status bar title
   */
  static navigationOptions = ({ navigation }) => {
    const deckTitle = commons.getNavigationParam(navigation, 'deckTitle');
    return {
      title: `Quiz : Deck ${deckTitle}`,
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      /*TODO: ask the user to confirm Quiz exit
      headerLeft: <AntDesign name='arrowleft' color={constants.COLORS.WHITE} size={34}
                      onPress={ () => { navigation.goBack() }} />,*/
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
    loading: false,
  };

  /**
   * @description Ask the user when exiting the Quiz without finishing it when OS back button pressed.
   */
  handleDeviceBackPress = () => {
    const { navigation } = this.props;
    const { isFinished } = this.state;
    if (isFinished === false) {
      showAlert(commons.getUserMessage('QUESTION', 'Do you really want to interrupt the current quiz?  It will not be included on its deck statistics.', null,
                                      [{text: 'NO'}, {text: 'YES', onPress: () => navigation.goBack()}]));
    }
    return true;
  }

  /**
   * @description Compute a Card Quiz answer by the user
   */
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

  /**
   * @description Compute all Cards Quiz answers and generate global Deck and Cards statistics
   */
  handleDeckAndCardsStatistics = () => {
    let card, correctCount=0;
    const { cardsAnswer, startTime, endTime } = this.state;
    const { deck, cards, quizCards, dispatch } = this.props;
    const cardsUpd = {};
    this.setState({ loading: true });
    //calculate each card global statistics
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
      cardsUpd[ca.id] = Object.assign({}, card, { quizStatistics, bestScore, worstScore });
    });
    //calculate the current deck global statistics
    const { quizStatistics, bestScore, worstScore } = deck;
    quizStatistics.timesCompleted = quizStatistics.timesCompleted + 1;
    quizStatistics.totalTimeMilis = quizStatistics.totalTimeMilis + commons.getDateMilisDifference(startTime, endTime);
    const deckSize = quizCards.length;
    if (bestScore.correctAnswers < 0
        || correctCount >= bestScore.correctAnswers
        || deckSize > bestScore.deckSize) {
      bestScore.correctAnswers = correctCount;
      bestScore.startTime = startTime;
      bestScore.endTime = endTime;
      bestScore.deckSize = deckSize;
    }
    if (worstScore.correctAnswers < 0
        || correctCount <= worstScore.correctAnswers
        || deckSize > worstScore.deckSize) {
      worstScore.correctAnswers = correctCount;
      worstScore.startTime = startTime;
      worstScore.endTime = endTime;
      worstScore.deckSize = deckSize;
    }
    const deckUpd = Object.assign({}, deck, { quizStatistics, bestScore, worstScore });
    //update storage and redux state with the Deck and Cards statistics
    var promiseChain = Promise.resolve();
    promiseChain = promiseChain.then(() => dispatch(handleUpdateMultiCards(constants.OWNER_VIEWS.DECK_QUIZ, cardsUpd)));
    promiseChain = promiseChain.then(() => dispatch(handleUpdateDeck(constants.OWNER_VIEWS.DECK_QUIZ, deckUpd, false)));
    promiseChain.then(() => this.setState({ loading: false }))
  }

  /**
   * @description Reset component states to reset the Quiz
   */
  handleRestartQuiz = () => {
    this.setState({
      startTime: new Date(),
      endTime: null,
      isFinished: false,
      currentCardIndex: 0,
      cardsAnswer: [],
      loading: false,
    });
  };

  /**
   * @description Action to go back to previous screen
   */
  handleBackToDeck = () => {
    this.props.navigation.goBack();
  }

  /**
   * @description Lifecycle function run before mounting the component
   */
  componentWillMount() {
    /*TODO: this.props.navigation.setParams({
      onBackPress: this.handleDeviceBackPress,
    });*/
  }

  /**
   * @description Lifecycle function run after the component is mounted
   */
  componentDidMount() {
    //add one OS back button press action
    BackHandler.addEventListener('hardwareBackPress', this.handleDeviceBackPress);
    this.setState({ startTime: new Date() });
  }

  /**
   * @description Lifecycle function run before unmounting the component
   */
  componentWillUnmount() {
    //remove the OS back button press action
    BackHandler.removeEventListener('hardwareBackPress', this.handleDeviceBackPress);
  }

  render() {
    const { cards, quizCards, shared } = this.props;
    if (this.state.loading === true
        || commons.canShowLoading(constants.OWNER_VIEWS.DECK_QUIZ, shared.loading)) {
      //show loading ui if directed to this component
      return <View style={styles.loading}>
              <ActivityIndicator size='large' color={constants.COLORS.BLUE} />
            </View>;
    }
    if (commons.canShowAlert(constants.OWNER_VIEWS.DECK_QUIZ, shared.userMessage)) {
      //show alert dialog if directed to this component
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
      //compute local statistic summary when quiz is finished
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
        <View style={styles.subpanel}>
          <View style={styles.subpanel}>
            <Text style={[styles.resultText, {marginTop: 15, marginBottom: 15, color: constants.COLORS.BLUE}]}>
              You finished this Quiz!
            </Text>
            <Text style={[styles.resultText, {marginBottom: 15, color: constants.COLORS.ORANGE}]}>
              {percentCorrect > 80 ? 'Congratulations! But don\'t get cocky, keep studying.' : 'Set aside time to study and practice more! Keep an eye on the app notifications.'}
            </Text>
            { percentCorrect >= percentIncorrect &&
              <View style={[styles.panel, {marginBottom: 25}]}>
                <Text style={styles.quizText}>
                  {percentCorrect}% of your answers were correct.
                </Text>
                <Text style={styles.quizText}>
                  Total of {correct} from {cardsCount}.
                </Text>
                <Text style={styles.quizText}>
                  {incorrect > 0 ? `You gave ${incorrect} incorrect answer${incorrect > 1 ? 's' : ''}.` : 'No incorrect answers.'}
                </Text>
              </View>
            }
            { percentCorrect < percentIncorrect &&
              <View style={[styles.panel, {marginBottom: 25}]}>
                <Text style={styles.quizText}>
                  {percentIncorrect}% of your answers were incorrect.
                </Text>
                <Text style={styles.quizText}>
                  Total of {incorrect} from {cardsCount}.
                </Text>
                <Text style={styles.quizText}>
                  {correct > 0 ? `You gave ${correct} correct answer${correct > 1 ? 's' : ''}.` : 'No correct answers.'}
                  </Text>
              </View>
            }
          </View>
          <View style={styles.panel}>
            <CustomButton
              style={ [styles.button, {marginBottom: 10}] }
              onPress={() => this.handleRestartQuiz()}>
              Restart Quiz
            </CustomButton>
            <CustomButton
              style={ [styles.button, {marginBottom: 20}] }
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
    navigation,
  };
}

export default withNavigation(connect(mapStateToProps)(DeckCardsQuiz));

/**
 * @description Component Flexbox styles definitions
 */
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  panel: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  subpanel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  answerCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    width: 200,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  quizText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10
  },
});