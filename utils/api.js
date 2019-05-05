import { AsyncStorage } from 'react-native';
import { STORAGE_KEYS } from './constants';

/**
 * @description Load all stored decks
 *
 * @return Promise with an Object which keys are the decks' ids
 */
export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEYS.DECKS).then(loadStorageDecks);
}

/**
 * @description Submit a new or existing deck object to storage
 *
 * @param {deck, id} Object to add or update with the id
 * @return Promise
 */
export function submitDeck({ deck, id }) {
  return AsyncStorage.mergeItem(
    STORAGE_KEYS.DECKS,
    JSON.stringify({
      [id]: deck
    })
  );
}

/**
 * @description Remove an existing deck Object by its id from storage
 *
 * @param {String} Identification of the Deck
 * @return Promise
 */
export function removeDeck(id) {
  return AsyncStorage.removeItem(STORAGE_KEYS.DECKS, id).then(results => {
    const data = JSON.parse(results);
    data[id] = undefined;
    delete data[id];
    AsyncStorage.setItem(STORAGE_KEYS.DECKS, JSON.stringify(data));
  });
}

/**
 * @description Remove an existing deck Object by its id from storage
 *
 * @param {String} Identification of the Deck
 * @return Object which keys are the decks' ids
 */
function loadStorageDecks(results) {
  if (results === null) {
    return getDefaultDecks();
  } else {
    return JSON.parse(resuts);
  }
}

/**
 * @description Fixed start default Deck Objects.
 */
function getDefaultDecks() {
  return {
    react: {
      id: 'react',
      title: 'React',
      questions: [
        {
          id: '3a5f43c27b0f',
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          id: 'a17b8cd49032',
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    reactnative: {
      id: 'reactnative',
      title: 'React Native',
      questions_count: 0
    },
    reactredux: {
      id: 'reactredux',
      title: 'React Redux',
      questions_count: 0
    },
    js: {
      id: 'js',
      title: 'JavaScript',
      questions_count: 0
    }
  };
}
