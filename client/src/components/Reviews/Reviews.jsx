import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { setReviews } from '../../reducers/reviewsSlice';

function Reviews() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);

  // const bathroom = reviews.bathroom.bathroom_id;
  // const user = reviews.user_id;

  let initialState = {
    content: '',
    // bathroom_id: bathroom.id || null,
    // user_id: user.id || null,
  };

  const [newReview, setNewReview] = useState(initialState);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        dispatch(setReviews(data)); 
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [dispatch]);

  const handleSubmit = () => {
    fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        dispatch(setReviews([...reviews, data]));
        setNewReview(initialState);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  };

  const handleDelete = (id) => {
    // Call API to delete review
    fetch(`/api/reviews/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Update Redux store
        dispatch(setReviews(reviews.filter((review) => review.id !== id)));
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  };

  const handleEdit = (id) => {
    // this is my post sooo maybe doing too much?
    console.log(`Editing review with ID: ${id}`);
  };

  const initialValues = {
    reviewContent: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      // Handle the submission of the review content here
      console.log('Review submitted:', values.reviewContent);
      resetForm();
      // Additional logic for submitting the review (if needed)
      handleSubmit();
    },
  });

  return (
    <div className="review">
      <h3>REVIEWS:</h3>
      <form className="review-form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="reviewContent">Add a Review:</label>
          <input
            id="reviewContent"
            name="reviewContent"
            type="text"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.reviewContent}
          />
        </div>
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
      </form>
      <ul className="review-list">
        {reviews.map((review) => (
          <li key={review.id} className="review-item">
            {review.content}
            <button onClick={() => handleDelete(review.id)} className="btn btn-secondary">
              Delete
            </button>
            <button onClick={() => handleEdit(review.id)} className="btn btn-secondary">
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;








// import React from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { setReviews } from "../../reducers/reviewsSlice";


// function Reviews() {
//   const reviews = useSelector(state => state.reviews.reviews)
//   const dispatch = useDispatch()

//   return (
//     <div>Reviews</div>
//   )
// }

// export default Reviews
