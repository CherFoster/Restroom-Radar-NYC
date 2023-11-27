import { createSlice } from '@reduxjs/toolkit'

const sessionSlice = createSlice({
    name: 'session',
    initialState: { user: null},
    
    reducers: {
      setSession: (state, action) =>{
        state.bathrooms = action.payload
      }
    }
  })

  export const { setSession } = sessionSlice.actions

  export default sessionSlice.reducer