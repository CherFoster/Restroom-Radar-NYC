import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage,useFormik } from 'formik';
import * as yup from'yup';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews, addReview, updateReview, deleteReview } from '../../reducers/reviewsSlice';

function Reviews({bathroomId}) {
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.reviews);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    dispatch(fetchReviews(bathroomId))
  }, [dispatch, bathroomId]);

  const reviewsForBathroom = allReviews.filter(review => review.bathroom_id == Number(bathroomId));

  const formSchema = yup.object().shape({
    reviewContent: yup.string().required('Review content is required')
  });

  const handleAddReview = (values, {resetForm}) => {
    const newReview = {
      content: values.reviewContent,
      bathroom_id: bathroomId
    };
    dispatch(addReview(newReview));
    resetForm();
  };

  const handleDelete = (reviewId) => {
    dispatch(deleteReview(reviewId))
  };

  const handleEdit = (reviewId) => {
    setEditingReviewId(reviewId)
  };

  const handleUpdateReview = (reviewId, values) => {
    dispatch(updateReview({id: reviewId, review: {values.reviewContent}}))
    setEditingReviewId(null)
  }


  return (
    <div className="review">
      <h3>REVIEWS:</h3>
      <Formik
              initialValues={{ reviewContent: ''}}
              validationSchema={forSchema}
              onSubmit={handleAddReview}
      >
        {({isSubmitting})=> (
          <Form className="review-form">
            <Field name="reviewContent" className="form-control"/>
            <ErrorMessage name="reviewContent" component="div" />
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <ul className="review-list">
        {reviewsForBathroom.map((review) => (
          <li key={review.id} className="review-item">
            {editingReviewId === review.id ? (
              <Formik
              initialValues={{ reviewContent: review.content}}
              validationSchema={yup.object().shape({
                reviewContent: yup.string.required('Review content is required')
              })}
              onSubmit={(values) => handleUpdateReview(review.id, {
                content: values.reviewContent
              })}
              >
                {({isSubmitting})=> (
                  <Form>
                    <Field name="reviewContent" className="form-control"/>
                    <ErrorMessage name="reviewContent" component="div" />
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                    Save Changes
                    </button>
                    <button onClick={() => setEditingReviewId(null)} className="btn btn-primary">
                    Cancel
                    </button>
                  </Form>
                )}
              </Formik>
            ):(
            <>
                 <p>{review.content}</p>
                <button onClick={() => handleEdit(review.id)} className="btn">
                Edit
                </button>
                <button onClick={() => handleDelete(review.id)} className="btn">
                Delete
                </button>
            </>
            )}
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
