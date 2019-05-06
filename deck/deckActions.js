/**
 * @description Freezed object with constant strings
 *              representing Deck's reducer's actions enumeration.
 */
export const DECK_ACTIONS = Object.freeze({
  RECEIVE: 'RECEIVE_DECKS',
  CREATE: 'CREATE_DECK',
  DELETE: 'DELETE_DECK',
  UPDATE: 'UPDATE_DECK',
});

/**
 * @description Deck reducer action to receive an array of Deck objects
 * @param {Array} decks Array containing Deck objects fetched from AsyncStorage
 */
export function receiveDecks(decks) {
  return {
    type: DECK_ACTIONS.RECEIVE,
    decks
  };
}

/**
 * @description Deck reducer action to create a new Deck object
 * @param {Object} deck Complete Deck object
 */
export function addNewDeck(deck) {
  return {
    type: DECK_ACTIONS.CREATE,
    deck
  }
}

/**
 * @description Deck reducer action to delete an existing Deck object
 * @param {String} deckId Deck unique identification key
 */
export function deleteDeck(deckId) {
  return {
    type: DECK_ACTIONS.DELETE,
    deckId
  }
}

/**
 * @description Deck reducer action to update a Deck object fields
 * @param {Object} deck Complete Deck object
 */
export function updateDeck(deck) {
  return {
    type: DECK_ACTIONS.UPDATE,
    deck
  }
}