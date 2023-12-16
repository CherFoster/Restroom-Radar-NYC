import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function User() {
  const { loggedIn, currentUser } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!loggedIn) {
      navigate('/user');
    } else {
      // Fetch reviews for the logged-in user
      fetch(`/api/reviews/${currentUser.id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch reviews: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          setReviews(data); 
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [loggedIn, navigate, currentUser.id]);

  const handleCreateReview = async () => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: currentUser,  // expects a user_id
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to create review: ${response.statusText}`);
      }

      //show newly created review
      const newReview = await response.json();

      // Update the state to include the new review created by user
      setReviews([...reviews, newReview]);
    } catch (error) {
      console.error(error);
    }
  };

  if (!loggedIn) {
    return <p>redirecting...</p>;
  }

  return (
    <div>
      <h1>My Reviews</h1>
      <button onClick={handleCreateReview}>Create Review</button>
      {reviews.map(review => (
        <div key={review.id}>
          <p>{review.conent}</p>
          <p>bahtroom name of review?</p>
        </div>
      ))}
    </div>
  );
}

export default User;





/*
I need user to log in and see the reviews they've created... many user will use many bathrooms
need to grab reviews based on id 
*/