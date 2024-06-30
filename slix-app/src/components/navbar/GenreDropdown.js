// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const GenreDropdown = () => {
//   const [genres, setGenres] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchGenres = async () => {
//       const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
//       const options = {
//         method: 'GET',
//         headers: {
//           accept: 'application/json',
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWExYWNkNGUyZDQ0YWI3NTg5MTdiMGY3ODBjZjM5OCIsInN1YiI6IjYyNmZjYTQyZDEzMzI0MTEzZjlhZDdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UGzimJl9cKseQ3C25boUO4fgpc8SdJOhAjO-Wh2HhJ8'
//         }
//       };

//       try {
//         const response = await fetch(url, options);
//         const data = await response.json();
//         setGenres(data.genres);
//       } catch (error) {
//         console.error('Error fetching genres:', error);
//       }
//     };

//     fetchGenres();
//   }, []);

//   const handleGenreChange = (event) => {
//     const selectedGenreId = event.target.value;
//     navigate(`/genre/${selectedGenreId}`);
//   };

//   return (
//     <select onChange={handleGenreChange}>
//       <option value="">Select a Genre</option>
//       {genres.map((genre) => (
//         <option key={genre.id} value={genre.id}>
//           {genre.name}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default GenreDropdown;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../movies/movieCard';
// import './Genre.css';

const Genre = () => {
  const { genreId } = useParams(); 
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(genreId || '');

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie',
          {
            params: {
              api_key: 'f6d36519794929adbee7ea8ae79ede45', 
              with_genres: genreId,
            },
          }
        );
        
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies by genre:', error);
        setError('Error fetching movies. Please try again later.');
        setLoading(false);
      }
    };

    fetchGenre();
  }, [genreId]);
  
  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="movies-by-genre">
      <h2 >Movies in Genre: {genreId}</h2>
      <div className='movies-list'>
      {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        </div>     
       </div>
     );
   };
   
   export default Genre;