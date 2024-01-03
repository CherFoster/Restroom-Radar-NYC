import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

function BathroomList() {
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/bathrooms/${id}`)// navigate to /bathrooms/:id
  }

  const bathrooms = useSelector(state => state.bathrooms.bathrooms)

  return (
    <div>
      {bathrooms.map((bathroom) => (
        <Card key={bathroom.id} className="bathroom-card">
          <Card.Header as="h5">{bathroom.bathroom_name}</Card.Header>
          <Card.Body>
            <Card.Text>
              Address: {bathroom.street_num} {bathroom.street_name}<br/>
              City: {bathroom.city}<br/>
              Zip code: {bathroom.zip_code}
            </Card.Text>
            <Button variant="primary" onClick={() => handleClick(bathroom.id)}>View Details</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default BathroomList