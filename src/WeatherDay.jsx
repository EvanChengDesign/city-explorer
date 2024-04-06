import React from 'react';
import { Card } from 'react-bootstrap';

const WeatherDay = ({ forecast }) => (
  <Card style={{ marginBottom: '1rem' }}>
    <Card.Body>
      <Card.Title>Date: {forecast.datetime}</Card.Title>
      <Card.Text> Min Temp: {forecast.min_temp}</Card.Text>
      <Card.Text> Max Temp: {forecast.max_temp}</Card.Text>
      <Card.Text>Description: {forecast.weather.description}</Card.Text>
    </Card.Body>
  </Card>
);

export default WeatherDay;