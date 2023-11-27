import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const usersSlice = createSlice({
    name: 'users',
    initialState,
    
    reducers: {

      userAdded(state, action) {
        const { id, text } = action.payload
        state.todos.push({
          id,
          text,
          completed: false
        })
      }
    }
  })
  
  export const { usersAdded } = usersSlice.actions
  
  export default usersSlice.reducer


