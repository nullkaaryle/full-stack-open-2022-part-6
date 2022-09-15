// importing configureStore, the Redux Toolkit abstraction of createStore
import { configureStore } from '@reduxjs/toolkit'

// importing the reducers that all use their own slice of the store
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

// Here configureStore combines all the reducers and gives them to store.
// Store is taken into use in index.js
//
// configureStore is given one object as parameter.
// The object is used for configuration and here it contains the property 'reducer'.
// The 'reducer' is a collection of reducers (reducer slices!)
// and configureStore uses combineReducers() to combine them to one root reducer.
// Other parameters we could give to configureStore besides the 'reducer'
// could be for example 'middleware' (if we wanted to use some middleware for store)
//
// The name key given here to the slice reducers, such as 'anecdotes'
// are the names for the state that are saved in the store.
// When using React Redcux 'connect' we can access them state.anecdotes
// (like in component AnecdoteList line 52)
// and see 'anecdotes' state also for example in redux dev tools in browser.
const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  }
})


export default store
