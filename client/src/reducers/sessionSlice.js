import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk('session/login', async (userData) => {
  const response = await fetch('/api/login',{
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: await response.json(userData)
  })

  return await response.json();
}) 

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
      loggedIn: false,
      currentUser: null,
      loading: true
    },
    
    reducers: {
      // setSession: (state, action) =>{
      //   state.user = action.payload;
      // }
    },
    extraReducers(builder) {
      builder.addCase(login.pending, (state, action) => {
        state.loading = true
      })
      builder.addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
        state.loggedIn = true
      })
      builder.addCase(login.rejected, (state, action) => {
        state.error = action.error
      })

    }
  })

  export const { setSession } = sessionSlice.actions

  export default sessionSlice.reducer

