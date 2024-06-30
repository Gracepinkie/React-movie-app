import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './searchpage.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

async function getResultsBySearch(searchTerm) {
  if (searchTerm.trim() === '') {
    return [];
  }

  const apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=f6d36519794929adbee7ea8ae79ede45&query=${searchTerm}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log('data:', data);
  return data.results;
}

function SearchPage() {
  const query = useQuery();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(query.get('q') || ''); 

useEffect(() => {
  const fetchResults = async () => {
    console.log(`Fetching results for searchTerm: ${searchTerm}`);
    const results = await getResultsBySearch(searchTerm);
    console.table('Fetched results:', results);
    setResults(results);
    setLoading(false);
  };
  fetchResults();
}, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    navigate(`/search/?q=${event.target.value}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (searchTerm.trim() === '') {
    return (
      <div className='heading'>
        <h1 className='header'>Enter a Search Query</h1>
        <div  className="searchpage-input">
          <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search for movies, TV shows, or people..." />
        </div>
      </div>
    );
  }

  const moviesResults = results.filter(results => results.media_type === 'movie');
  const peopleResults = results.filter(results => results.media_type === 'person');
  const tvResults = results.filter(results => results.media_type === 'tv');

  return (
    <div className='heading'>
      <h1 className='header'>Search Results for "{searchTerm}"</h1>
      <div  className="searchpage-input">
      <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search for movies, TV shows, or people..." />
      </div>
      <div className='search-results'>
        <h2>Movies</h2>
        {moviesResults.length > 0 ? (
          <div className='results-container'>
            {moviesResults.map((movie) => {
              const imagePath = movie.poster_path;
              const imageURL = `https://image.tmdb.org/t/p/original${imagePath}`;

              return (
                <div key={movie.id} className="movie-card">
                  <div 
                    className="card-image"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(34,193,195,0) 0%, rgba(0,0,0,0.5382528011204482) 56%, rgba(0,0,0,0.7035189075630253) 68%, rgba(0,0,0,1) 84%), url(${imageURL})`,
                      backgroundSize: 'cover',
                      height: '300px'
                    }}
                  >
                    <h2 className="card-title" style={{ position: 'absolute', bottom: 0, left: 0, margin: 0, padding: '10px', color: 'white', textShadow: '2px 2px 4px black' }}>{movie.title}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No movies found.</p>
        )}

        <h2>People</h2>
        {peopleResults.length > 0 ? (
          <div className='results-container'>
            {peopleResults.map((person) => {
              const imagePath = person.profile_path;
              const imageURL = `https://image.tmdb.org/t/p/original${imagePath}`;

              return (
                <div key={person.id} className="person-card">
                  <div 
                    className="card-image"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(34,193,195,0) 0%, rgba(0,0,0,0.5382528011204482) 56%, rgba(0,0,0,0.7035189075630253) 68%, rgba(0,0,0,1) 84%), url(${imageURL})`,
                      backgroundSize: 'cover',
                      height: '300px'
                    }}
                  >
                    <h2 className="card-title" style={{ position: 'absolute', bottom: 0, left: 0, margin: 0, padding: '10px', color: 'white', textShadow: '2px 2px 4px black' }}>{person.name}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No people found.</p>
        )}

        <h2>TV Shows</h2>
        {tvResults.length > 0 ? (
          <div className='results-container'>
            {tvResults.map((tvShow) => {
              const imagePath = tvShow.poster_path;
              const imageURL = `https://image.tmdb.org/t/p/original${imagePath}`;

              return (
                <div key={tvShow.id} className="tv-card">
                  <div 
                    className="card-image"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(34,193,195,0) 0%, rgba(0,0,0,0.5382528011204482) 56%, rgba(0,0,0,0.7035189075630253) 68%, rgba(0,0,0,1) 84%), url(${imageURL})`,
                      backgroundSize: 'cover',
                      height: '300px'
                    }}
                  >
                    <h2 className="card-title" style={{ position: 'absolute', bottom: 0, left: 0, margin: 0, padding: '10px', color: 'white', textShadow: '2px 2px 4px black' }}>{tvShow.name}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No TV shows found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
