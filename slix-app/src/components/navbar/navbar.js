import React, { useState, useEffect } from 'react';
import './navbar.css';
import Input from '@mui/joy/Input';
import { useNavigate } from 'react-router-dom';
import {Link, NavLink } from 'react-router-dom';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value) { 
      fetchSearchResults(event.target.value);
    } else {
      setSearchResults([]);
    }
  };

  const fetchSearchResults = async (query) => {
    
    const url = `https://api.themoviedb.org/3/search/movie?api_key=f6d36519794929adbee7ea8ae79ede45&query=${query}&language=en`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setSearchResults(data.results.slice(0, 3));
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='navbar'>
      <a href='/'><img className='logo' src="https://svgshare.com/i/17WS.svg" alt="Slix Logo" height={40}/></a>
      <ul className='navitems'>
        <li><a href='/'>Home</a></li>
        <li>Genres</li>
        <li><a href='/movies'>Movies</a></li>
        <li><NavLink to='/tvShows'>TV Shows</NavLink></li>
        <li><a href='/actors'>Actors</a></li>
      </ul>
      <div className='search-switch'>
        <input 
          type='text' 
          size="md" 
          className='searchbox' 
          placeholder='Search' 
          variant="outlined" 
          value={searchTerm} 
          onChange={handleSearchChange}
          onClick={handleDropdownClick}
        />
        {showDropdown && ( 
          <div className="search-results">
            {searchResults.map((movie) => (
              <div 
                key={movie.id} 
                className="search-result"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="search-result-poster" />
                <div className="search-result-info">
                  <h3 className="search-result-title">{movie.title}</h3>
                  <p className="search-result-year">{movie.release_date.slice(0, 4)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;