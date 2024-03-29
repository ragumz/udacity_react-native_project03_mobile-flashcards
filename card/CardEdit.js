import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { View, Text, TextInput, Slider, StyleSheet, ActivityIndicator } from 'react-native';
import * as commons from '../utils/commons';
import * as constants from '../utils/constants';
import CustomButton from '../common/CustomButton';
import { handleAddNewCard, handleUpdateCard } from '../card/cardOperations';
import { hideMessage } from '../common/sharedActions';
import { showAlert } from '../common/sharedOperations';

/**
 * @description React component to create a new or edit an existing Card.
 */
class CardEdit extends Component {

  /**
   * @description Update the app status bar title
   */
  static navigationOptions = ({ navigation }) => {
    const deckTitle = commons.getNavigationParam(navigation, 'deckTitle');
    const cardId = commons.getNavigationParam(navigation, 'cardId');
    return {
      title: `${commons.isNull(cardId) ? `Create Card : ${deckTitle} Deck` : `Edit Card : ${deckTitle} Deck`}`,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  /**
   * @description Initializes component states
   */
  state = {
    /** @description Edited/Viewed Card object */
    editCard: Object.assign({}, constants.EMTPY_CARD),
    fieldValidation: {},
  };

  /**
   * @description Discover if the Card is being created or edited
   */
  isCreateMode = () => {
    return commons.isEmpty(this.props.card.id);
  };

  /**
   * @description Component handle function to update an editing Card field value with input events from user
   */
  handleChangeValue = (value, field) => {
    this.setState(currState => {
      currState.editCard[field] = value;
      return currState;
    });
  };

  /**
   * @description Validate the required input fields' values
   */
  checkInputValues = () => {
    const { editCard } = this.state;
    let isValid = true;
    if (commons.isEmpty(editCard.question)) {
      this.setState(currState => { currState.fieldValidation['question'] = 'Question is required.'; return currState });
      isValid = false;
    } else {
      this.setState(currState => { currState.fieldValidation['question'] = ''; return currState });
    }
    if (commons.isEmpty(editCard.answer)) {
      this.setState(currState => { currState.fieldValidation['answer'] = 'Answer is required.'; return currState });
      isValid = false;
    } else {
      this.setState(currState => { currState.fieldValidation['answer'] = ''; return currState });
    }
    return isValid;
  };

  /**
   * @description Generate a random Card unique identifier
   */
  generateNewId = () => {
    const { cards } = this.props;
    let newId;
    do {
      newId = commons.generateUID();
    } while (!commons.isNull(cards[newId]));
    this.setState(currState => { currState.editCard['id'] = newId; return currState });
    return true;
  };

  /**
   * @description Component handle function to manage Card creation or update actions
   */
  handleSubmit = (event, isCreate) => {
    event.preventDefault();
    if (isCreate) {
      if (this.checkInputValues()) {
        this.generateNewId();
        this.handleClickCreateCard();
      }
    } else if (this.checkInputValues()) {
      this.handleClickUpdateCard();
    }
  };

  /**
   * @description Component handle function to create a new Card through reducer actions
   */
  handleClickCreateCard = () => {
    const { deck, dispatch } = this.props;
    this.setState(currState => {
      currState.editCard['deck'] = deck.id;
      currState.editCard['created'] = new Date();
      currState.editCard[constants.ENTITY_COMMON_FIELDS.quizStatistics] = Object.assign({}, constants.EMPTY_CARD_QUIZ_STATS);
      currState.editCard[constants.ENTITY_COMMON_FIELDS.bestScore] = Object.assign({}, constants.EMPTY_CARD_SCORE);
      currState.editCard[constants.ENTITY_COMMON_FIELDS.worstScore] = Object.assign({}, constants.EMPTY_CARD_SCORE);
      return currState;
    }, () => {
      const { editCard } = this.state;
      dispatch(handleAddNewCard(constants.OWNER_VIEWS.CARD_EDIT, editCard))
        .then(() =>
          this.handleFinishedEdit()
        );
    });
  };

  /**
   * @description Component handle function to update an existing Card through reducer actions
   */
  handleClickUpdateCard = () => {
    const { editCard } = this.state;
    const { dispatch } = this.props;
    dispatch(handleUpdateCard(constants.OWNER_VIEWS.CARD_EDIT, editCard))
      .then(() =>
        this.handleFinishedEdit()
      );
  };

  /**
   * @description Component handle function when user end a Card edition, saving it or not.
   */
  handleFinishedEdit = () => {
    if (this.isCreateMode()) {
      //start a new Card after created
      this.setState({ editCard: Object.assign({}, constants.EMTPY_CARD) });
    }
  };

  /**
   * @description Lifecycle function to initialize component inner state controls
   */
  componentDidMount() {
    let { editCard } = this.state;
    const { card } = this.props;
    if (!commons.isNull(card.id)) {
      //edit existing Card
      editCard = Object.assign({}, card);
    }
    this.setState({ editCard });
  }

  render() {
    const { deck, loading, userMessage, dispatch } = this.props;
    if (commons.isNull(deck)) {
      //show warning alert modal dialog
      showAlert(commons.getUserMessage('WARNING', 'No deck was selected to create or edit cards.', null,
                [{ text: 'OK', onPress: () => navigation.goBack() }]));
      return <View></View>;
    }

    if (commons.canShowLoading(constants.OWNER_VIEWS.CARD_EDIT, loading)) {
      //show loading ui if directed to this component
      return <View style={styles.loading}>
              <ActivityIndicator size='large' color={constants.COLORS.BLUE} />
            </View>;
    }
    if (commons.canShowAlert(constants.OWNER_VIEWS.CARD_EDIT, userMessage)) {
      //show alert dialog if directed to this component
      showAlert(
        Object.assign({}, userMessage, {
          buttons: [{ text: 'OK', onPress: () => dispatch(hideMessage(constants.OWNER_VIEWS.CARD_EDIT)) }]
        })
      );
    }
    const { editCard, fieldValidation } = this.state;
    const { question, answer, difficulty } = editCard;
    const isCreate = this.isCreateMode();
    return (
      <View style={styles.main}>
        <View style={[styles.main, {alignItems: 'flex-start'}]}>
          <TextInput
            style={styles.input}
            id="question"
            placeholder="Card Question"
            value={question}
            maxLength={2048}
            multiline={true}
            numberOfLines={4}
            scrollEnabled={true}
            underlineColorAndroid={constants.COLORS.BLACK}
            onChangeText={text => this.handleChangeValue(text, 'question')}
          />
          {!commons.isEmpty(fieldValidation.question) && (
            <Text style={{ color: "red" }}>{fieldValidation.question}</Text>
          )}
          <TextInput
            style={styles.input}
            id="answer"
            placeholder="Card Answer"
            value={answer}
            maxLength={2048}
            multiline={true}
            numberOfLines={4}
            scrollEnabled={true}
            underlineColorAndroid={constants.COLORS.BLACK}
            onChangeText={text => this.handleChangeValue(text, 'answer')}
          />
          {!commons.isEmpty(fieldValidation.answer) && (
            <Text style={{ color: "red" }}>{fieldValidation.answer}</Text>
          )}
          <View style={{marginTop: 20}}>
            <Text style={styles.label}>
              Difficulty Level (0-10): {difficulty}
            </Text>
            <Slider
              style={[styles.input, {height: 50}]}
              id="difficulty"
              step={1}
              value={difficulty}
              minimumValue={0}
              maximumValue={10}
              onValueChange={value => this.handleChangeValue(value, 'difficulty')}
            />
          </View>
        </View>
        <View style={styles.main}>
          <CustomButton style={styles.button} onPress={(event) => this.handleSubmit(event, isCreate)}>
            {isCreate ? 'Create' : 'Save'}
          </CustomButton>
          {!isCreate &&
            (<CustomButton style={styles.button}>
              Delete
            </CustomButton>)
          }
        </View>
      </View>
    );
  }
}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps({ decks, cards, shared }, { navigation }) {
  let card = null;
  let cardId = commons.getNavigationParam(navigation, 'cardId');
  if (!commons.isEmpty(cardId)) {
    card = cards[cardId];
  } else {
    card = constants.EMTPY_CARD;
  }
  let deck = null;
  let deckId = commons.getNavigationParam(navigation, 'deckId');
  if (!commons.isEmpty(deckId)) {
    deck = decks[deckId];
  }
  return {
    card,
    cards,
    deck,
    navigation,
    //global redux user message
    userMessage: shared.userMessage,
    //global loading state
    loading: shared.loading
  };
}

export default withNavigation(connect(mapStateToProps)(CardEdit));

/**
 * @description Component Flexbox styles definitions
 */
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    width: 300,
    height: 100,
    padding: 5,
    fontSize: 18,
  },
  label: {
    paddingLeft: 5,
    fontSize: 14,
  },
  button: {
    width: 150,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10
  }
});