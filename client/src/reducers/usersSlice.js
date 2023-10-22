import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      // Give case reducers meaningful past-tense "event"-style names
      userAdded(state, action) {
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
  export const { usersAdded } = usersSlice.actions
  
  // Export the slice reducer as the default export
  export default usersSlice.reducer