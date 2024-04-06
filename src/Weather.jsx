import React from 'react';
import WeatherDay from './WeatherDay';

const Weather = ({ forecasts }) => {
  return (
    <div>
      {forecasts.map((forecast, index) => (
        <WeatherDay key={index} forecast={forecast} />
      ))}
    </div>
  );
};

export default Weather;

