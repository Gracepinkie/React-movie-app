import React from 'react';
import './infoCom.css'; 
import gadgets from '../../assets/a-5.png';

const InfoComponent = () => {
  return (
    <div className="info-container">
      <div className="info">
        <h1 className="card-title">Enjoy <span className='appName'> Slix </span> on TV,Phone and tablet</h1>
        {/* <p className="card-subtitle">
          Watch on Start TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray
          players, and more.
        </p> */}
        <img
          src={gadgets}
          alt=""
        />
      </div>

      <div className="tv-container">
        <img
          src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
          alt=""
        />
        <video autoPlay playsInline muted loop>
          <source
            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-in-0819.m4v"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

export default InfoComponent;



