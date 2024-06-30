
import React from 'react';
import MovieCard from '../../components/moviecard/moviecard';
import './movies.css';
import { Link } from 'react-router-dom';


const MovieSlider = ({ title, movies }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-slider">
        <h2 className="slider-title">{title}</h2>
  
      </div>
    );
  }

  return (

    <div className="movie-slider">
      <div className="slider-header">
        <h2 className="slider-title">{title}</h2>
      </div>
      <div className="slider-container">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`}>
          <MovieCard key={movie.id} movie={movie} />
          </Link>
         
          
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
