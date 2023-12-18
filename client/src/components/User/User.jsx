import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function User() {
  const { loggedIn, currentUser } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!loggedIn) {
      navigate('/user');
    } else {
      // Fetch reviews for the logged-in user
      fetch(`/api/users/${currentUser}/reviews`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch reviews: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          setReviews(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [loggedIn, navigate, currentUser]);

  if (!loggedIn) {
    return <p>redirecting...</p>;
  }

  return (
    <div>
      <h1>My Reviews</h1>
      {reviews.map((review) => (
        <div key={review.id}>
          <p>{review.content}</p>
          <p>bathroom name of review?</p>
        </div>
      ))}
    </div>
  );
}

export default User;


/*
I want this page to display reviews created the by the use alone
the session is locked - user is logged in 
I need to grab reviews created by user...
*/