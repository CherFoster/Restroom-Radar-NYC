import { createSlice } from '@reduxjs/toolkit'

// const initialState = []

const bathroomsSlice = createSlice({
    name: 'bathrooms',
    initialState: {bathrooms: []},
    
    reducers: {
      // Give case reducers meaningful past-tense "event"-style names
      setBathrooms: (state, action) =>{
        state.bathrooms = action.payload
      }
    }
  })
  
  // `createSlice` automatically generated action creators with these names.
  // export them as named exports from this "slice" file to be used in components
  export const { setBathrooms } = bathroomsSlice.actions
  
  // Export the slice reducer as the default export to be added to store
  export default bathroomsSlice.reducer