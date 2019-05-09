import { showMessage, showLoading, hideLoading } from '../common/sharedActions';
import { submitDeck } from '../utils/api';
import { addNewDeck, updateDeck } from './deckActions'

/**
 * @description Add a new Deck into the storage.
 */
export function handleAddNewDeck(deck) {
  return dispatch => {
    dispatch(showLoading());
    return submitDeck(deck)
            .then(() => dispatch(addNewDeck(deck)))
            .then(() => dispatch(showMessage('INFORMATION', 'Deck was succesfully created.'))
    ).catch(error =>
        dispatch(showMessage('ERROR', 'Failed to save Deck.', error))
    ).finally(() =>
      dispatch(hideLoading())
    );
  };
}

/**
 * @description Update a Deck into the storage.
 */
export function handleUpdateDeck(deck) {
  return dispatch => {
    dispatch(showLoading());
    return submitDeck(deck)
            .then(() => dispatch(updateDeck(deck)))
            .then(() => dispatch(showMessage('INFORMATION', 'Deck was succesfully saved.'))
    ).catch(error =>
        dispatch(showMessage('ERROR', 'Failed to save Deck.', error))
    ).finally(() =>
      dispatch(hideLoading())
    );
  };
}