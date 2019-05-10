import { Alert } from 'react-native';
import { receiveDecks } from '../deck/deckActions';
import { receiveQuestions } from '../question/questionActions';
import { showMessage, showLoading, hideLoading } from './sharedActions';
import { getDecks, getQuestions } from '../utils/api';
import * as commons from '../utils/commons';

/**
 * @description Global function to load all known objects of Questions and Decks from storage.
 *
 *
 */
export function handleInitialData(ownerViewId) {
  return dispatch => {
    dispatch(showLoading(ownerViewId));
    return getDecks()
            .then(decks => dispatch(receiveDecks(decks))
    ).then(() => {
        return getQuestions()
                .then(questions => dispatch(receiveQuestions(questions)))
    }).catch(error =>
        dispatch(showMessage(ownerViewId, 'ERROR', 'Failed to load data from storage.', error))
    ).finally(() =>
      dispatch(hideLoading(ownerViewId))
    );
  };
}

/**
 * Show an alert modal dialog with message to the user
 *
 * @param {Object} userMessage An object containing title, message, error and buttons fields
 */
export function showAlert({title='INFORMATION', message, error='', buttons=[]}) {
  // Works on both iOS and Android
  Alert.alert(
    title,
    commons.joinMessageText(message, error),
    buttons,
    { cancelable: false }
  );
}
