import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';
import MovieList from '../movies/movies';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const PlayerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform: scale(1.9); /* Adjust scale factor as needed to zoom in */
`;
const Content = styled.div`
  position: absolute;
  bottom: 20px; /* Position it at the bottom */
  left: 20px;
  z-index: 1;
  color: white;
  max-width: 300px; /* Adjust as needed */
`;

const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 40%; /* Width of the gradient */
  background: rgb(253,217,29);
background: -moz-linear-gradient(90deg, rgba(253,217,29,1) 70%, rgba(253,217,29,1) 80%, rgba(252,176,69,0) 100%);
background: -webkit-linear-gradient(90deg, rgba(253,217,29,1) 70%, rgba(253,217,29,1) 80%, rgba(252,176,69,0) 100%);
background: linear-gradient(90deg, rgba(253,217,29,1) 70%, rgba(253,217,29,1) 80%, rgba(252,176,69,0) 100%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fdd91d",endColorstr="#fcb045",GradientType=1);
  opacity: 0.8; /* Adjust opacity as needed */
`;

// const TextContainer = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   z-index: 2;
//   max-width: 600px;
//   padding: 20px;
//   color: white;
// `;

const App = () => {
  const [movie, setMovie] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = 'f6d36519794929adbee7ea8ae79ede45';
        const baseUrl = 'https://api.themoviedb.org/3';


        const popularResponse = await axios.get(`${baseUrl}/movie/popular`, {
          params: { api_key: apiKey, language: 'en-US', page: 1 }
        });
        setPopularMovies(popularResponse.data.results);


        const latestResponse = await axios.get(`${baseUrl}/movie/now_playing`, {
          params: { api_key: apiKey, language: 'en-US', page: 1 }
        });
        setLatestMovies(latestResponse.data.results);

       
        const recommendedResponse = await axios.get(`${baseUrl}/movie/popular`, {
          params: { api_key: apiKey, language: 'en-US', page: 1 }
        });
        setRecommendedMovies(recommendedResponse.data.results);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();

  }, []);

  return (
    <div className="homepage">
    
      <div className="hero">
      <video autoPlay muted loop className="hero-video">
        <source src="https://website-static.plex.tv/videos/home_hero_background_2023.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="overlay" data-overlay></div>
  
      <div className="container">
        <div className="hero-content">
          <h1 className="h1 hero-title">
            Unlimited <strong>Movies</strong>,<br /> TVs Shows, & More.
          </h1>

          <div className="meta-wrapper">
            <div className="badge-wrapper">
              <div className="badge badge-fill">PG 18</div>
              <div className="badge badge-outline">HD</div>
            </div>

            <div className="date-time">
              <div>
                <ion-icon name="calendar-outline"></ion-icon>
                <time dateTime="2024">   Est 2024</time>
              </div>
              <div>
                <ion-icon name="time-outline"></ion-icon>
                <time dateTime="PT128M">8000 minutes</time>
              </div>
            </div>
          </div>

          <button className="btn btn-primary">
            <ion-icon name="play"></ion-icon>
            <span>Watch now</span>
          </button>

        </div>
      </div>
    </div>



      <MovieList title="Popular Movies" movies={popularMovies} />


      <MovieList title="Latest Releases" movies={latestMovies} />

 
      <MovieList title="Recommended for You" movies={recommendedMovies} />


    </div>
  );
};

export default App;
