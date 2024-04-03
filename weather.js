import React from 'react';
import { Card } from 'react-bootstrap';

const Weather = ({ forecasts }) => {
  return (
    <div>
      {forecasts.map((forecast, index) => (
        <Card key={index} style={{ marginBottom: '1rem' }}>
          <Card.Body>
            <Card.Title>{forecast.date}</Card.Title>
            <Card.Text>{forecast.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Weather;
