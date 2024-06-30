import axios from 'axios';

const API_BASEURL = 'https://api.themoviedb.org/3';

 const api = axios.create({
   baseURL: API_BASEURL,
   params: {
     api_key: "f6d36519794929adbee7ea8ae79ede45",
  },
});
export const apiKey = process.env.REACT_APP_TMDB_API_KEY;

export const fetchPopularMovies = async () => {
    try {
      const response = await fetch(`${API_BASEURL}/movie/popular?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return [];
    }
}
export const fetchMovieVideos = async (movieId) => {
    try {
      const response = await fetch(`${API_BASEURL}/movie/${movieId}/videos?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching movie videos:', error);
      return [];
    }
 };
export const fetchLatestMovie = async () => {
    const response = await fetch(`${API_BASEURL}/movie/latest?api_key=${apiKey}`);
    const data = await response.json();
    return data;
};
  

export const fetchGenres = async () => {
  const response = await axios.get('/genre/movie/list');
  return response.data.genres;
};

export const fetchMovies = async (category) => {
  const response = await axios.get(`/movie/${category}`);
  return response.data.results;
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`/movie/${id}`, {
    params: {
      append_to_response: 'videos,credits',
    },
  });
  return response.data;
};

export const fetchPopularActors = async () => {
  const response = await axios.get('/person/popular');
  return response.data.results;
};

export const fetchActorDetails = async (id) => {
  const response = await axios.get(`/person/${id}`);
  return response.data;
};

export const fetchPopularTVShows = async () => {
  try {
    const response = await fetch(`${API_BASEURL}/tv/popular?api_key=${api}`);
    if (!response.ok) {
      throw new Error('Failed to fetch popular TV shows');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    return [];
  }
};

export const fetchTopRatedTVShows = async () => {
  try {
    const response = await fetch(`${API_BASEURL}/tv/top_rated?api_key=${api}`);
    if (!response.ok) {
      throw new Error('Failed to fetch top rated TV shows');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching top rated TV shows:', error);
    return [];
  }
};

export const fetchAiringTodayTVShows = async () => {
  try {
    const response = await fetch(`${API_BASEURL}/tv/airing_today?api_key=${api}`);
    if (!response.ok) {
      throw new Error('Failed to fetch TV shows airing today');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching TV shows airing today:', error);
    return [];
  }
};

export const fetchTVShowDetails = async (tvShowId) => {
  try {
    const response = await fetch(`${API_BASEURL}/tv/${tvShowId}?api_key=${api}`);
    if (!response.ok) {
      throw new Error('Failed to fetch TV show details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    return null;
  }
};

export const getMoviesBySearch = async (searchTerm) => {
  const response = await axios.get('/search/movie', {
    params: {
      query: searchTerm,
    },
  });
  return response.data.results;
  console.table(response.data.results);
}

