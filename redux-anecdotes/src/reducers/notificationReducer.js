import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  content: null
}


const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {

    createNotification(state, action) {
      const { message, content } = action.payload
      return {
        message: message,
        content: content
      }
    },

    clearNotification(state, action) {
      return {
        message: null,
        content: null
      }
    }

  }
})

export const { createNotification, clearNotification } = notificationSlice.actions



let timeoutId = null

export const setNotification = (message, content, time) => {
  return async dispatch => {

    clearTimeout(timeoutId)

    dispatch(createNotification({ message, content }))

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)

  }
}


// ^ if the user votes twice quickly, and we don't use clearTimeout
// the following will happen:
//
// user clicks vote button
// first notification appears in browser
//    timer for clearing the notification starts in the background, 1,2,3...
// user clicks vote button again
// now the second notification replaces the first one in browser
//    timer for clearing the second notification also starts in the background, 1,2...
//    timer for the first notification has now finished and sets notification to null
// the notification disappears from the browser
//    after few seconds the timer for the second notification has now finished
//    the notification that was already null, is set to null again
// browser stays the same, because notification was already hidden
//
// So setNotification is called twice and both calls are executed fully
// but they are racing, and the the other call does not wait for the other call to finish.
// We only have one (shared) state in store for the notification,
// so if we have many instances of Notification component in the application
// we could maybe have different ids for them and use that to separate them


export default notificationSlice.reducer
