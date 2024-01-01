import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function User() {
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/user');
    } else {
      // Fetch reviews for the logged-in user
      fetch(`/api/users/${user.id}/reviews`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch reviews`);
          }
          return response.json();
        })
        .then((data) => {
          setUserReviews(data); // Update the state with fetched reviews
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isAuthenticated, navigate, user]);

  if (!isAuthenticated) {
    return <p>redirecting...</p>;
  }

  return (
    <div>
      <h1>My Reviews</h1>
      {userReviews.map((review) => (
        <div key={review.id}>
          <p>{review.content}</p>
          {/* Need to add bathroom id? */}
          <p>bathroom name to review</p>
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