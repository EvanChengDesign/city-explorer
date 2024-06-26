import React, { useState } from 'react';
import './App.css';
import SearchForm from './SearchForm';
import LocationInfo from './LocationInfo';
import ErrorMessage from './ErrorMessage';
import Weather from './Weather';
import Movies from './Movies.jsx'; 



function App() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({});
  const [weatherData, setWeatherData] = useState ([]);
  //const [movieData, setMovieData] = useState ([]);
  const [error, setError] = useState('');
  const [movieData, setMovieData] = useState({ movies: [], timestamp: '' });


  const accessToken = import.meta.env.VITE_LOCATION_API_KEY;
  const Domain = import.meta.env.VITE_DOMAIN;
  
  //${Domain}/movies?city=${city}`
  //https://city-explorer-api-4bxx.onrender.com//movies?location=${city} movieURL

  async function getMovie(lat, lon) {
    let movieUrl = `https://city-explorer-api-4bxx.onrender.com/movies?city=${city}`;
    //let movieUrl = `${Domain}/movies?city=${city}`;
    console.log(movieUrl);
    try {
      let response = await fetch(movieUrl);
      let jsonData = await response.json();
      if (response.ok) {
        setMovieData(jsonData); 
        console.log(jsonData);
        setError('');
      } else {
        setError('Failed to fetch movie data');
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setError("Error fetching movie data");
    }
  }
  //${Domain}/weather?location=${city}`
  //https://city-explorer-api-4bxx.onrender.com/weather?city=${city} weatherURL 

  async function getWeather(lat, lon) {
    let weatherUrl = `https://city-explorer-api-4bxx.onrender.com/weather?city=${city}`;
    //let weatherUrl = `${Domain}/weather?location=${city}`
    console.log(weatherUrl);
    try {
      let response = await fetch(weatherUrl);
      let jsonData = await response.json();
      if (response.ok) {
        setWeatherData(jsonData); 
        console.log(jsonData);
        console.log(jsonData[0].weather.description);
        setError('');
      } else {
        setError('Failed to fetch weather data');
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data");
    }
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
        setMovieData([]); // Make sure to clear movie data on error as well
      } else {
        setLocation(locationData);
        setError('');
        getWeather(locationData.lat, locationData.lon);
        getMovie(locationData.lat, locationData.lon); // Now calling getMovie as well
      }
    } catch(error) {
      console.error("Error getting location information", error);
      setError("Error getting location information");
      setWeatherData([]);
      setMovieData([]); // Make sure to clear movie data on error as well
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
          {movieData.movies && movieData.movies.length > 0 && <Movies movies={movieData.movies} />}

        </div>
      </div>
    </div>
  );
}

export default App;
