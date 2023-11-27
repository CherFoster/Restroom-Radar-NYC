import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setReviews } from "../../reducers/reviewsSlice";


function Reviews() {
  const reviews = useSelector(state => state.reviews.reviews)
  const dispatch = useDispatch()

  return (
    <div>Reviews</div>
  )
}

export default Reviews
