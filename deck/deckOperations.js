import { showMessage, showLoading, hideLoading } from '../common/sharedActions';
import { submitDeck, removeDeck } from '../utils/api';
import { addNewDeck, updateDeck, deleteDeck } from './deckActions';

/**
 * @description Add a new Deck into the storage.
 */
export function handleAddNewDeck(ownerViewId, deck) {
  return dispatch => {
    dispatch(showLoading(ownerViewId));
    return submitDeck(deck)
            .then(() => dispatch(addNewDeck(deck)))
            .then(() => dispatch(showMessage(ownerViewId, 'INFORMATION', 'Deck was succesfully created.'))
    ).catch(error =>
        dispatch(showMessage(ownerViewId, 'ERROR', 'Failed to save Deck.', error))
    ).finally(() =>
      dispatch(hideLoading(ownerViewId))
    );
  };
}

/**
 * @description Update a Deck into the storage.
 */
export function handleUpdateDeck(ownerViewId, deck, showMessage=true) {
  return dispatch => {
    dispatch(showLoading(ownerViewId));
    var promiseChain = Promise.resolve();
    promiseChain = promiseChain.then(submitDeck(deck));
    promiseChain = promiseChain.then(() => dispatch(updateDeck(deck)));
    if (showMessage === true) {
      promiseChain = promiseChain.then(() => dispatch(showMessage(ownerViewId, 'INFORMATION', 'Deck was succesfully saved.')));
    }
    promiseChain = promiseChain.catch(error =>
        dispatch(showMessage(ownerViewId, 'ERROR', 'Failed to save Deck.', error))
    ).finally(() =>
      dispatch(hideLoading(ownerViewId))
    );
    return promiseChain;
  };
}

/**
 * @description Delete a Deck from storage.
 */
export function handleDeleteDeck(ownerViewId, deckId) {
  return dispatch => {
    dispatch(showLoading(ownerViewId));
    return removeDeck(deckId)
            .then(() => dispatch(deleteDeck(deckId))
    ).catch(error =>
        dispatch(showMessage(ownerViewId, 'ERROR', 'Failed to delete Deck.', error))
    ).finally(() =>
      dispatch(hideLoading(ownerViewId))
    );
  };
}