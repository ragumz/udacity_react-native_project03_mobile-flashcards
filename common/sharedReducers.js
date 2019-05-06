import { SHARED_ACTIONS } from './sharedActions';

/**
 * @description Post's reducer implementation to manage global Common thunk actions.
 * @param {Object} state Current reducer state object
 * @param {Object} action Current reducer thunk action object
 */
export default function common(state = {}, action) {
  switch (action.type) {
    //set an user message to open a dialog window
    case SHARED_ACTIONS.SHOW_MESSAGE:
      return {
        ...state,
        userMessage: { title: action.title, message: action.message, error: action.error }
      };

    //clear an user message and close a dialog window
    case SHARED_ACTIONS.HIDE_MESSAGE:
      return {
        ...state,
        userMessage: null
      };

    //set loading show view flag
    case SHARED_ACTIONS.SHOW_LOADING:
      return {
        ...state,
        loading: true
      };

    //set loading hide view flag
    case SHARED_ACTIONS.HIDE_LOADING:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}