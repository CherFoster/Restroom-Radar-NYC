import { createSlice } from '@reduxjs/toolkit'

const sessionSlice = createSlice({
    name: 'session',
    initialState: { user: null},
    
    // reducers: {
    //   setSession: (state, action) =>{
    //     state.bathrooms = action.payload
    //   }
    // }
  })

  // export const { setSession } = bathroomsSlice.actions

  export default bathroomsSlice.reducer