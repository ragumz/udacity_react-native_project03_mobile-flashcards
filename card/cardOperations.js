import { showMessage, showLoading, hideLoading } from '../common/sharedActions';
import { submitCard, submitMultiCards } from '../utils/api';
import { addNewCard, updateCard, updateMultiCards } from './cardActions'

/**
 * @description Add a new Card into the storage.
 */
export function handleAddNewCard(ownerViewId, card) {
  return dispatch => {
    dispatch(showLoading(ownerViewId));
    return submitCard(card)
            .then(() => dispatch(addNewCard(card)))
            .then(() => dispatch(showMessage(ownerViewId, 'INFORMATION', 'Card was succesfully created.'))
    ).catch(error =>
        dispatch(showMessage(ownerViewId, 'ERROR', 'Failed to save Card.', error))
    ).finally(() =>
      dispatch(hideLoading(ownerViewId))
    );
  };
}

/**
 * @description Update a Card into the storage.
 */
export function handleUpdateCard(ownerViewId, card, showMessage=true) {
  return dispatch => {
    dispatch(showLoading(ownerViewId));
    var promiseChain = Promise.resolve();
    promiseChain = promiseChain.then(submitCard(card));
    promiseChain = promiseChain.then(() => dispatch(updateCard(card)));
    if (showMessage === true) {
      promiseChain = promiseChain.then(() => dispatch(showMessage(ownerViewId, 'INFORMATION', 'Card was succesfully saved.')));
    }
    promiseChain = promiseChain.catch(error =>
        { if (showMessage === true) dispatch(showMessage(ownerViewId, 'ERROR', 'Failed to save Card.', error)) }
    ).finally(() =>
      dispatch(hideLoading(ownerViewId))
    );
    return promiseChain;
  };
}

/**
 * @description Update a collection of Cards objects indexed by their IDs into the storage.
 */
export function handleUpdateMultiCards(ownerViewId, cards) {
  return dispatch => {
    dispatch(showLoading(ownerViewId));
    return submitMultiCards(cards)
            .then(() => dispatch(updateMultiCards(cards))
    ).catch(error =>
        dispatch(showMessage(ownerViewId, 'ERROR', 'Failed to save multipe Cards.', error))
    ).finally(() =>
      dispatch(hideLoading(ownerViewId))
    );
  };
}