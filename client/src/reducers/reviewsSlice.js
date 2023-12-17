  import { createSlice } from '@reduxjs/toolkit';

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviewsForBathroom: [],
  },
  reducers: {
    setReviewsForBahtroom: (state, action) => {
      state.reviewsForBathroom = action.payload;
    },
    addReview: (state, action) => {
      state.reviewsForBathroom.push(action.payload);
    },
    updateReview: (state, action) => {
      const updatedReview = action.payload;
      state.reviewsForBathroom = state.reviewsForBathroom.map(review =>
        review.id === updatedReview.id ? updatedReview : review 
        );
    },
    deleteReview: (state, action) => {
      const deletedReviewv = action.payload;
      state.reviewsForBathroom = state.reviewsForBathroom.filter(review => 
        review.id !== deletedReviewv)
    }
  },
});

export const { setReviewsForBahtroom, addReview, updateReview, deleteReview } = reviewsSlice.actions;

export default reviewsSlice.reducer;




// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// export const fetchReviews = createAsyncThunk(
//   'reviews/fetchReviews',
//   async(bathroomId) => {
//     const response = await fetch(`/api/bathrooms/${bathroomId}/reviews`);
//     const data = await response.json();
//     return data;
//   }
// );

// export const addReview = createAsyncThunk(
//   'reviews/addReviews',
//   async (review) => {
//     const response= await fetch('/api/reviews', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(review),
//     });
//     const data = await response.json();
//     return data
//   }
// );

// export const updateReview = createAsyncThunk(
//   'reviews/updateReviews',
//   async ({id, review}) => {
//     const response= await fetch(`/api/reviews/${id}`, {
//       method: 'PATCH',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(review),
//     });
//     const data = await response.json();
//     return data
//   }
// );

// export const deleteReview = createAsyncThunk(
//   'reviews/deleteReview',
//   async(id) => {
//     await fetch (`/api/reviews/${id}`,{
//       method: "DELETE",
//     });
//     return id;
//   }
// )

// const reviewsSlice = createSlice({
//     name: 'reviews',
//     initialState: [],
//     reducers: {},
//     extraReducers: {
//       [fetchReviews.fulfilled]: (state, action) => {
//         return state = action.payload;
//       },
//       [addReview.fulfilled]: (state, action) => {
//         state.push(action.payload);
//       },
//       [updateReview.fulfilled]: (state, action) => {
//         const index = state.findIndex((review) => review.id === action.payload.id);
//         if (index !== -1) {
//           state = [...state.slice(0, index), action.payload, ...state.slice(index + 1)];
//         }
//       },
//       [deleteReview.fulfilled]: (state, action) => {
//         return state.filter(review => review.id !== action.payload);
//       }
//     }
//   });
  

//   export default reviewsSlice.reducer