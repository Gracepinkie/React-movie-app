import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/moviecard/moviecard';
import '../movies/moviepage.css';
import { Link } from 'react-router-dom';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('top_rated'); 

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${selectedCategory}?api_key=f6d36519794929adbee7ea8ae79ede45`
      );
      setMovies(response.data.results);
      console.log(movies)
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <h1>Movies Page</h1>
      <div>
        <label htmlFor="category">Select Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="top_rated">Top Rated</option>
          <option value="popular">Popular</option>
          <option value="latest">Latest</option>
          <option value="now_playing">Now Playing</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>
      <div>
        <h2>{selectedCategory === 'top_rated' ? 'Top Rated Movies' : selectedCategory === 'popular' ? 'Popular Movies' : selectedCategory === 'latest' ? 'Latest Movies' : selectedCategory === 'now_playing' ? 'Now Playing Movies' : 'Upcoming Movies'}</h2>
        <ul className='moviesul'>
          {movies.map((movie) => (
            // <li key={movie.id}>{movie.title}</li>
            <Link to={`/movie/${movie.id}`}>
              <MovieCard key={movie.id} movie={movie} />
            {/* <MovieCard movie={movie} /> */}
            </Link>
          

          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoviesPage;
