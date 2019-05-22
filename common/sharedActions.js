/**
 * @description Freezed object with constant strings
 *              representing shared reducer's actions enumeration.
 */
export const SHARED_ACTIONS = Object.freeze({
  SHOW_LOADING: 'SHOW_LOADING',
  HIDE_LOADING: 'HIDE_LOADING',
  SHOW_MESSAGE: 'SHOW_MESSAGE',
  HIDE_MESSAGE: 'HIDE_MESSAGE'
});

/**
 * @description Global shared reducer action to prepare a global Alert on each component
 *      to show messages to the user on a inner dialog window.
 *
 * @param {string} ownerViewId Current viewing owner name/id owning the message
 * @param {string} title Dialog window title
 * @param {string} message Message text
 * @param {Object} error Optional error content, as text or JS Error instance
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
 * @description Global shared reducer action to clear a global Alert on each component
 *      and hide messages on the inner dialog window from the user.
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
 * @description Global shared reducer action to show user loading view on each component.
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
 * @description Global shared reducer action to hide user loading view on each component.
 *
 * @param {string} ownerViewId Current viewing owner name/id owning the loading cursor
 */
export function hideLoading(ownerViewId) {
  return {
    type: SHARED_ACTIONS.HIDE_LOADING,
    ownerViewId
  };
}
