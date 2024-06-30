import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./actorDetails.css";

const ActorDetails = () => {
  const { id } = useParams();
  const [actorDetails, setActorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/${id}?api_key=f6d36519794929adbee7ea8ae79ede45`
        );
        setActorDetails(response.data);

        const imagesResponse = await axios.get(
          `https://api.themoviedb.org/3/person/${id}/images?api_key=f6d36519794929adbee7ea8ae79ede45`
        );
        setBackgroundImages(imagesResponse.data.profiles);
      } catch (error) {
        console.error(`Error fetching actor data:`, error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActorDetails();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundIndex((prevIndex) => 
        prevIndex + 1 >= backgroundImages.length ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading actor details.</div>;

  const birthday = new Date(actorDetails.birthday).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const backgroundImageUrl = backgroundImages.length > 0
    ? `https://image.tmdb.org/t/p/original${backgroundImages[currentBackgroundIndex].file_path}`
    : '';

  return (
    <div className="actor-details" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div><img src={`https://image.tmdb.org/t/p/original${actorDetails.profile_path}`} alt={actorDetails.name} /></div>
      <div>
      <p><strong>Biography:</strong> {actorDetails.biography}</p>
      <p><strong>Birthday:</strong> {birthday}</p>
      <p><strong>Known For:</strong> {actorDetails.known_for_department}</p>
      </div>
    </div>
  );
};

export default ActorDetails;