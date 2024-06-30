import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../../components/MovieCard'; 

const GenreMovies = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState('');

  useEffect(() => {
    const fetchGenreMovies = async () => {
      const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=en`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWExYWNkNGUyZDQ0YWI3NTg5MTdiMGY3ODBjZjM5OCIsInN1YiI6IjYyNmZjYTQyZDEzMzI0MTEzZjlhZDdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UGzimJl9cKseQ3C25boUO4fgpc8SdJOhAjO-Wh2HhJ8'
        }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setMovies(data.results);

        
        const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
        const genreResponse = await fetch(genreUrl, options);
        const genreData = await genreResponse.json();
        const foundGenre = genreData.genres.find(genre => genre.id === parseInt(id));
        if (foundGenre) {
          setGenreName(foundGenre.name);
        }
      } catch (error) {
        console.error('Error fetching genre movies:', error);
      }
    };

    fetchGenreMovies();
  }, [id]);

return (
  <div>
    <h2>Movies in Genre {genreName}</h2>
    <div className="movie-grid"> 
      {Array.isArray(movies) ? (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} /> 
        ))
      ) : (
        <p>No movies found</p>
      )}
    </div>
  </div>
);
};

export default GenreMovies;
