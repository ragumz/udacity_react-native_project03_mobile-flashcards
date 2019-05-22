/**
 * @description AsyncStorage keys to manage global saved data
 */
export const STORAGE_KEYS = Object.freeze({
  DECKS: 'Flashcards:decks',
  CARDS: 'Flashcards:cards',
  NOTIFICATION_TODAY: 'Flashcards:notif_today'
});

/**
 * @description Notification repeat options
 */
export const NOTIFICATION_REPEAT = Object.freeze({
  MINUTE: "minute",
  HOUR: "hour",
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
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
  DARK_RED: '#992626',
  DARDK_GREEN: '#368c35',
});

/**
 * @description Empty Deck freezed object
 */
export const EMTPY_DECK = Object.freeze({
  id: '',
  title: '',
  created: null,
//  quizStatistics: { timesCompleted: 0, totalTimeMilis: 0 },
//  bestScore:  EMPTY_DECK_SCORE,
//  worstScore: EMPTY_DECK_SCORE,
});

/**
 * @description Empty Deck Quiz Statistics freezed object
 */
export const EMPTY_DECK_QUIZ_STATS = Object.freeze({
  timesCompleted: 0,
  totalTimeMilis: 0,
});

/**
 * @description Empty Deck Quiz Score freezed object
 */
export const EMPTY_DECK_SCORE = Object.freeze({
  correctAnswers: -1,
  startTime: null,
  endTime: null,
  deckSize: 0,
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
  created: null,
//  quizStatistics: { correct: 0, incorrect: 0, totalTimeMilis: 0 },
//  bestScore:  { startTime: null, endTime: null },
//  worstScore: { startTime: null, endTime: null },
});

/**
 * @description Empty Card Quiz Statistics freezed object
 */
export const EMPTY_CARD_QUIZ_STATS = Object.freeze({
  correct: 0,
  incorrect: 0,
  totalTimeMilis: 0,
});

/**
 * @description Empty Card Quiz Score freezed object
 */
export const EMPTY_CARD_SCORE = Object.freeze({
  startTime: null,
  endTime: null,
});

/**
 * @description Deck and Card common inner object fields
 */
export const ENTITY_COMMON_FIELDS = Object.freeze({
  created: 'created',
  quizStatistics: 'quizStatistics',
  bestScore: 'bestScore',
  worstScore: 'worstScore',
});

/**
 * @description Constant with component ids to restrict actions and behavior on screen
 */
export const OWNER_VIEWS = Object.freeze({
  HOME: 'Home',
  DECK_DETAIL: 'DeckDetail',
  DECK_ITEM: 'DeckItem',
  DECK_EDIT: 'DeckEdit',
  CARD_EDIT: 'CardEdit',
  DECK_QUIZ: 'DeckCardsQuiz',
});

/**
 * @description Constants with the Quiz possible answers
 */
export const QUIZ_ANSWERS = Object.freeze({
  CORRECT: Object.freeze({
    value: 'correct',
    title: 'Correct',
    background: COLORS.DARDK_GREEN,
    foreground: COLORS.WHITE
  }),
  INCORRECT: Object.freeze({
    value: 'incorrect',
    title: 'Incorrect',
    background: COLORS.DARK_RED,
    foreground: COLORS.WHITE
  })
});