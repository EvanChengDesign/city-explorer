import React from 'react';

const Movie = ({ movie }) => (
  <div className="movie">
    <h3>{movie.title}</h3>
    <p>{movie.overview}</p>
    <img src={movie.image_url} alt={`Poster for ${movie.title}`} />
    <p>Average Votes: {movie.average_votes}</p>
    <p>Total Votes: {movie.total_votes}</p>
    <p>Popularity: {movie.popularity}</p>
    <p>Released On: {movie.released_on}</p>
  </div>
);

export default Movie;