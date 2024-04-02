import React from 'react';

function SearchForm({ setCity, getLocation }) {
  function handleNewCity(e) {
    setCity(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getLocation();
  }

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input 
        type="text" 
        className="form-control" 
        placeholder="Type a City Name" 
        onChange={handleNewCity} 
      />
    </form>
  );
}

export default SearchForm;