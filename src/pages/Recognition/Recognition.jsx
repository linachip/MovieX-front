import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../../components/home/MovieCard";
import { Button } from "@mui/material";
import "./Recognition.css";
import Pagination from "@mui/material/Pagination";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const SearchButton = {
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  fontWeight: 800,
  fontFamily: "Inter",
  padding: "16px 50px",
  border: "none",
  borderRadius: "5px",
  lineHeight: 1.5,
  backgroundColor: "#ff0000",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#000",
  },
};

const Recognition = (props) => {
  const [phrase, setPhrase] = useState("");
  const [results, setResults] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searched, setSearched] = useState(false);
  const resultsPerPage = 5;

  const totalPages = Math.ceil(results.length / resultsPerPage);

  const currentResults = results.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePhraseChange = (e) => {
    setPhrase(e.target.value);
    setSearched(false);
  };

  const handleSearch = async () => {
    try {
      setResults([]); // Reset search results
      const response = await axios.post("http://localhost:4040/reco", {
        phrase,
        userId: props.userId,
      });

      if (response.data.length > 0) {
        const movies = response.data;
        const moviesWithDetails = await fetchMovieDetails(movies);
        setResults(moviesWithDetails);
      }

      setSearched(true); // Set searched state to true
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMovieDetails = async (movies) => {
    const API_KEY = "8b853ea22b2da094a00861a8d60da1e6";
    try {
      const moviesWithDetails = await Promise.all(
        movies.map(async (movie) => {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${movie}&page=1&include_adult=false`
          );

          if (response.data.results.length > 0) {
            const result = response.data.results[0];
            const title = result.title;
            const posterPath = result.poster_path;
            const description = result.overview;
            const genreIds = result.genre_ids;
            const popularity = result.popularity;

            if (posterPath) {
              const imageUrl = `https://image.tmdb.org/t/p/w200${posterPath}`;
              const genreNames = await fetchGenreNames(genreIds);

              return {
                ...movie,
                posterUrl: imageUrl,
                title,
                description,
                genreIds,
                genres: genreNames,
                popularity,
              };
            }
          }

          return {
            ...movie,
            posterUrl: null,
            description: "",
            genreIds: [],
            genres: [],
            popularity: 0,
          };
        })
      );

      const sortedMovies = moviesWithDetails
        .filter((movie) => movie.popularity > 0)
        .sort((a, b) => b.popularity - a.popularity);

      return sortedMovies;

      // return moviesWithDetails;
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  const fetchGenreNames = async (genreIds) => {
    const API_KEY = "8b853ea22b2da094a00861a8d60da1e6";
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );

      const genreNames = genreIds.map((genreId) => {
        const genre = response.data.genres.find(
          (genre) => genre.id === genreId
        );
        return genre ? genre.name : "";
      });

      return genreNames;
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const API_KEY = "8b853ea22b2da094a00861a8d60da1e6";
        const recommendedMovies = [];

        const genreIds = results.flatMap((movie) => movie.genreIds);
        const uniqueGenreIds = [...new Set(genreIds)];

        for (let i = 0; i < Math.min(uniqueGenreIds.length, 2); i++) {
          const genreId = uniqueGenreIds[i];
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=1&include_adult=false`
          );

          if (response.data.results.length > 0) {
            const results = response.data.results.slice(0, 5);
            const moviesWithDetails = await fetchMovieDetails(
              results.map((movie) => movie.title)
            );
            recommendedMovies.push({ genreId, movies: moviesWithDetails });
          }
        }

        setRecommendedMovies(recommendedMovies);
      } catch (error) {
        console.error(error);
      }
    };

    if (results.length > 0) {
      fetchRecommendedMovies();
    } else {
      setRecommendedMovies([]); // Clear recommended movies if there are no search results
    }
  }, [results]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Trigger the search action
    }
  };

  return (
    <div>
      <div className="centered-top">
        <input type="text" value={phrase} placeholder="Type your phrase" onChange={handlePhraseChange} onKeyDown={handleKeyDown}/>
        <Button sx={SearchButton} onClick={handleSearch}>
          Search
        </Button>
      </div>

      <div
        className={`search-container ${
          results.length === 0 ? "no-results" : ""
        }`}
      >
        {results.length > 0 && (
          <ul>
            <div className="movie-grid">
              {currentResults.map((movie, index) => (
                <li key={index} className="movie-card">
                  <MovieCard
                    poster={movie.posterUrl}
                    className="movie-poster"
                    overview={movie.description}
                  />
                  <div className="movie-title">{movie.title}</div>
                  <div className="movie-genre">
                    <p>Genres: {movie.genres.join(", ")}</p>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        )}

        {results.length === 0 && searched && (
          <div className="no-results-container">
            <SentimentVeryDissatisfiedIcon style={{ fontSize: "70px" }} />
            <div className="no-results-message">Sorry, no results found</div>
          </div>
        )}

        {results.length > 0 && (
          <div className="pagination">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => handlePageChange(page)}
              color="secondary"
            />
          </div>
        )}

        {recommendedMovies.length > 0 && results.length > 0 && (
          <div>
            <h2>Recommended Movies</h2>
            <ul>
              <div className="reco-grid">
                {recommendedMovies[1].movies.map((movie, movieIndex) => (
                  <li key={movieIndex} className="reco-card">
                    <MovieCard
                      poster={movie.posterUrl}
                      overview={movie.description}
                    />
                    <div className="movie-title">{movie.title}</div>
                  </li>
                ))}
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recognition;

