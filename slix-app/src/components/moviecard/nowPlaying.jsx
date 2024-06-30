import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './moviecard.css'

const NowPlaying = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/now_playing', 
          {
            params: {
              api_key: 'f6d36519794929adbee7ea8ae79ede45', 
              language: 'en-US',
              page: 1,
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching now playing movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Now Playing</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie">
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NowPlaying;
