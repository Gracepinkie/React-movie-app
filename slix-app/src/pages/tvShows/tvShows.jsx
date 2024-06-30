import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GenreSlider from '../../components/Genre/GenreSlider';

const TV = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/genre/tv/list', {
                    params: {
                        api_key:"f6d36519794929adbee7ea8ae79ede45"
                    }
                });
                setGenres(response.data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            <h1 className='tvheader'>TV Shows</h1>
            {genres.map(genre => (
                <GenreSlider key={genre.id} genreId={genre.id} genreName={genre.name} />
            ))}
        </div>
    );
};

export default TV;

