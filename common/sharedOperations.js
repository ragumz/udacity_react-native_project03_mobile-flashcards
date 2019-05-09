import { Alert } from 'react-native';
import { receiveDecks } from '../deck/deckActions';
import { receiveQuestions } from '../question/questionActions';
import { showMessage, showLoading, hideLoading } from './sharedActions';
import { getDecks, getQuestions } from '../utils/api';
import * as commons from '../utils/commons';

/**
 * @description Global function to load all known objects of Questions and Decks from storage.
 */
export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getDecks()
            .then(decks => dispatch(receiveDecks(decks))
    ).then(() => {
        return getQuestions()
                .then(questions => dispatch(receiveQuestions(questions)))
    }).catch(error =>
        dispatch(showMessage('ERROR', 'Failed to load data from storage.', error))
    ).finally(() =>
      dispatch(hideLoading())
    );
  };
}

/**
 * Show an alert modal dialog with message to the user
 *
 * @param {Object} userMessage An object containing title, message, error and buttons fields
 */
export function showAlert({title='INFORMATION', message, error='', buttons=[]}) {
  let errorMessage = '';
  if (!commons.isEmpty(error)) {
    errorMessage += '   [ERROR] ';
    if (error.hasOwnProperty('stack')) {
      errorMessage += error.stack;
    } else {
      errorMessage += error;
    }
    console.error(errorMessage);
  }
  // Works on both iOS and Android
  Alert.alert(
    title,
    `${message} ${errorMessage}`,
    buttons,
    { cancelable: false }
  );
}
