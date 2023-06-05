import React from "react";
import './MovieCard.css';

const MovieCard = ({title, poster, overview}) => {
  return (
    <>
    <div className="movie-container">
      <div > 
          <img className="movie_img" src={ poster} alt="movie" />
          <div className="movie-details">
            <h2 className="movie-title">{title}</h2>
            <p className="movie-overview">{overview}</p>
          </div>
      </div>
    </div>
    </>
  );
};

export default MovieCard;