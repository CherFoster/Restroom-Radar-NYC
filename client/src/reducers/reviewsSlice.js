import { createSlice } from '@reduxjs/toolkit'

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {reviews: []},
    
    reducers: {
      setReviews(state, action) {
        state.reviews = action.payload

      }
    }
  })
  
  export const { setReviews } = reviewsSlice.actions
  
  export default reviewsSlice.reducer


 /*
 Reviews need to be created, edited? deleted?
 should be showed under user specifically 
 */