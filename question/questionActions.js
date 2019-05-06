/**
 * @description Freezed object with constant strings
 *              representing Question's reducer's actions enumeration.
 */
export const QUESTION_ACTIONS = Object.freeze({
  RECEIVE: 'RECEIVE_QUESTIONS',
  CREATE: 'CREATE_QUESTION',
  DELETE: 'DELETE_QUESTION',
  UPDATE: 'UPDATE_QUESTION',
});

/**
 * @description Question reducer action to receive an array of Question objects
 * @param {Array} decks Array containing Question objects fetched from AsyncStorage
 */
export function receiveQuestions(questions) {
  return {
    type: QUESTION_ACTIONS.RECEIVE,
    questions
  };
}

/**
 * @description Question reducer action to create a new Question object
 * @param {Object} question Complete Question object
 */
export function addNewQuestion(question) {
  return {
    type: QUESTION_ACTIONS.CREATE,
    deck: question
  }
}

/**
 * @description Question reducer action to delete an existing Question object
 * @param {String} questionId Question unique identification key
 */
export function deleteQuestion(questionId) {
  return {
    type: QUESTION_ACTIONS.DELETE,
    questionId
  }
}

/**
 * @description Question reducer action to update a Question object fields
 * @param {Object} question Complete Question object
 */
export function updateQuestion(question) {
  return {
    type: QUESTION_ACTIONS.UPDATE,
    question
  }
}