import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import * as commons from '../utils/commons';
import { COLORS, QUIZ_ANSWERS } from '../utils/constants';
import CustomButton from '../common/CustomButton';

class CardQuiz extends Component {

  /**
   * @description Initializes component states
   */
  state = {
    isQuestion: true,
    isAnswered: false,
    startTime: new Date(),
  };

  handleSwitchText = () => {
    this.setState(currState => {
      currState.isQuestion = !currState.isQuestion;
      return currState;
    })
  }

  handleAnswer = (answer) => {
    const { startTime } = this.state;
    const { card, handleAnswer } = this.props;
    this.setState( {isAnswered: true},
      () => handleAnswer(card, answer, startTime)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.card.id !== this.props.card.id) {
      this.setState({
        isQuestion: true,
        isAnswered: false,
        startTime: new Date(),
      })
    }
  }

  render() {
    const { isQuestion, isAnswered } = this.state;
    const { card } = this.props;
    const text = isQuestion ? card.question : card.answer;
    const switchText = isQuestion ? 'Answer' : 'Question';
    return (
      <View
        style={styles.main}>
        <View
          style={styles.panel}>
          <Text
            style={styles.showingText}>
            {text}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => this.handleSwitchText()}>
            <Text
              style={styles.switchButton}>
              {switchText}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={styles.panel}>
          <CustomButton
            style={ [styles.button, styles.correct] }
            disabled={isQuestion === true || isAnswered === true}
            onPress={() => this.handleAnswer(QUIZ_ANSWERS.CORRECT.value)}>
            {QUIZ_ANSWERS.CORRECT.title}
          </CustomButton>
          <CustomButton
            style={ [styles.button, styles.incorrect] }
            disabled={isQuestion === true || isAnswered === true}
            onPress={() => this.handleAnswer(QUIZ_ANSWERS.INCORRECT.value)}>
            {QUIZ_ANSWERS.INCORRECT.title}
          </CustomButton>
        </View>
      </View>
    )
  }
}

export default CardQuiz;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  panel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  showingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  switchButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.DARK_RED,
  },
  button: {
    width: 200,
    fontSize: 16,
    fontWeight: 'bold',
  },
  correct: {
    marginBottom: 10,
    backgroundColor: QUIZ_ANSWERS.CORRECT.background,
    color: QUIZ_ANSWERS.CORRECT.foreground,
  },
  incorrect: {
    backgroundColor: QUIZ_ANSWERS.INCORRECT.background,
    color: QUIZ_ANSWERS.INCORRECT.foreground,
  }
});