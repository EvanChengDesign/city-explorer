import React, { useState } from 'react';
import SearchForm from './SearchForm';
import LocationInfo from './LocationInfo';
import ErrorMessage from './ErrorMessage';
import Weather from './Weather';



function App() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({});
  const [weatherData, setWeatherData] = useState ([]);
  const [error, setError] = useState('');

  const accessToken = import.meta.env.VITE_LOCATION_API_KEY;


  async function getWeather(lat, lon) {
    let weatherUrl = `http://localhost:3000/weather?lat=${lat}&lon=${lon}&searchQuery=${city}`;
    // try {
      let response = await fetch(weatherUrl);
      let jsonData = await response.json();
      if (response.ok) {
        setWeatherData(jsonData); 
        setError('');
      } else {
        setError('Failed to fetch weather data');
      }
    // } catch(error) {
    //   console.error("Error getting weather information", error);
    //   setError("Error getting weather information");
    // }
  }

  async function getLocation() {
    if (!city) {
      setError("That's not a real city! Check the spelling!");
      setLocation({});
      return;
    }

    let url = `https://us1.locationiq.com/v1/search?key=${accessToken}&q=${city}&format=json`;
    try {
      let response = await fetch(url);
      let jsonData = await response.json();
      console.log(jsonData);
      console.log(jsonData[0]);
      let locationData = jsonData[0];

      if (locationData.error) {
        setError("That's not a real city! Check the spelling!");
        setLocation({});
        setWeatherData([]);
      } else {
        console.log(locationData);
        setLocation(locationData);
        setError('');
      }
      getWeather(locationData.lat, locationData.lon);

    } catch(error) {
      console.error("Error getting location information", error);
      setError("Error getting location information");
      setWeatherData([]);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <SearchForm setCity={setCity} getLocation={getLocation} />
          {error && <ErrorMessage message={error} />}
          {location.display_name && <LocationInfo location={location} accessToken={accessToken} />}
          {weatherData.length > 0 && <Weather forecasts={weatherData} />} 
        </div>
      </div>
    </div>
  );
}

export default App;