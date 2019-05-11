/**
 * @description AsyncStorage keys to manage global saved data
 */
export const STORAGE_KEYS = Object.freeze({
  DECKS: 'Flashcards:decks',
  CARDS: 'Flashcards:cards'
});

/**
 * @description Default app Colors
 */
export const COLORS = Object.freeze({
  GRAY: '#757575',
  WHITE: '#fff',
  BLUE: '#4e4cb8',
  RED: '#b71845',
  ORANGE: '#f26f28',
  PURPLE: '#292477',
  LIGHT_PURPlE: '#7c53c3',
  PINK: '#b93fb3',
  BLACK: '#000000',
});

/**
 * @description Empty Deck freezed object
 */
export const EMTPY_DECK = Object.freeze({
  id: '',
  title: '',
  quizCount: 0,
  created: null,
});

/**
 * @description Empty Card freezed object
 */
export const EMTPY_CARD = Object.freeze({
  id: '',
  deck: '',
  question: '',
  answer: '',
  difficulty: 0,
  correctCount: 0,
  incorrectCount: 0,
  created: null,
});

/**
 * @description Constant with component ids to restrict actions and behavior on screen
 */
export const OWNER_VIEWS = Object.freeze({
  HOME: 'Home',
  DECK_EDIT: 'DeckEdit',
  CARD_EDIT: 'CardEdit',
})