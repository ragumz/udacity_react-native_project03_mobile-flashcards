import { showMessage, showLoading, hideLoading } from '../common/sharedActions';
import { submitDeck } from '../utils/api';
import { addNewDeck, updateDeck } from './deckActions'

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
export function handleUpdateDeck(ownerViewId, deck) {
  return dispatch => {
    dispatch(showLoading(ownerViewId));
    return submitDeck(deck)
            .then(() => dispatch(updateDeck(deck)))
            .then(() => dispatch(showMessage(ownerViewId, 'INFORMATION', 'Deck was succesfully saved.'))
    ).catch(error =>
        dispatch(showMessage(ownerViewId, 'ERROR', 'Failed to save Deck.', error))
    ).finally(() =>
      dispatch(hideLoading(ownerViewId))
    );
  };
}