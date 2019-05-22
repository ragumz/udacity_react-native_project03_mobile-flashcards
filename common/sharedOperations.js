import { Alert } from 'react-native';
import { receiveDecks } from '../deck/deckActions';
import { receiveCards } from '../card/cardActions';
import { showMessage, showLoading, hideLoading } from './sharedActions';
import { getDecks, getCards } from '../utils/api';
import * as commons from '../utils/commons';

/**
 * @description Global function to load all known objects of Cards and Decks from the AsyncStorage.
 */
export function handleInitialData(ownerViewId) {
  return dispatch => {
    dispatch(showLoading(ownerViewId));
    return getDecks()
            .then(decks => dispatch(receiveDecks(decks))
    ).then(() => {
        return getCards()
                .then(cards => dispatch(receiveCards(cards)))
    }).catch(error =>
        dispatch(showMessage(ownerViewId, 'ERROR', 'Failed to load data from storage.', error))
    ).finally(() =>
      dispatch(hideLoading(ownerViewId))
    );
  };
}

/**
 * Show an alert modal dialog with message to the user at the current component.
 *
 * @param {Object} userMessage An object containing title, message, error and buttons fields.
 */
export function showAlert({title='INFORMATION', message, error='', buttons=[]}) {
  // Should work on both OSs: iOS and Android.
  Alert.alert(
    title,
    commons.joinMessageText(message, error),
    buttons,
    { cancelable: false }
  );
}
