import { QUESTION_ACTIONS } from './questionActions';
import { DECK_ACTIONS } from '../deck/deckActions'
import { arrayToIndexedObject } from '../utils/commons';

/**
 * @description Question's reducer implementation to manage all Question thunk actions.
 * @param {Object} state Current reducer state object
 * @param {Object} action Current reducer thunk action object
 */
export default function questions(state = {}, action) {
  switch (action.type) {
    //add all backend server loaded Questions into state
    case QUESTION_ACTIONS.RECEIVE:
      return {
        ...state,
        ...action.questions
      };

    //add a new Question object into state
    case QUESTION_ACTIONS.CREATE:
      return {
        ...state,
        [action.question.id]: {
          ...action.question
        }
      };

    //update an existing Question object into state
    case QUESTION_ACTIONS.UPDATE:
      return {
        ...state,
        [action.question.id]: {
          ...action.question
        }
      };

    //delete an existing Question object from state through delete flag field
    case QUESTION_ACTIONS.DELETE:
      return arrayToIndexedObject(Object.values(state).filter(question => question.id !== action.questionId));

    //delete Questions from a deleted Deck
    case DECK_ACTIONS.DELETE:
      return arrayToIndexedObject(
        Object.values(state).filter(
          question => question.deck !== action.deckId
        )
      );

    default:
      return state;
  }
}
