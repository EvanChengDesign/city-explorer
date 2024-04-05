function Movies({ movies }) {
    return (
      <div>
        <h2>Movies</h2>
        <div>
          {movies.map((movie, index) => (
            <div key={index} className="movie">
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
              <img src={movie.image_url} alt={`Poster for ${movie.title}`} />
              <p>Average Votes: {movie.average_votes}</p>
              <p>Total Votes: {movie.total_votes}</p>
              <p>Popularity: {movie.popularity}</p>
              <p>Released On: {movie.released_on}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default Movies;