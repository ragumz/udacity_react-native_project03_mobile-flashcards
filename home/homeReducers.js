import { combineReducers } from 'redux'
import decks from '../deck/deckReducers'
import questions from '../question/questionReducers'
import shared from '../common/sharedReducers'

/**
 * @description All reducers combined
 */
export default combineReducers({
  decks,
  questions,
  shared
})