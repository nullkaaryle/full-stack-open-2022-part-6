import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// Importing an action called 'initializeAnecdotes' from a reducer called 'anecdoteReducer'.
// When an action is dispatched it changes the state that kept in the redux store.
import { initializeAnecdotes } from './reducers/anecdoteReducer'

import AnecdoteFilter from './components/AnecdoteFilter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'


const App = () => {

  // useDispatch() returns a reference to the dispatch function from the Redux store.
  const dispatch = useDispatch()

  // 'dispatch' is used to dispatch actions defined in reducer files.
  // Calling action creator (such as initializeAnecdotes() ) only creates the action
  // so you also need to dispatch it to actually make changes the state.
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <h1>Anecdotes</h1>
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )

}

export default App
