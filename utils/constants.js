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
  quizStatistics: {timesCompleted: 0, totalTimeMilis: 0, bestTimeMilis: -1, bestCardsAmount: 0, worstTimeMilis: -1, worstCardsAmount: 0},
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
  quizStatistics: {correct: 0, incorrect: 0, totalTimeMilis: 0, bestTimeMilis: -1, worstTimeMilis: -1},
});

/**
 * @description Constant with component ids to restrict actions and behavior on screen
 */
export const OWNER_VIEWS = Object.freeze({
  HOME: 'Home',
  DECK_EDIT: 'DeckEdit',
  CARD_EDIT: 'CardEdit',
  DECK_QUIZ: 'DeckCardsQuiz',
})

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