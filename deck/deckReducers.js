import { DECK_ACTIONS } from './deckActions';
import { arrayToIndexedObject } from '../utils/commons';

/**
 * @description Deck's reducer implementation to manage all Deck thunk actions.
 * @param {Object} state Current reducer state object
 * @param {Object} action Current reducer thunk action object
 */
export default function decks(state = {}, action) {
  switch (action.type) {
    //add all backend server loaded Decks into state
    case DECK_ACTIONS.RECEIVE:
      return {
        ...state,
        ...action.decks
      };

    //add a new Deck object into state
    case DECK_ACTIONS.CREATE:
      return {
        ...state,
        [action.deck.id]: {
          ...action.deck
        }
      };

    //update an existing Deck object into state
    case DECK_ACTIONS.UPDATE:
      return {
        ...state,
        [action.deck.id]: {
          ...action.deck
        }
      };

    //delete an existing Deck object from state through delete flag field
    case DECK_ACTIONS.DELETE:
      return arrayToIndexedObject(
        Object.values(state).filter(deck => deck.id !== action.deckId)
      );

    default:
      return state;
  }
}
