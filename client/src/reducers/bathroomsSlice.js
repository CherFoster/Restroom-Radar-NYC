import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const bathroomsSlice = createSlice({
    name: 'bathrooms',
    initialState,
    
    reducers: {
      // Give case reducers meaningful past-tense "event"-style names
      bathroomAdded(state, action) {
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
  // export them as named exports from this "slice" file to be used in components
  export const { bathroomAdded } = bathroomsSlice.actions
  
  // Export the slice reducer as the default export to be added to store
  export default bathroomsSlice.reducer