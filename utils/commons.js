/**
 * @description Check if an object is undefined or null.
 *
 * @param {any} obj Object to check
 * @return false if it is not null and not undefined
 */
export const isNull = obj => {
  return obj === undefined || obj === null || obj === 'undefined' || obj === 'null';
};

/**
 * @description Check if an object is undefined, or null or
 * empty, such as an String, or Array or even an Object keys.
 *
 * @param {any} obj Object to check
 * @return false if it is not null, undefined or empty.
 */
export const isEmpty = obj => {
  if (isNull(obj)) return true;
  if (typeof obj === 'string') {
    if (obj.length === 0) return true;
  } else if (Array.isArray(obj)) {
    if (Object.keys(obj).length === 0) return true;
  } else if (obj.hasOwnProperty('lenght')) return obj.lenght === 0;
  return false;
};

/**
 * @description Convert an array of objects into and Object itself indexed
 * by and object own field value.
 * @param {Array} arrObjects Array containing objects to convert into an Object
 * @param {string} fieldKey Default to 'id'. Name of the field which contains the Object key.
 */
export const arrayToIndexedObject = (arrObjects = [], fieldKey = 'id') => {
  return Array.from(arrObjects).reduce((result, item/*, index, array*/) => {
    result[item[fieldKey]] = item;
    return result;
  }, {});
};

/**
 * @description Reused Tyler's code to format date and time
 * from Chirper-app example
 *
 * @param {number} timestamp The seconds epoch value representing the date
 * @return A string with time and date
 */
export const formatDate = (timestamp) => {
  if (isEmpty(timestamp))
    return '';
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString('en-US');
  return `${d.toLocaleDateString('en-US')} ${time.substr(0, 5)}${time.slice(-2).toLowerCase()}`;
}

/**
 * @description Reused Tyler's code to generate a Unique Identification
 * from Chirper-app example.
 *
 * @return A string with time and date
 */
export const generateUID = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * @description Return and object that contains content to show on MessageDialog component, with
 * messages and buttons exclusively to delete a Post or a Comment.
 *
 * @return MessageDialog component init prop.
 */
export const createDeleteMessage = (entityName, handleDeleteYes, handleDeleteNo, toAppendText='') => {
  let userMessage = {title: "QUESTION", message: `Do you confirm to permanently delete this ${entityName}${toAppendText}? No recover is available.`};
  let messageButtons = [{ text: 'Yes', handleClick: handleDeleteYes },
                        { text: 'No',  handleClick: handleDeleteNo }];
  return { userMessage, messageButtons};
}

/**
 * Create a text with a message and optional error content
 * to show in an alert modal dialog to the user
 *
 * @param {Object} userMessage An object containing title, message, error and buttons fields
 */
export const joinMessageText = (message='', error='') => {
  let errorMessage = '';
  if (!isEmpty(error)) {
    errorMessage += '\n [ERROR] ';
    if (error.hasOwnProperty('stack')) {
      errorMessage += error.stack;
    } else {
      errorMessage += error;
    }
    console.error(errorMessage);
  }
  return `${message} ${errorMessage}`
}


/**
 * @description Extract an UserMessage object from arguments
 *
 * @param {String} title The alert dialog title
 * @param {String} message The message to show
 * @param {Object} error Optional. Error instance or String text
 * @param {Array} buttons Optional. Array containing objects such as [{text: [buttonTitle], onPress: [function]}]
 */
export const getUserMessage = (title='INFORMATION', message='', error, buttons=[{text: 'OK'}]) => {
  return {
    title,
    message,
    error,
    buttons,
  };
}

/**
 * @description Check if an userMessage must be shown as an Alert on the current component
 *
 * @param {*} ownerViewId Current viewing owner name/id owning the message
 * @param {*} userMessage shared reducer UserMessage state object
 */
export const canShowAlert = (ownerViewId, userMessage) => {
  return !isEmpty(ownerViewId) && !isNull(userMessage)
    && ownerViewId === userMessage.ownerViewId
    && userMessage.empty === false;
}
/**
 * @description Check if an userMessage must be shown as an Alert on the current component
 *
 * @param {*} ownerViewId Current viewing owner name/id owning the message
 * @param {*} loading shared reducer Loading state object
 */
export const canShowLoading = (ownerViewId, loading) => {
  return !isEmpty(ownerViewId) && !isNull(loading)
    && ownerViewId === loading.ownerViewId
    && loading.active === true;
}

/**
 * @description Generate an avatar background color based on its id text.
 * Source: https://medium.com/@pppped/compute-an-arbitrary-color-for-user-avatar-starting-from-his-username-with-javascript-cd0675943b66
 *
 * @param {*} str text to get the hue parameter of the returned color
 * @param {*} s a number between 0 and 100
 * @param {*} l  a number between 0 and 100
 */
export const stringToHslColor = (str, s, l) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var h = hash % 360;
  return 'hsl('+h+', '+s+'%, '+l+'%)';
}

/**
 * @description Get a param from a navigation object
 *
 * @param {*} navigation
 * @param {*} paramName
 */
export const getNavigationParam = (navigation, paramName) => {
  let paramValue = null;
  if (!isEmpty(paramName)
      && !isEmpty(navigation)
      && !isNull(navigation.state)
      && !isNull(navigation.state.params)
      && !isEmpty(navigation.state.params[paramName])) {
    paramValue = navigation.state.params[paramName];
  }
  return paramValue;
}

/**
 * @description Calculate the difference in miliseconds between two dates
 *
 * @param {Date} startDate Started date
 * @param {Date} endDate End date, must be greater than start date
 */
export const getDateMilisDifference = (startDate, endDate) => {
  return Math.abs(endDate - startDate);
}