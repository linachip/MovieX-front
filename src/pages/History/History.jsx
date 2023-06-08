import React, { useEffect, useState } from "react";
import axios from "axios";
import "./History.css";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const History = () => {
  const [history, setHistory] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const apiKey = "8b853ea22b2da094a00861a8d60da1e6";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4040/history?token=${token}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          }
        );
        // const token = response.headers.authorization;
        // sessionStorage.setItem("accessToken", token);
        const data = response.data;
        if (data.history) {
          setHistory(data.history);
        }
      } catch (error) {
        console.error("Error retrieving user history:", error);
      }
      // }
    };

    fetchUserData();
  }, []);

  // useEffect(() => {
  //   const fetchMovieData = async () => {
  //     if (history.length > 0) {
  //       const requests = history.map((item) =>
  //         axios.get(
  //           `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${item}`
  //         )
  //       );
  //       try {
  //         const responses = await Promise.all(requests);
  //         const movieData = responses
  //           .map((response) => {
  //             const result = response.data.results[0];
  //             return result ? result : null;
  //           })
  //           .filter((r) => !!r);
  //         setMovieData(movieData);
  //         setIsLoading(false);
  //       } catch (error) {
  //         console.error("Error retrieving movie data:", error);
  //         setIsLoading(false);
  //       }
  //     } else {
  //       setMovieData([]);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchMovieData();
  // }, [history, apiKey]);










  useEffect(() => {
    const fetchMovieData = async () => {
      if (history.length > 0) {
        const requests = history.map((item) =>
          axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${item}`
          )
        );
        try {
          const responses = await Promise.all(requests);
          const movieData = responses
            .map((response) => {
              const result = response.data.results[0];
              if (result && Object.keys(result).length > 0) {
                return result;
              }
              return null;
            }).filter((item) => item !== null && item !== undefined);
            
            
          setMovieData(movieData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error retrieving movie data:", error);
          setIsLoading(false);
        }
      } else {
        setMovieData([]);
        setIsLoading(false);
      }
    };
  
    fetchMovieData();
  }, [history, apiKey]);
  

  return (
    <div className="history-grid">
      <h2>History</h2>
      {movieData.length > 0 && (
        <div className="movie-grid">
          {movieData.map((movie, index) => (
            <div key={index} className="movie-card">
              {movie && movie.poster_path && (
                <>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    className="movie-poster"
                    alt="Movie Poster"
                  />
                  <span>{movie.title}</span>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      {movieData.length === 0 && (
        <div className="history-noresult">
          <SentimentVeryDissatisfiedIcon style={{ fontSize: "70px" }} />
          <p>No search history found</p>
        </div>
      )}
    </div>
  );
};

export default History;
