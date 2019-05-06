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
    dispatch(showLoading())
      .then(() => {
        return getDecks().then(decks => {
          dispatch(receiveDecks(decks)).then(() => {
            return getQuestions()
              .then(questions => dispatch(receiveQuestions(questions)))
              .then(dispatch(hideLoading()));
          });
        });
      })
      .catch(error => {
        dispatch(hideLoading());
        dispatch(
          showMessage('ERROR', 'Failed to load data from storage.', error)
        );
      });
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
  }
  // Works on both iOS and Android
  Alert.alert(
    title,
    `${message} ${errorMessage}`,
    buttons,
    { cancelable: false }
  );
}
