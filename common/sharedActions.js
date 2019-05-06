/**
 * @description Freezed object with constant strings
 *              representing Common reducer's actions enumeration.
 */
export const SHARED_ACTIONS = Object.freeze({
  SHOW_LOADING: 'SHOW_LOADING',
  HIDE_LOADING: 'HIDE_LOADING',
  SHOW_MESSAGE: 'SHOW_MESSAGE',
  HIDE_MESSAGE: 'HIDE_MESSAGE'
});

/**
 * @description Global common reducer action to prepare a global MessageDialog component
 *      to show messages to the user on a inner dialog window.
 *
 * @param {string} title Dialog window title
 * @param {string} message Message text
 * @param {Object} error Option error content, as text or JS Error instance
 */
export function showMessage(title = 'INFORMATION', message, error) {
  return {
    type: SHARED_ACTIONS.SHOW_MESSAGE,
    title,
    message,
    error
  };
}

/**
 * @description Global common reducer action to clear a global MessageDialog component
 *      and hide messages the inner dialog window from the user.
 */
export function hideMessage() {
  return {
    type: SHARED_ACTIONS.HIDE_MESSAGE
  };
}

/**
 * @description Global common reducer action to show user loading view
 */
export function showLoading() {
  return {
    type: SHARED_ACTIONS.SHOW_LOADING
  };
}

/**
 * @description Global common reducer action to hide user loading view
 */
export function hideLoading() {
  return {
    type: SHARED_ACTIONS.HIDE_LOADING
  };
}
