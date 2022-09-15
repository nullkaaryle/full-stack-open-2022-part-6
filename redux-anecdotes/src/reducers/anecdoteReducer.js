import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

// Reducers return a new state given the previous state and an action.



// anecdoteSlice uses createSlice from Redux Toolkit.
//
// createSlice function is given
//    -slice name (here name 'anecdotes' is used as a prefix for action type)
//    -initial state (here an empty array)
//    -object containing the reducer functions (here the reducers are appendAnecdote and setAnecdotes)
//
// createSlice creates the action creators and action types
//    -action types here are 'anecdotes/appendAnecdote' and 'anecdotes/setAnecdotes
//    -action creators here are appendAnecdote() and setAnecdotes()
//
//
// Action creator is given state and action as arguments
//    -state is the current (or 'previous') state
//    -action is a payload of information
//
// getState() is used in the background to get the current state from store.

// action.payload is the argument that is given to the action creator,
// when it is called with dispatch (for example dispatch(addAnecdote(content)), payload is content )


const anecdotesSlice = createSlice(
  {
    name: 'anecdotes',
    initialState: [],
    reducers: {
      appendAnecdote(state, action) {
        state.push(action.payload)
      },

      setAnecdotes(state, action) {
        return action.payload
      }
    }
  }
)


// actions are the action creators that are defined in createSlice's reducers
// each name here refers to it's action creator function
// exporting the anecdote reducer actions
export const { appendAnecdote, setAnecdotes } = anecdotesSlice.actions



// Redux only knows how to synchronously dispatch actions,
// and any asynchronicity has to happen outside the store.
// Async actions can be implemented using the Redux Thunk library.
// From documentation: "A Redux thunk function receives dispatch and getState as arguments,
// and can dispatch actions like "this data was received from an API response"
// see diagram https://redux.js.org/tutorials/fundamentals/part-6-async-logic#redux-async-data-flow
// Here asynchronous operation (fetching data from server, fresh list of anecdotes) is executed first,
// and after that the state is changed with dispatch (the new list is now saved in store)
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.updateOne(votedAnecdote)
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// exporting the anecdote reducers
export default anecdotesSlice.reducer
