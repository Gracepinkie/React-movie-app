import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../utils/api";
import Slider from "react-slick";
import axios from "axios";
import { apiKey } from "../../utils/api";
import "./movieDetails.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [directorDetails, setDirectorDetails] = useState(null);
  const [writerDetails, setWriterDetails] = useState(null);
  const videoRef = useRef(null);
  const [cast, setCast] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [movieImages, setMovieImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]); // Renamed to similarMovies

  const PlayTrailer = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
      );

      const trailerVideo = response.data.results.find(
        (video) => video.type === "Trailer"
      );

      if (trailerVideo) {
        const key = trailerVideo.key;
        const videoUrl = `https://www.youtube-nocookie.com/embed/${key}?autoplay=1&controls=0&rel=0&modestbranding=1&vq=hd1080`;

        document.querySelector(".mainCard").style.backgroundImage = "none";
        document.querySelector(".trailer").style.display = "none";

        const video = document.createElement("iframe");
        video.src = videoUrl;
        video.width = "100%";
        video.height = "50%";
        video.style.position = "absolute";
        video.style.top = "0";
        video.style.left = "0";
        video.style.zIndex = "100";
        videoRef.current = video;
        document.body.appendChild(video);

        video.addEventListener("ended", () => {
          document.querySelector(
            ".mainCard"
          ).style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`;
          document.querySelector(".trailer").style.display = "block";
          document.body.removeChild(video);
        });
      } else {
        console.warn("No trailer video found for this movie.");
      }
    } catch (error) {
      console.error(`Error fetching movie data:`, error);
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=f6d36519794929adbee7ea8ae79ede45`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error(`Error fetching movie data:`, error);
      }
    };

    const fetchMovieImages = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/images?api_key=f6d36519794929adbee7ea8ae79ede45&language=en-US&include_image_language=null`
        );
        setMovieImages(response.data.backdrops.slice(0, 6));
      } catch (error) {
        console.error(`Error fetching movie images:`, error);
      }
    };

    fetchMovieImages();

    const fetchMovieReviews = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=f6d36519794929adbee7ea8ae79ede45`
    );
    setReviews(response.data.results.slice(0, 6));
  } catch (error) {
    console.error(`Error fetching movie reviews:`, error);
  }
};
    

    fetchMovieReviews();

const fetchSimilarMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=f6d36519794929adbee7ea8ae79ede45&page=1&language=en-US`
    );
    const language = movieDetails ? movieDetails.original_language : 'en'; // Assuming 'en' as a default
const filteredAndSortedMovies = response.data.results
  .filter(movie => movie.original_language === language)
  .sort((a, b) => {
    if (a.popularity > b.popularity) return -1;
    if (a.popularity < b.popularity) return 1;
    return new Date(b.release_date) - new Date(a.release_date);
  })
  .slice(0, 5);

setSimilarMovies(filteredAndSortedMovies);
  } catch (error) {
    console.error(`Error fetching movie data:`, error);
    return <p className="error">Error displaying similar movies</p>;

  }
};

    const fetchMovieCredits = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=f6d36519794929adbee7ea8ae79ede45`
        );
        const director = response.data.crew.find(
          (member) => member.job === "Director"
        );
        setDirectorDetails(director);
        const writer = response.data.crew.find(
          (member) => member.department === "Writing"
        );
        setWriterDetails(writer);
      } catch (error) {
        console.error(`Error fetching movie credits:`, error);
      }
    };

    fetchMovieDetails(id);
    fetchMovieCredits(id);
    fetchSimilarMovies(); // Fetch similar movies
  }, [id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=f6d36519794929adbee7ea8ae79ede45`
    )
      .then((response) => response.json())
      .then((data) => setCast(data.cast.slice(0, 10)))
      .catch((error) => console.error("Error fetching cast data:", error));
  }, [id]);

  useEffect(() => {
    const wrapper = document.querySelector(".slider-wrapper");
    if (wrapper) {
      wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  const moveSlide = (step) => {
    setCurrentSlide((prev) => {
      let newSlide = prev + step;
      const totalSlides = cast.length;
      if (newSlide >= totalSlides) newSlide = 0;
      if (newSlide < 0) newSlide = totalSlides - 1;
      return newSlide;
    });
  };

  if (!movieDetails) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  const runtime = movieDetails?.runtime || 0;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const formattedBudget = movieDetails.budget.toLocaleString();
  const formattedRevenue = movieDetails.revenue.toLocaleString();

  console.log("movieImages array:", movieImages);

  return (
    <>
      <div
        className="mainCard"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          width: "100vw",
        }}
      >
        {/* <div className="trailer">
          <img
            className="player"
            width="100"
            height="100"
            src="https://img.icons8.com/ios-filled/500/ffffff/circled-play.png"
            alt="circled-play"
            onClick={PlayTrailer}
          />
        </div> */}
      </div>
      <div className="maininfo">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
            alt={movieDetails.title}
            height={360}
            className="poster"
          />
          <div className="sechead">
            <h3>Budget</h3>
            <p>$ {formattedBudget}</p>
          </div>
          <div className="sechead">
            <h3>Revenue</h3>
            <p>$ {formattedRevenue}</p>
          </div>
        </div>
        <div className="container">
          <div className="mainCardContent">
            <div className="mainInline">
              <h1 className="moviesName">{movieDetails.original_title}</h1>
              <div className="genre-buttons">
                {movieDetails.genres.map((genre) => (
                  <button
                    key={genre.id}
                    className="movieGenres"
                    onClick={() => {
                      window.location.href = `/genre/${genre.name
                        .toLowerCase()
                        .replace(/ /g, "-")}`;
                    }}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
              <p className="movieTagline">
                {movieDetails.release_date} • {hours} hr {minutes} min
              </p>
            </div>
            <div className="mainInline2">
              <p>
                {movieDetails.vote_average.toFixed(1)}/10 | {movieDetails.vote_count} votes
              </p>
              {/* <button className="rateButton">Rate this</button> */}
            </div>
          </div>
          <div className="info">
            <p className="movieTagline">"{movieDetails.tagline}"</p>
            <p>{movieDetails.overview}</p>
            <div className="credits">
              {directorDetails && (
                <p>
                  Directed by:{" "}
                  <a
                    href={`/person/${directorDetails.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {directorDetails.name}
                  </a>
                </p>
              )}
              {writerDetails && (
                <p>
                  Written by:{" "}
                  <a
                    href={`/person/${writerDetails.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {writerDetails.name}
                  </a>
                </p>
              )}
            </div>
            <div className="cast">
              <h2 className="header">Cast</h2>
              <div className="slider-container">
                <div className="actors-container">
                  {cast.map((cast, index) => (
                    <Link
                      to={`/person/${cast.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        className="slide"
                        key={index}
                        style={{
                          backgroundImage: `url(https://image.tmdb.org/t/p/original${
                            cast.profile_path ||
                            "https://svgshare.com/i/17VH.svg"
                          })`,
                        }}
                      >
                        <p className="actorname">
                          {cast.name} as {cast.character}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="movie-images-container">
              <h2 className="header">Images</h2>
              <div className="slider-container">
                <div className="images-container">
                  {movieImages.map((image, index) => (
                    <div
                      className="image-slide"
                      key={index}
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${image.file_path})`,
                        backgroundSize: "cover",
                        height: "200px",
                        width: "400px",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="movie-images-container">
              <h2 className="header">Reviews</h2>
              <div className="reviews-container">
                {reviews.map((review, index) => (
                  <div key={index} className="review-card">
                    <div className="review-author">
                      <img
                        src={
                          review.author_details.avatar_path
                            ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`
                            : "https://i.imgur.com/Ww55lN5.png"
                        }
                        alt={review.author_details.name}
                        className="review-avatar"
                      />
                    </div>
                    <div>
                      <p className="review-username">
                        @{review.author_details.username}
                      </p>
                    </div>
                    <div className="review-content">
                      <p>
                        {review.content.split(" ").slice(0, 16).join(" ") +
                          (review.content.split(" ").length > 16 ? "..." : "")}
                        <Link
                          to={`/movie/${id}/reviews`}
                          className="read-more"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <span className="arrow">→</span>
                        </Link>
                      </p>
                    </div>
                    <div className="review-rating">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`star ${
                            i < review.author_details.rating ? "filled" : ""
                          }`}
                        ></span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="movie-images-container">
            <h2 className="header">More like this</h2>
            <div className="slider-container">
                <div className="similar-container">
                  {similarMovies.map((similarMovie, index) => (
                    <Link
                      to={`/movie/${similarMovie.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        className="similar-slide"
                        key={index}
                        style={{
                          backgroundImage: `url(https://image.tmdb.org/t/p/original${
                            similarMovie.backdrop_path
                          })`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <p className="similarname">{similarMovie.title}</p>
                      </div>
                    </Link>
                  ))}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;