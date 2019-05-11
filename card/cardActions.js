/**
 * @description Freezed object with constant strings
 *              representing Card's reducer's actions enumeration.
 */
export const CARD_ACTIONS = Object.freeze({
  RECEIVE: 'RECEIVE_CARDS',
  CREATE: 'CREATE_CARD',
  DELETE: 'DELETE_CARD',
  UPDATE: 'UPDATE_CARD',
});

/**
 * @description Card reducer action to receive an array of Card objects
 * @param {Array} decks Array containing Card objects fetched from AsyncStorage
 */
export function receiveCards(cards) {
  return {
    type: CARD_ACTIONS.RECEIVE,
    cards
  };
}

/**
 * @description Card reducer action to create a new Card object
 * @param {Object} card Complete Card object
 */
export function addNewCard(card) {
  return {
    type: CARD_ACTIONS.CREATE,
    card: card
  }
}

/**
 * @description Card reducer action to delete an existing Card object
 * @param {String} cardId Card unique identification key
 */
export function deleteCard(cardId) {
  return {
    type: CARD_ACTIONS.DELETE,
    cardId
  }
}

/**
 * @description Card reducer action to update a Card object fields
 * @param {Object} card Complete Card object
 */
export function updateCard(card) {
  return {
    type: CARD_ACTIONS.UPDATE,
    card
  }
}