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
 * @description Submit a new or update existing Deck object to storage
 *
 * @param {Object} object Current Deck object to add or update with the identifier
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
 * @description Remove an existing Deck object by its id from storage
 *
 * @param {String} id Identifier of the Deck
 * @return Promise
 */
export function removeDeck(id) {
  return AsyncStorage.removeItem(STORAGE_KEYS.DECKS).then(results => {
    const data = JSON.parse(results);
    data[id] = undefined;
    delete data[id];
    AsyncStorage.setItem(STORAGE_KEYS.DECKS, JSON.stringify(data));
  });
}

/**
 * @description Load all existing Deck Objects from the storage
 *
 * @param {String} results JSON serialized Decks
 * @return Object which keys are the Decks' ids
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
  const date = new Date();
  return {
    react: {
      id: 'react',
      title: 'React',
      created: date,
    },
    reactnative: {
      id: 'reactnative',
      title: 'React Native',
      created: date,
    },
    reactredux: {
      id: 'reactredux',
      title: 'React Redux',
      created: date,
    },
    javascript: {
      id: 'javascript',
      title: 'JavaScript',
      created: date,
    }
  };
}

/**
 * @description Load all stored questions
 *
 * @return Promise with an Object which keys are the questions' ids
 */
export function getQuestions() {
  return AsyncStorage.getItem(STORAGE_KEYS.QUESTIONS).then(
    loadStorageQuestions
  );
}

/**
 * @description Submit a new or existing Question object to storage
 *
 * @param {Object} object Current Question Object to add or update with the id
 * @return Promise
 */
export function submitQuestion({ question, id }) {
  return AsyncStorage.mergeItem(
    STORAGE_KEYS.QUESTIONS,
    JSON.stringify({
      [id]: question
    })
  );
}

/**
 * @description Remove an existing Question Object by its id from storage
 *
 * @param {String} id Question identifier
 * @return Promise
 */
export function removeQuestion(id) {
  return AsyncStorage.removeItem(STORAGE_KEYS.QUESTIONS).then(results => {
    const data = JSON.parse(results);
    data[id] = undefined;
    delete data[id];
    AsyncStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(data));
  });
}

/**
 * @description Remove all existing Question Objects by parent Deck id from storage
 *
 * @param {String} deckId Parent Deck identifier
 * @return Promise
 */
export function removeQuestionsFromDeck(deckId) {
  return AsyncStorage.removeItem(STORAGE_KEYS.QUESTIONS).then(results => {
    const data = JSON.parse(results);
    const newData = arrayToIndexedObject(
      Object.values(data).filter(question => question.deck !== deckId)
    );
    AsyncStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(newData));
  });
}

/**
 * @description Load all existing question Object from the storage
 *
 * @param {String} results JSON serialized Questions
 * @return Object which keys are the questions' ids
 */
function loadStorageQuestions(results) {
  if (results === null) {
    return getDefaultQuestions();
  } else {
    return JSON.parse(resuts);
  }
}

/**
 * @description Fixed start default Question Objects.
 */
function getDefaultQuestions() {
  const date = new Date();
  return {
    '3a5f43c27b0f': {
      id: '3a5f43c27b0f',
      deck: 'react',
      question: 'What is React?',
      answer: 'A library for managing user interfaces',
      created: date,
    },
    a17b8cd49032: {
      id: 'a17b8cd49032',
      deck: 'react',
      question: 'Where do you make Ajax requests in React?',
      answer: 'The componentDidMount lifecycle event',
      created: date,
    },
    d64bf17a043: {
      id: 'd64bf17a043',
      deck: 'reactnative',
      question: 'What is Expo?',
      answer: 'A service that makes React Native development a lot easy',
      created: date,
    },
    b94fbcf39105: {
      id: 'b94fbcf39105',
      deck: 'reactnative',
      question: 'What are the two most used graphic components?',
      answer: 'View and Text',
      created: date,
    },
    '12a75cd9084b': {
      id: '12a75cd9084b',
      deck: 'reactredux',
      question: 'What is a State Tree?',
      answer: 'The single place where all data are stored',
      created: date,
    },
    '985fc03b6a38': {
      id: '985fc03b6a38',
      deck: 'reactredux',
      question: 'What kind of functions are required to update Redux state?',
      answer: 'Pure functions',
      created: date,
    },
    '8b9f0291526c': {
      id: '8b9f0291526c',
      deck: 'javascript',
      question: 'What is JavaScript?',
      answer: 'The Programming Language for the Web',
      created: date,
    },
    '63524f3c2a16': {
      id: '63524f3c2a16',
      deck: 'javascript',
      question: 'What does JavaScript change and manipulate?',
      answer: 'HTML, CSS and data',
      created: date,
    }
  };
}
