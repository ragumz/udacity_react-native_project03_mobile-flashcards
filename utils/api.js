import { AsyncStorage } from 'react-native';
import { STORAGE_KEYS } from './constants';

/**
 * @description Clear all stored data
 */
export function clearStorage() {
  AsyncStorage.clear();
}

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
export function submitDeck(deck) {
  return AsyncStorage.mergeItem(
    STORAGE_KEYS.DECKS,
    JSON.stringify({
      [deck.id]: deck
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
    //start with an initial database
    defaulDecks = getDefaultDecks();
    Object.values(defaulDecks).map(deck => submitDeck(deck));
    return defaulDecks;
  } else {
    //load database from storage
    return JSON.parse(results);
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
      quizStatistics: { timesCompleted: 0, totalTimeMilis: 0 },
      bestScore:  { correctAnswers: -1, startTime: null, endTime: null, deckSize: 0 },
      worstScore: { correctAnswers: -1, startTime: null, endTime: null, deckSize: 0 },
      created: date,
    },
    reactnative: {
      id: 'reactnative',
      title: 'React Native',
      quizStatistics: { timesCompleted: 0, totalTimeMilis: 0 },
      bestScore:  { correctAnswers: -1, startTime: null, endTime: null, deckSize: 0 },
      worstScore: { correctAnswers: -1, startTime: null, endTime: null, deckSize: 0 },
      created: date,
    },
    reactredux: {
      id: 'reactredux',
      title: 'React Redux',
      quizStatistics: { timesCompleted: 0, totalTimeMilis: 0 },
      bestScore:  { correctAnswers: -1, startTime: null, endTime: null, deckSize: 0 },
      worstScore: { correctAnswers: -1, startTime: null, endTime: null, deckSize: 0 },
      created: date,
    },
    javascript: {
      id: 'javascript',
      title: 'JavaScript',
      quizStatistics: { timesCompleted: 0, totalTimeMilis: 0 },
      bestScore:  { correctAnswers: -1, startTime: null, endTime: null, deckSize: 0 },
      worstScore: { correctAnswers: -1, startTime: null, endTime: null, deckSize: 0 },
      created: date,
    }
  };
}

/**
 * @description Load all stored Cards Objects
 *
 * @return Promise with an Object which keys are the Cards' ids
 */
export function getCards() {
  return AsyncStorage.getItem(STORAGE_KEYS.CARDS).then(
    loadStorageCards
  );
}

/**
 * @description Submit a new or existing Card object to storage
 *
 * @param {Object} card Current Card Object to add or update with the id
 * @return Promise
 */
export function submitCard(card) {
  return AsyncStorage.mergeItem(
    STORAGE_KEYS.CARDS,
    JSON.stringify({
      [card.id]: card
    })
  );
}

/**
 * @description Submit a collection of existing Cards object to storage
 *
 * @param {Object} cards Current Cards Object with each Card indexed by its ID to be updated
 * @return Promise
 */
export function submitMultiCards(cards) {
  return AsyncStorage.mergeItem(
    STORAGE_KEYS.CARDS,
    JSON.stringify({
      ...cards
    })
  );
}

/**
 * @description Remove an existing Card Object by its id from storage
 *
 * @param {String} id Card identifier
 * @return Promise
 */
export function removeCard(id) {
  return AsyncStorage.removeItem(STORAGE_KEYS.CARDS).then(results => {
    const data = JSON.parse(results);
    data[id] = undefined;
    delete data[id];
    AsyncStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(data));
  });
}

/**
 * @description Remove all existing Card Objects by parent Deck id from storage
 *
 * @param {String} deckId Parent Deck identifier
 * @return Promise
 */
export function removeCardsFromDeck(deckId) {
  return AsyncStorage.removeItem(STORAGE_KEYS.CARDS).then(results => {
    const data = JSON.parse(results);
    const newData = arrayToIndexedObject(
      Object.values(data).filter(card => card.deck !== deckId)
    );
    AsyncStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(newData));
  });
}

