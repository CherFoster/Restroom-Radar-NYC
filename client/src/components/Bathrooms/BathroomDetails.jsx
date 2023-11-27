import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBathrooms } from "../../reducers/bathroomsSlice";
import { useParams, Link } from 'react-router-dom';
import Reviews from "../Reviews/Reviews";

function BathroomDetails() {
  const bathrooms = useSelector(state => state.bathrooms.bathrooms);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [bathroom, setBathroom] = useState(null);
  
  useEffect(() => {
    fetch(`/api/bathrooms/${id}`)
      .then(res => res.json())
      .then(data => {
        setBathroom(data); 
      });
  }, [id]);

  return (
    <div className="container">
      {!bathroom && <div>Loading...</div>}
      {bathroom && (
        <div>
          <h2>{bathroom.bathroom_name}</h2>
          <div>
            <p>Address: {bathroom.street_num} {bathroom.street_name}</p>
            <p>City: {bathroom.city}</p>
            <p>Zip Code: {bathroom.zip_code}</p>
            <hr />
            <Reviews/>
            <Link to="/">Back to Home</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default BathroomDetails;
