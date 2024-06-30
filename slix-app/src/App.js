
import { BrowserRouter as Router, Link , Routes , Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import InfoCom from './components/infocomponents/infoCom'
import TVShows from './pages/tvShows/tvShows';
import Home from './pages/homepage/home';
import Movies from './pages/movies/movies'; 
import Actors from './pages/Actors/Actors'; 
import Footer from './components/footer/footer'; 
import Navbar from './components/navbar/navbar';
import MovieDetails from './pages/movies/MovieDetails';
import MoviesPage from './pages/movies/MoviesPage';
import TopRatedMovies from './components/moviecard/topRated';
import PopularMovies from './components/moviecard/Popular';

// import GenreDropdown from './components/navbar/Dropdown';

function App() {
  return (
    <Router>
      <Navbar />
      {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/MoviePage">Movies</Link>
            </li>
          </ul>
        </nav> */}
      <div className="App"> 

        <Routes>
          <Route path="/" element={<div><Home /> <Movies /></div>} />
          <Route path="/genre/:id" element={<Movies />} />
          {/* <Route path="/movies" element={<Movies />} />  */}
          <Route path="/actors" element={<Actors />} /> 
          <Route path="/movie/:id" element={<MovieDetails />} /> 
          <Route path="/movies" element={<MoviesPage />} /> 
          <Route path="/tvShows" element={<TVShows />} />
          <Route path="/moviecard/toprated" component={TopRatedMovies} />
          <Route path="/moviecard/Popular" component={PopularMovies} />
         
        </Routes>
      </div>
      
      <InfoCom /> 
      <Footer />
    </Router>
  );
}

export default App;
