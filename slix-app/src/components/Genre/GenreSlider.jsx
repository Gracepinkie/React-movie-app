import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import '../../pages/tvShows/tvShows.css';

const GenreSlider = ({ genreId, genreName }) => {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
                    params: {
                        api_key:"f6d36519794929adbee7ea8ae79ede45",
                        with_genres: genreId
                    }
                });
                setShows(response.data.results);
            } catch (error) {
                console.error(`Error fetching ${genreName} shows:`, error);
            }
        };

        fetchData();
    }, [genreId, genreName]);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="genre-slider">
            <h2 className='tvheader'>{genreName}</h2>
            <Slider {...sliderSettings}>
                {shows.map(show => (
                    <div key={show.id}>
                        <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
                        <p>{show.name}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default GenreSlider;
