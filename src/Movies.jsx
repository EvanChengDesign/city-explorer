import React from 'react';
import Movie from './Movie';

function Movies({ movies }) {
    return (
      <div>
        <h2>Movies</h2>
        <div>
          {movies.map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </div>
      </div>
    );
}

export default Movies;
