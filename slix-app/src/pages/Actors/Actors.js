
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Actors.css'

const ActorsListPage = () => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/person/popular', {
          params: {
            api_key: 'f6d36519794929adbee7ea8ae79ede45',
          },
        });
        setActors(response.data.results);
      } catch (error) {
        console.error('Error fetching actors:', error);
      }
    };

    fetchActors();
  }, []);

  return (
    <div className="actors-list-page">
      <h1>Popular Actors</h1>
      <div className="actors-carousel">
        {actors.map(actor => (
          <div key={actor.id} className="actor-card">
            <Link to={`/actors/${actor.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt={actor.name}
                className="actor-image"
              />
              <div className="actor-info">
                <h3>{actor.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorsListPage;

