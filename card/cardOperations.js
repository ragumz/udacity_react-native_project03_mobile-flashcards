import { showMessage, showLoading, hideLoading } from '../common/sharedActions';
import { submitCard } from '../utils/api';
import { addNewCard, updateCard } from './cardActions'

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
export function handleUpdateCard(ownerViewId, card) {
  return dispatch => {
    dispatch(showLoading(ownerViewId));
    return submitCard(card)
            .then(() => dispatch(updateCard(card)))
            .then(() => dispatch(showMessage(ownerViewId, 'INFORMATION', 'Card was succesfully saved.'))
    ).catch(error =>
        dispatch(showMessage(ownerViewId, 'ERROR', 'Failed to save Card.', error))
    ).finally(() =>
      dispatch(hideLoading(ownerViewId))
    );
  };
}