/**
 * @description Load all existing Cards Objects from the storage
 *
 * @param {String} results JSON serialized Cards
 * @return Object which keys are the Cards' ids
 */
function loadStorageCards(results) {
  if (results === null) {
    //start with an initial database
    let defaulCards = getDefaultCards();
    Object.values(defaulCards).map(card => submitCard(card));
    return defaulCards;
  } else {
    //load database from storage
    return JSON.parse(results);
  }
}

/**
 * @description Fixed start default Cards Objects.
 */
function getDefaultCards() {
  const date = new Date();
  return {
    '3a5f43c27b0f': {
      id: '3a5f43c27b0f',
      deck: 'react',
      question: 'What is React?',
      answer: 'A library for managing user interfaces',
      difficulty: 1,
      quizStatistics: { correct: 0, incorrect: 0, totalTimeMilis: 0 },
      bestScore:  { startTime: null, endTime: null },
      worstScore: { startTime: null, endTime: null },
      created: date,
    },
    a17b8cd49032: {
      id: 'a17b8cd49032',
      deck: 'react',
      question: 'Where do you make Ajax requests in React?',
      answer: 'The componentDidMount lifecycle event',
      difficulty: 2,
      quizStatistics: { correct: 0, incorrect: 0, totalTimeMilis: 0 },
      bestScore:  { startTime: null, endTime: null },
      worstScore: { startTime: null, endTime: null },
      created: date,
    },
    d64bf17a043: {
      id: 'd64bf17a043',
      deck: 'reactnative',
      question: 'What is Expo?',
      answer: 'A service that makes React Native development a lot easy',
      difficulty: 5,
      quizStatistics: { correct: 0, incorrect: 0, totalTimeMilis: 0 },
      bestScore:  { startTime: null, endTime: null },
      worstScore: { startTime: null, endTime: null },
      created: date,
    },
    b94fbcf39105: {
      id: 'b94fbcf39105',
      deck: 'reactnative',
      question: 'What are the two most used graphic components?',
      answer: 'View and Text',
      difficulty: 3,
      quizStatistics: { correct: 0, incorrect: 0, totalTimeMilis: 0 },
      bestScore:  { startTime: null, endTime: null },
      worstScore: { startTime: null, endTime: null },
      created: date,
    },
    '12a75cd9084b': {
      id: '12a75cd9084b',
      deck: 'reactredux',
      question: 'What is a State Tree?',
      answer: 'The single place where all data are stored',
      difficulty: 6,
      quizStatistics: { correct: 0, incorrect: 0, totalTimeMilis: 0 },
      bestScore:  { startTime: null, endTime: null },
      worstScore: { startTime: null, endTime: null },
      created: date,
    },
    '985fc03b6a38': {
      id: '985fc03b6a38',
      deck: 'reactredux',
      question: 'What kind of functions are required to update Redux state?',
      answer: 'Pure functions',
      difficulty: 8,
      quizStatistics: { correct: 0, incorrect: 0, totalTimeMilis: 0 },
      bestScore:  { startTime: null, endTime: null },
      worstScore: { startTime: null, endTime: null },
      created: date,
    },
    '8b9f0291526c': {
      id: '8b9f0291526c',
      deck: 'javascript',
      question: 'What is JavaScript?',
      answer: 'The Programming Language for the Web',
      difficulty: 1,
      quizStatistics: { correct: 0, incorrect: 0, totalTimeMilis: 0 },
      bestScore:  { startTime: null, endTime: null },
      worstScore: { startTime: null, endTime: null },
      created: date,
    },
    '63524f3c2a16': {
      id: '63524f3c2a16',
      deck: 'javascript',
      question: 'What does JavaScript change and manipulate?',
      answer: 'HTML, CSS and data',
      difficulty: 2,
      quizStatistics: { correct: 0, incorrect: 0, totalTimeMilis: 0 },
      bestScore:  { startTime: null, endTime: null },
      worstScore: { startTime: null, endTime: null },
      created: date,
    }
  };
}
