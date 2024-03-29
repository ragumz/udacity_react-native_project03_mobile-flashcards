import { combineReducers } from 'redux';
import decks from '../deck/deckReducers';
import cards from '../card/cardReducers';
import shared from '../common/sharedReducers';

/**
 * @description All app global state management reducers combined
 */
export default combineReducers({
  decks,
  cards,
  shared
});
