import React, { useState } from 'react';
import SearchForm from './SearchForm';
import LocationInfo from './LocationInfo';
import ErrorMessage from './ErrorMessage';


function App() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({});
  const [error, setError] = useState('');

  const accessToken = import.meta.env.VITE_LOCATION_API_KEY; 

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
      if (jsonData.error) {
        setError("That's not a real city! Check the spelling!");
        setLocation({});
      } else {
        let locationData = jsonData[0];
        setLocation(locationData);
        setError('');
      }
    } catch(error) {
      console.error("Error getting location information", error);
      setError("Error getting location information");
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <SearchForm setCity={setCity} getLocation={getLocation} />
          {error && <ErrorMessage message={error} />}
          {location.display_name && <LocationInfo location={location} accessToken={accessToken} />}
        </div>
      </div>
    </div>
  );
}

export default App;