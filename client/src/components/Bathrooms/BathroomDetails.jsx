import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

function BathroomDetails() {
  const bathrooms = useSelector(state => state.bathrooms.bathrooms)
  const dispatch = useDispatch()
  
  useEffect(() => {
    fetch(`/api/bathrooms/${id}`)
    .then(res => res.json())
    .then(data => {
      dispatch(setBathrooms(data))
    })
  },[id])

// do i need state?
  return (
    <div>BathroomDetails</div>
  )
}

export default BathroomDetails