
import React, { useState } from 'react';
import './moviecard.css'; 

const MovieCard = ({ movie }) => {
  const [expanded, setExpanded] = useState(false);

  if (!movie) {
    return null; 
  }

 
  const releaseDate = new Date(movie.release_date);
  const formattedReleaseDate = releaseDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  
  const genres = movie.genres ? movie.genres.map((genre) => genre.name).join(', ') : 'Genre not available';


  const runtimeHours = Math.floor(movie.runtime / 60);
  const runtimeMinutes = movie.runtime % 60;
  const runtime = `${runtimeHours}h ${runtimeMinutes}m`;

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="movie-card" onClick={toggleExpand}>
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <div className={`movie-info ${expanded ? 'expanded' : ''}`}>
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-release-date">Release Date: {formattedReleaseDate}</p>
         <p className="movie-runtime">Runtime: {runtime}</p> 
        <p className="movie-genres">Genres: {genres}</p>
        <p className="movie-rating">Rating: {movie.vote_average}/10</p>
        {/* <p className="movie-overview">{movie.overview}</p>  */}
      </div>
    </div>
  );
};

export default MovieCard;

