import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    
    reducers: {
  
      reviewAdded(state, action) {
        const { id, text } = action.payload
        state.todos.push({
          id,
          text,
          completed: false
        })
      }
    }
  })
  

  export const { reviewAdded } = reviewsSlice.actions
  
  export default reviewsSlice.reducer