import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
      // Give case reducers meaningful past-tense "event"-style names
      reviewAdded(state, action) {
        const { id, text } = action.payload
        // "Mutating" update syntax thanks to Immer, and no `return` needed
        state.todos.push({
          id,
          text,
          completed: false
        })
      }
    }
  })
  
  // `createSlice` automatically generated action creators with these names.
  // export them as named exports from this "slice" file
  export const { reviewAdded } = reviewsSlice.actions
  
  // Export the slice reducer as the default export
  export default reviewsSlice.reducer