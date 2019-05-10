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
 * @param {string} ownerViewId Current viewing owner name/id owning the message
 * @param {string} title Dialog window title
 * @param {string} message Message text
 * @param {Object} error Option error content, as text or JS Error instance
 */
export function showMessage(ownerViewId, title='INFORMATION', message='', error) {
  return {
    type: SHARED_ACTIONS.SHOW_MESSAGE,
    ownerViewId,
    title,
    message,
    error,
  };
}

/**
 * @description Global common reducer action to clear a global MessageDialog component
 *      and hide messages the inner dialog window from the user.
 *
 * @param {string} ownerViewId Current viewing owner name/id owning the message
 */
export function hideMessage(ownerViewId) {
  return {
    type: SHARED_ACTIONS.HIDE_MESSAGE,
    ownerViewId
  };
}

/**
 * @description Global common reducer action to show user loading view
 *
 * @param {string} ownerViewId Current viewing owner name/id owning the loading cursor
 */
export function showLoading(ownerViewId) {
  return {
    type: SHARED_ACTIONS.SHOW_LOADING,
    ownerViewId
  };
}

/**
 * @description Global common reducer action to hide user loading view
 *
 * @param {string} ownerViewId Current viewing owner name/id owning the loading cursor
 */
export function hideLoading(ownerViewId) {
  return {
    type: SHARED_ACTIONS.HIDE_LOADING,
    ownerViewId
  };
}
