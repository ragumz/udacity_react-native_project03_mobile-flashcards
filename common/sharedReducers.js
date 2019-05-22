import { SHARED_ACTIONS } from './sharedActions';

/**
 * @description Shared reducer implementations to manage global shared thunk actions.
 *
 * @param {Object} state Current reducer state object
 * @param {Object} action Current reducer thunk action object
 */
export default function common(state = {}, action) {
  switch (action.type) {
    //set an user message to open a dialog window on an specific component
    case SHARED_ACTIONS.SHOW_MESSAGE:
      return {
        ...state,
        userMessage: { ownerViewId: action.ownerViewId, empty: false, title: action.title, message: action.message, error: action.error }
      };

    //clear an user message and close a dialog window on an specific component
    case SHARED_ACTIONS.HIDE_MESSAGE:
      return {
        ...state,
        userMessage: { ownerViewId: action.ownerViewId, empty: true }
      };

    //set loading indicator show view flag
    case SHARED_ACTIONS.SHOW_LOADING:
      return {
        ...state,
        loading: { ownerViewId: action.ownerViewId, active: true }
      };

    //set loading indicator hide view flag
    case SHARED_ACTIONS.HIDE_LOADING:
      return {
        ...state,
        loading: { ownerViewId: action.ownerViewId, active: false }
      };

    default:
      return state;
  }
}