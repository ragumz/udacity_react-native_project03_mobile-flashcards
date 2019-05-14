import { CARD_ACTIONS } from './cardActions';
import { DECK_ACTIONS } from '../deck/deckActions'
import { arrayToIndexedObject } from '../utils/commons';

/**
 * @description Card's reducer implementation to manage all Card thunk actions.
 * @param {Object} state Current reducer state object
 * @param {Object} action Current reducer thunk action object
 */
export default function cards(state = {}, action) {
  switch (action.type) {
    //add all backend server loaded Cards into state
    case CARD_ACTIONS.RECEIVE:
      return {
        ...state,
        ...action.cards
      };

    //add a new Card object into state
    case CARD_ACTIONS.CREATE:
      return {
        ...state,
        [action.card.id]: {
          ...action.card
        }
      };

    //update an existing Card object into state
    case CARD_ACTIONS.UPDATE:
      return {
        ...state,
        [action.card.id]: {
          ...action.card
        }
      };

    //update an existing collection of Card object into state
    case CARD_ACTIONS.MULTI_UPDATE:
      return {
        ...state,
        ...action.cards
      };

    //delete an existing Card object from state through delete flag field
    case CARD_ACTIONS.DELETE:
      return arrayToIndexedObject(Object.values(state).filter(card => card.id !== action.cardId));

    //delete Cards from a deleted Deck
    case DECK_ACTIONS.DELETE:
      return arrayToIndexedObject(
        Object.values(state).filter(
          card => card.deck !== action.deckId
        )
      );

    default:
      return state;
  }
}
