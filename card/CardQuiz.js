import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { COLORS, QUIZ_ANSWERS } from '../utils/constants';
import CustomButton from '../common/CustomButton';

/**
 * @description React component to present a answerable item on the Card Quiz.
 */
class CardQuiz extends Component {

  /**
   * @description Initializes component states
   */
  state = {
    isQuestion: true,
    isAnswered: false,
    startTime: new Date(),
    rotation: new Animated.Value(0),
  };

  /**
   * @description Run the animation defined on the state
   */
  runAnimation = () => {
    const { rotation } = this.state;
    //reset animation
    rotation.setValue(0);
    //setup animation
    return Animated.spring(rotation, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true
    });
  };

  /**
   * @description Identify whether to present the Question or the Answer
   */
  handleSwitchText = () => {
    this.runAnimation().start(() => {
      this.setState(currState => {
        currState.isQuestion = !currState.isQuestion;
        return currState;
      })
    });
  }

  /**
   * @description After user decision, run the answer function to compute statistics
   */
  handleAnswer = (answer) => {
    const { startTime } = this.state;
    const { card, handleAnswer } = this.props;
    this.setState( {isAnswered: true},
      () => handleAnswer(card, answer, startTime)
    );
  }

  /**
   * @description React lifecycle function to validate new properties values and update the state
   *
   * @param {Props} nextProps
   */
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
    const { isQuestion, isAnswered, rotation } = this.state;
    const { card } = this.props;
    const text = isQuestion ? card.question : card.answer;
    const switchText = isQuestion ? 'Tap to Answer' : 'Tap to Question';
    //setup spin card animation
    const rotate = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: [`0deg`, `360deg`]
    });
    return (
      <View
        style={styles.main}>
        <TouchableWithoutFeedback
          onPress={() => this.handleSwitchText()}>
          <Animated.View
            style={[styles.card, { transform: [{ rotateY: rotate }] }]}>
            <Text
              style={styles.showingText}>
              {text}
            </Text>
            <Text
              style={styles.switchButton}>
              {switchText}
            </Text>
            <Text style={styles.label}>
              (Difficulty Level: {card.difficulty} of 10)
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <View
          style={[styles.panel, {justifyContent: 'flex-end'}]}>
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

/**
 * @description Component Flexbox styles definitions
 */
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  panel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  showingText: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
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
    marginBottom: 10,
    backgroundColor: QUIZ_ANSWERS.INCORRECT.background,
    color: QUIZ_ANSWERS.INCORRECT.foreground,
  },
  card: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: COLORS.BLUE,
    borderRadius: 10,
    borderWidth: 2,
    margin: 10,
    padding: 10,
    width: '95%',
  },
});