import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

// getState returns the current state tree of the application.
// The store contains these states in the beginning:
//  anecdotes (an empty array),
//  filter (empty string, null could be also used),
//  notification (object with two properties)
//
// {
//  anecdotes: []
//  filter: ""
//  notification: { message: null, content: null }
// }
console.log(store.getState())


// Provider is wrapped around App
// and defines what store we want to use in the application,
// so that all the components in the app can access the (states in) store.
ReactDOM
  .createRoot(
    document.getElementById('root')
  )
  .render(
    <Provider store={store}>
      <App />
    </Provider>
  )

