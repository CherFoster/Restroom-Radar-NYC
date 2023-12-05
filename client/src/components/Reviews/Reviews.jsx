import React, {useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { setReviews } from "../../reducers/reviewsSlice";

function Reviews() {
    useEffect(() => {
    fetch("/api/reviews")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setReviews(data)
      console.log("Test" , reviews)
    })
  },[])

  const reviews = useSelector(state => state.reviews.reviews)

  const handleDelete = (id) => {
    // Add your delete logic here using the review id
    console.log(`Deleting review with ID: ${id}`);
  };

  const handleEdit = (id) => {
    // Add your edit logic here using the review id
    console.log(`Editing review with ID: ${id}`);
  };

  const initialValues = {
    reviewContent: '',
  };

  const onSubmit = (values, { resetForm }) => {
    // Handle the submission of the review content here
    console.log('Review submitted:', values.reviewContent);
    resetForm();
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <ul className="review-list">
        {reviews.map((review) => (
          <li key={review.id} className="review-item">
            {review.content}
            <button onClick={() => handleDelete(review.id)} className="btn btn-danger">Delete</button>
            <button onClick={() => handleEdit(review.id)} className="btn btn-secondary">Edit</button>
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
