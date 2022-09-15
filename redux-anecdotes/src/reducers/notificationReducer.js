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


export default notificationSlice.reducer
