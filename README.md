# Flashcards Project of Rafael Araujo Gumz

This is Flashcards Android smartphone's app project, developed for the final assessment of Udacity's React Native Nanodegree course.
It was tested only on an 5.5" screen Android 8.1.0 device, so it is no yet suitable to iOS devices or emulators, nor tested on Android emulators or in multiple screen sizes.
The app screens' contents were built using Expo, React, React Native, React Navigation, Redux, JSX, JS and equivalent CSS Styles with Flexbox.
They are dynamic and use own static styles and design inspired on previous examples and exercises of this course.
This mobile app improve the user study skills with the help of flashcards' collections divided on decks. It allows to add new Decks and its Cards, also running quizzes to study, measuring time and giving statistics about the thought answers.
React+Redux is used to share its data and state across components and screens as well as React Native AsyncStorage do save the data permanently on the device, also managing data fetch, update and remove.
There is no authorization or authentication process, as the project's rubric do not state.

## Building and Deploying

To start using the mobile application right away:

- If [`Expo`](https://expo.io/learn) is not installed on you computer, run `yarn global add expo-cli`. You can use `npm` if preferred.
- Install all project dependencies running `yarn install` on the project root directory.
- Start the Expo server running `yarn start` on the project root directory.
- At the Expo web browser page select the device or emulator/simulator you want to run and wait for Expo to do the rest. Follow Expo's instructions to solve any problem. If needed, Expo can be manually installed on the Android device through Google Play at [`Google Play Expo App`](https://play.google.com/store/apps/details?id=host.exp.exponent&showAllReviews=true).

## Project Files Structure

```bash
├── assets
│   ├── icon.png # The main app icon also used on notifications.
│   ├── splash.png # App start splash screen image.
├── card
│   ├── cardActions.js # Middleware actions to manage Card entities.
│   ├── CardEdit.js # React Native component to render Card entity content within inputs, allowing the user to fill its fields' values and save the object into Redux and AsyncStorage storages.
│   ├── cardOperations.js # Card entity exclusive functions to interact with the AsynStorage data and Redux state.
│   ├── CardQuiz.js # React Native component to render Card entity content as a Quiz, allowing the user to turn from question to answer and choose what is the tought answerd to consider on statistics presented at the end.
│   └── cardReducers.js # Redux reducers executors for Card actions.
├── common
│   ├── CustomButton.js # Default React Native component to configure and show a clicable button.
│   ├── sharedActions.js # Middleware actions to manage shared values.
│   ├── sharedOperations.js # Shared functions to manage values and behaviors.
│   └── sharedReducers.js # Redux shared reducers executors to keep global data.
├── deck
│   ├── deckActions.js # Middleware actions to manage global Deck values and behaviors
│   ├── DeckEdit.js # React component to render Deck entity content within inputs, allowing user to fill its field values and save the object.
│   ├── DeckCardsQuiz.js # React component to render Deck entity and group its Cards into a Quiz and present the Quiz statistic summary.
│   ├── DeckDetail.js # React component to render Deck entity content that presents all its details and global Quizzes statistics summary.
│   ├── DeckItem.js # React component to render Deck entity content to present some fields.
│   ├── DeckList.js # React component to render a list of all app Decks with DeckItem component.
│   ├── deckOperations.js # Deck entity exclusive functions to interact with the AsynStorage data and Redux state.
│   └── decksReducers.js # Redux reducers executors for Deck actions.
├── developer
│   └── images
│       ├── icons_source.txt # source URLs from images searched on the web to use as icons and splash.
│       ├── inspiration-icon-192x192.png # Image used to create the app start splash screen.
│       └── inspiration-icon.jpg # Image used to create the app icon.
│   ├── TODO.txt # Text file used to organized the app development process.
├── home
│   ├── FCStatusBar.js # React Native status bar component declaration to present default OS screen title and action content
│   ├── Home.js # React component to insert initial data and present Deck objects into DeckList.js component.
│   └── homeReducers.js # Redux centralized app reducers combinations.
├── utils
│   ├── api.js # Utility functions to create and manage permanent saved data with AsyncStorage.
│   ├── commons.js # Utility functions to provide common tools.
│   ├── constants.js # Freezed Objects as enumerations and other app constant values.
│   ├── middlewares.js # Thunk centralized middleware declaration.
│   └── notifications.js # Functions to ask permission and schedule notifications to the user.
├── App.js # Main App component that initializes everythin.
├── app.json # React Native main app configurations.
├── package.json # yarn package manager file.
├── README.md - # This file.
└── yarn.lock - # Yarn's versions controls of each dependency installed.
```

## Libraries and Dependencies

The following libraries where added to this project through [`yarn add`](https://yarnpkg.com/en/docs/cli/add):

- [`expo`](https://expo.io/tools) - As instructed on the React Native course. At the time of development it was installed Expo version 2.16.1.
- [`react`](https://www.npmjs.com/package/react) - Required React core to DOM and UI renderers management.
- [`react-native`](https://www.npmjs.com/package/react-native) - Required React Native core to mobile development.
- [`react-navigation`](https://www.npmjs.com/package/react-navigation) - Required React Navigation core to mobile screen navigation.
- [`redux`](https://www.npmjs.com/package/redux) - Redux API container to manage predictable state.
- [`react-redux`](https://www.npmjs.com/package/react-redux) - Manage application state globally with Redux API container. It was used version 6.0.0 because an internal redux library error cause by a deprecated function.
- [`react-thunk`](https://www.npmjs.com/package/react-thunk) - Enable thunk middleware to React components.
- [`redux-thunk`](https://www.npmjs.com/package/redux-thunk) - Enable thunk middleware to Redux.

## Mobile Application Screens and Navigation

The current app follows all the required Udacity project [`rubrics`](https://review.udacity.com/#!/rubrics/1215/view).
It presents a main navigation screen with 2 tabs: one that shows a list of Decks and the other allows the creation of a Deck.
The Deck item presents the amount of cards that it contains and tapping over a Deck navigate to the Deck Details after a spin animation.
The Deck Details screen presents the amount of cards, the creation date and the done quizzes statistics, with the acumulated times and the total ran time to complete them. It also presents the user's best and worst score, considering the percent, total correct questions, the required time to complete and the total cards on the Deck at the date. If the total cards change, the best and worst scores are reset on the next quiz.
Still on Deck Details screen two buttons are presented, the Add Card and Start Quiz, that do exactly what they mean.
The Add Card option presents the Card Edit screen that requires a question and a answer. The user may choose optionally its difficulty level, just to improve its knowledge. When hitting Create button, it presents an alert window to inform its persistence success.
The Start Quiz button brings to the user all the Cards on the selected Deck, with their questions and answers. The user may hit the "Answer" or "Question" buttons to switch between them and on the Answer side of the Card, choose if he/she thought the Correct or Incorrect answer. When the user answer the last question, a aler window inform the end of it and the the Quiz results are summarized. When the user go back and exists from it, the Deck Details has its Quiz statistics updated.
Finally, the New Deck tab presents the Deck Edit screen, where the user is required to input a unique identifier and the title of the Deck. All values are validated and the added to the Deck List.
Most long processing events presents and activity indicator to the user. Actions like creating a Deck or a Card or finishing a Quiz shows alerts to the user, as a way to confirm the action's success of failure.
The user is remembered to study everyday at 19:30 through the app notification show on the Android task bar.

## Caveats

Some caveats that could be improved on future releases:

- All React components of this project were created trying to follow the DO ONE THING principle and all good practices taught during the course, however due to React development unexperience, they may have grown more than expected.
- The components should be better segregated to Presentational and Container Components, may even use PureComponents.
- Some common behavior should be placed on a parent component class and inherited.
- Make Deck and Card content editing, giving delete option also on button or list item long press action.
- Show a Deck's Card list and allow inline Card object edit and delete.
- Make Deck and Card list sorting options, saved by screen.
- Show Deck and Card items count on each own lists.
- Improve AsyncStorage management to allow more operations and user's full control of its data.
- Capture stack navigation go back event to show Card Quiz exist alert.
- All components' styles could be improved.
- Ensure that `sharedOperations.showAlert()` function calls managed by shared userMessage redux state shows only once to the user.
- Improve iOS screen styles, make platform unique instructions where required and test on a real Apple device/emulator.

## Create React Native App

This project was bootstrapped with [`expo init`](https://expo.io/learn).

## AsyncStorage Management

No backend API were used. All data are persisted on two AsyncStorage indexes, the `Flashcards:decks` and the `Flashcards:cards`, declared on `STORAGE_KEYS` enumeration at `utils\constants.js` file.

TODO: write about api functions and default values, review DeckCardsQuiz navigation.goBack action, add comments, send to evaluation
To interact with REST web service operations on this backend server the [`restAPI.js`](https://github.com/ragumz/udacity-react-project02-redux-readable/blob/master/app-readable/src/utils/restAPI.js) contains the methods to perform necessary operations on the backend:

- [`getAllCategories`]
- [`getAllDecks`]
- [`getAllDecksFromCategory(categoryId)`]
- [`addNewDeck(deck)`]
- [`getDeck(deckId)`]
- [`placeDeckVote({id, option})`]
- [`updateDeck({id, category, title, author, body, deleted = false})`]
- [`deleteDeck(deckId)`]
- [`getAllCommentsFromDeck(deckId)`]
- [`addNewComment(comment)`]
- [`placeCommentVote({id, option})`]
- [`updateComment`]
- [`deleteComment(commentId)`]

## Final Notes

- This repository contains a particular React Native project code for Udacity instructors evaluation only.
- Students are encouraged to try developing this exercise by themselves and "NOT TO COPY" the source codes.
- All the text, comments and documentation was made in English, to practice and foreseeing future Udacity courses. However, some errors may have been left behind due the lack of revision time!
- The Git commit messages were short and clean.
- It was considere some concepts from [`React Redux Readable project`](https://github.com/ragumz/udacity-react-project02-redux-readable) of my creation.
- All the source code were produced between 20 and 00:30 hours after a long day of 9 hours of architecture, engineering and programming. Also produded on weekends, when my 1,5 year old daughter allowed. That is mid-age student life!
