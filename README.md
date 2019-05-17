# Flashcards Project of Rafael Araujo Gumz

This is Flashcards Android smartphone's app project, developed for the final assessment of Udacity's React Native Nanodegree course.
It was tested only on Android 8.1.0 devices, so it is no yet suitable to iOS devices or emulators, nor tested on Android emulators.
The app screens' contents were built using React, React Native, React Navigation, Redux, Expo, JSX, JS and equivalent CSS Styles with Flexbox.
They are dynamic and use own static styles and design inspired on previous examples and exercises of this course.
This mobile app improve the user study skills with the help of flashcards' collections divided on decks. It allows to add new Decks and its Cards, also running quizzes to study, measuring time and giving statistics about the thought answers.
React+Redux is used to share its data and state across components and screens as well as React Native AsyncStorage do save the data permanently on the device, also managing data fetch, update and remove.
There is no authorization or authentication process, as the project's rubric do not state.

## Building and Deploying

It was developed and manually tested in an Android 8.1.0 device running Expo client.
To start using the web application right away:
* If Expo is not installed on you computer, run `yarn global add expo-cli`.
* Install all project dependencies running `yarn install` on the project root directory.
* Start the Expo server running `yarn start` on the project root directory.
* At the Expo web browser page select the device or emulator/simulator you want to run and wait for Expo to do the rest. Follow Expo's instructions to solve any problem. If needed, Expo can be manually installed on the Android device through Google Play at `https://play.google.com/store/apps/details?id=host.exp.exponent&showAllReviews=true`.

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
//TODO: next sessions...
## Libraries and Dependencies

The following libraries where added to this project through [npm install --save](https://docs.npmjs.com/cli/install):
* [prop-types](https://www.npmjs.com/package/prop-types) - As instructed on the React Fundamentals course.
* [@material-ui/core](https://www.npmjs.com/package/@material-ui/core) - Used some UI components like TextField, Button, Fab, Dialog etc.
* [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) - Used some selected SVG icons to enrich UI and user UX.
* [react-dom](https://www.npmjs.com/package/react-dom) - Needed to React manages the DOM state and server renderers.
* [react-icons](https://www.npmjs.com/package/react-icons) - Used some selected SVG icons to enrich UI and user UX.
* [react-redux](https://www.npmjs.com/package/react-redux) - Main requirement to manage application state globally with Redux API container.
* [react-redux-loading](https://www.npmjs.com/package/react-redux-loading) - A React-Redux loading bar API to easy long process wait.
* [react-router-dom](https://www.npmjs.com/package/react-router-dom) - Needed to route creation as a project requirement and navigation.
* [react-thunk](https://www.npmjs.com/package/react-thunk) - Enable thunk middleware to React components.
* [redux](https://www.npmjs.com/package/redux) - Redux API container to manage predictable state.
* [redux-thunk](https://www.npmjs.com/package/redux-thunk) - Enable thunk middleware to Redux.

## Web Application Pages and Navigation

A toolbar was fixed on the top of every page at `App` React component, containing the web application title and two buttons named `Home` and `New Deck`. It may also contains contextual buttons (or menu items) added on each page through `commonActions` and `commonReducers` functions processed at `Menu` React component.

The main page (/) presents all Category and Deck object entities fetched from backend server. Clicking on one Category take the user to its page (/category/[name]), where it presents a list of all its Decks.
Each Deck panel contains buttons to view, edit or delete the Deck object, also to increment or decrement the Deck vote score field.

Clicking on a Deck panel upright icon, except the delete, the user is sent to the `DeckEdit` React component to view (/deck/view/[deckId]/[bool_fixedCategory|empty]) and/or edit (/deck/edit/[deckId]/[bool_fixedCategory|empty]) almost all selected Deck fields values. On this component the user can also see all `CommentItem` React component displaying a Comment entity details on a `CommentList` React component. The Comments of a Deck are fetched from backend server only if the user view or edit one Deck entity.
The user is allowed to create or edit a Comment inline, at the top of the `CommentList` elements and use the action buttons to save or cancel.

At almost all Category, Deck and Comment React components, some action buttons may be contextually shown to create, save or undo entity value editions, delete entity or go back to exit the current page or action. Some of them being shown on the app toolbar, other beside the main entity panel title.

When opened the `CategoryItem` React component clicking on a Category entity name link (/category/[categoryId]), the opened page shows all the Category's Deck object entities on each `DeckItem` React component enlisted by `DeckList` React component. If the user decides to edit a Deck from this page the category cannot be changed.
If the user clicks on the New Deck button (/deck/new/[categoryName|empty]) at the toolbar or the DeckItem HTML panel button, being on the Category page, the new Deck will have this parent Category fixed and the user cannot change it. However, if the user create a new Deck or edit an existing one outside the `CategoryItem` page, the category may be changed freely.

On any deletion action button, a modal dialog window is opened to ask the user to confirm the decision, because the entity is deleted permanently and may not be recovered.

Every list panel has a button with a `MoreVertIcon` that presents the sort options of the related entity: Category, Deck and Comment.

## Caveats

Some caveats that could be improved on future releases:
* All React components of this project were created trying to follow the DO ONE THING principle and all good practices taught during the course, however due to React development unexperience, they may have grown more than expected.
* The components should be better segregated to Presentational and Container Components, may even use PureComponents.
* Some common behavior should be placed on a parent component class and inherited.
* On Deck or Comment edit, detect if the values changed before handling backend and redux state data saving.
* Make list sorting options save by page route.
* Improve Udacity api-server to manage more fields and operations to better Category, Deck and Comment use.
* Better way to discover the category name on current page URL when on any Deck component to block category change.
* The CSS should be improved.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Backend Server

To simplify the development process, Udacity provided a backend server to develop against.
The backend API uses a fixed set of categories, decks and comments data.
It is kept on JavaScript files at `..\api-server\**` path.

To interact with REST web service operations on this backend server the [`restAPI.js`](https://github.com/ragumz/udacity-react-project02-redux-readable/blob/master/app-readable/src/utils/restAPI.js) contains the methods to perform necessary operations on the backend:

* [`getAllCategories`]
* [`getAllDecks`]
* [`getAllDecksFromCategory(categoryId)`]
* [`addNewDeck(deck)`]
* [`getDeck(deckId)`]
* [`placeDeckVote({id, option})`]
* [`updateDeck({id, category, title, author, body, deleted = false})`]
* [`deleteDeck(deckId)`]
* [`getAllCommentsFromDeck(deckId)`]
* [`addNewComment(comment)`]
* [`placeCommentVote({id, option})`]
* [`updateComment`]
* [`deleteComment(commentId)`]

## Final Notes

* This repository contains a particular React project code for Udacity instructors evaluation only.
* Students are encouraged to try developing this exercise by themselves and "NOT TO COPY" the source codes.
* All the text, comments and documentation was made in English, to practice and foreseeing future Udacity courses. However, some errors may have been left behind due the lack of revision time!
* The Git commit messages were short and clean.
* It was reused some code and concepts from [`React Fundamentals My Reads project`](https://github.com/ragumz/udacity-react-project01-myreads) of my creation.
* All the source code were produced between 20 and 00:30 hours after a long day of 9 hours of architecture, engineering and programming. Also produded on weekends, when my 1 year old daughter allowed. That is mid-age student life!