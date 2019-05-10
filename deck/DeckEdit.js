import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { AppLoading } from 'expo';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import * as commons from '../utils/commons';
import * as constants from '../utils/constants';
import CustomButton from '../common/CustomButton';
import { handleAddNewDeck, handleUpdateDeck } from './deckOperations';
import { hideMessage } from '../common/sharedActions';
import { showAlert } from '../common/sharedOperations';

/**
 * @description React component to create a new or edit an existing Deck.
 */
class DeckEdit extends Component {
  static navigationOptions = ({ navigation }) => {
    let deckId = commons.getNavigationParam(navigation, 'deckId');
    return {
      title: `${commons.isNull(deckId) ? 'Create Deck' : `Edit Deck ${deckId}`}`,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  /**
   * @description Initializes component states
   */
  state = {
    /** @description Edited/Viewed Deck object */
    editDeck: Object.assign({}, constants.EMTPY_DECK),
    idFieldValidation: '',
    titleFieldValidation: '',
  };

  isCreateMode = () => {
    return commons.isEmpty(this.props.deck.id);
  };

  /**
   * @description Component handle function to update an editing Deck field value with input events from user
   */
  handleChangeValue = (event, name) => {
    const { text } = event.nativeEvent;
    this.setState(currState => {
      currState.editDeck[name] = text;
      return currState;
    });
  };

  checkInputValues = () => {
    const { editDeck } = this.state;
    let isValid = true;
    if (commons.isEmpty(editDeck.id)) {
      this.setState({idFieldValidation: 'Identifier is required.'});
      isValid = false;
    } else {
      this.setState({idFieldValidation: ''});
    }
    if (commons.isEmpty(editDeck.title)) {
      this.setState({titleFieldValidation: 'Title is required.'});
      isValid = false;
    } else {
      this.setState({titleFieldValidation: ''});
    }
    return isValid;
  };

  checkNotExistingId = () => {
    const { decks } = this.props;
    const { editDeck } = this.state;
    const newId = editDeck.id;
    if (!commons.isNull(decks[newId])) {
      this.setState({idFieldValidation: 'Identifier already exists.'});
      return false;
    }
    this.setState({idFieldValidation: ''});
    return true;
  };

  /**
   * @description Component handle function to manage Deck creation or update
   */
  handleSubmit = (event, isCreate) => {
    event.preventDefault();
    if (isCreate) {
      if (this.checkInputValues() && this.checkNotExistingId()) {
        this.handleClickCreateDeck();
      }
    } else if (this.checkInputValues()) {
      this.handleClickUpdateDeck();
    }
  };

  /**
   * @description Component handle function to create a new Deck through reducer actions
   */
  handleClickCreateDeck = () => {
    this.setState(currState => {
      currState.editDeck['created'] = new Date();
      return currState;
    }, () => {
      const { editDeck } = this.state;
      const { dispatch } = this.props;
      dispatch(handleAddNewDeck(constants.OWNER_VIEWS.DECK_EDIT, editDeck))
        .then(() =>
          this.handleFinishedEdit()
        );
    });
  };

  /**
   * @description Component handle function to update an existing Deck through reducer actions
   */
  handleClickUpdateDeck = () => {
    const { editDeck } = this.state;
    const { dispatch } = this.props;
    dispatch(handleUpdateDeck(constants.OWNER_VIEWS.DECK_EDIT, editDeck))
      .then(() =>
        this.handleFinishedEdit()
      );
  };

  /**
   * @description Component handle function when user end a Deck edition, saving it or not.
   */
  handleFinishedEdit = () => {
    if (this.isCreateMode()) {
      //start a new Deck after created
      this.setState({ editDeck: Object.assign({}, constants.EMTPY_DECK) });
    }
  };

  /**
   * @description Lifecycle function to initialize component inner state controls
   */
  componentDidMount() {
    let { editDeck } = this.state;
    const { deck } = this.props;
    if (!commons.isNull(deck.id)) {
      //edit existing Deck
      editDeck = Object.assign({}, deck);
    }
    this.setState({ editDeck });
  }

  /**
   * @description Lifecycle function to detect inner state controls changes from props changes
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.deck && this.props.deck
        && commons.isEmpty(this.props.deck.title)
        && !commons.isEmpty(nextProps.deck.title)
        && commons.isEmpty(this.props.navigation.state.params['deckTitle'])) {
      this.props.navigation.state.params['deckTitle'] = nextProps.deck.title;
    }
  }

  render() {
    const { loading, userMessage, dispatch } = this.props;
    if (commons.canShowLoading(constants.OWNER_VIEWS.DECK_EDIT, loading)) {
      //show loading
      return <AppLoading />;
    }
    if (commons.canShowAlert(constants.OWNER_VIEWS.DECK_EDIT, userMessage)) {
      //show error/success alert modal dialog
      showAlert(
        Object.assign({}, userMessage, {
          buttons: [{ text: 'OK', onPress: () => dispatch(hideMessage(constants.OWNER_VIEWS.DECK_EDIT)) }]
        })
      );
    }
    const { editDeck, idFieldValidation, titleFieldValidation } = this.state;
    const { id, title } = editDeck;
    const isCreate = this.isCreateMode();
    return (
      <View style={styles.main}>
        <View style={[styles.main, {alignItems: 'stretch', flexWrap: 'wrap'}]}>
          <TextInput
            style={styles.input}
            id="id"
            placeholder="Identifier"
            value={id}
            editable={isCreate}
            maxLength={50}
            underlineColorAndroid={constants.COLORS.BLACK}
            onChange={event => this.handleChangeValue(event, 'id')}
          />
          {!commons.isEmpty(idFieldValidation) && (
            <Text style={{ color: "red" }}>{idFieldValidation}</Text>
          )}
          <TextInput
            style={styles.input}
            id="title"
            placeholder="Title"
            value={title}
            autoFocus={!isCreate}
            maxLength={200}
            scrollEnabled={true}
            underlineColorAndroid={constants.COLORS.BLACK}
            onChange={event => this.handleChangeValue(event, 'title')}
          />
          {!commons.isEmpty(titleFieldValidation) && (
            <Text style={{ color: "red" }}>{titleFieldValidation}</Text>
          )}
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
function mapStateToProps({ decks, shared }, { navigation }) {
  let deck = null;
  let deckId = commons.getNavigationParam(navigation, 'deckId');
  if (!commons.isEmpty(deckId)) {
    deck = decks[deckId];
  } else {
    deck = constants.EMTPY_DECK;
  }
  return {
    deck,
    decks,
    navigation,
    //global redux user message
    userMessage: shared.userMessage,
    //global loading state
    loading: shared.loading
  };
}

export default withNavigation(connect(mapStateToProps)(DeckEdit));

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    padding: 5,
    height: 50,
    fontSize: 18,
  },
  button: {
    width: 150,
    fontSize: 16,
    fontWeight: 'bold',
  }
});