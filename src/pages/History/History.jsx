import React, { useEffect, useState } from "react";
import axios from "axios";
import "./History.css";

const History = () => {
  const [history, setHistory] = useState([]);
  const [movieData, setMovieData] = useState([]);

  const userId = localStorage.getItem("userId");
  const apiKey = "8b853ea22b2da094a00861a8d60da1e6";

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:4040/history?userId=${userId}`)
        .then((response) => {
          const data = response.data;
          if (data.history) {
            setHistory(data.history);
          }
        })
        .catch((error) => {
          console.error("Error retrieving user history:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (history.length > 0) {
      const fetchMovieData = async () => {
        const requests = history.map((item) =>
          axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${item}`)
        );
        try {
          const responses = await Promise.all(requests);
          const movieData = responses.map((response) => {
            const result = response.data.results[0];
            return result ? result : null;
          });
          setMovieData(movieData);
        } catch (error) {
          console.error("Error retrieving movie data:", error);
        }
      };

      fetchMovieData();
    }
  }, [history, apiKey]);

  return (
    <div className="history-grid">
      <h2>History</h2>
      {movieData.length > 0 ? (
        <div className="movie-grid">
          {movieData.map((movie, index) => (
            <div key={index} className="movie-card">
              {movie && movie.poster_path && (
                <>
                  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} className="movie-poster" alt="Movie Poster" />
                  <span>{movie.title}</span>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No search history found</p>
      )}
    </div>
  );
};

export default History;

