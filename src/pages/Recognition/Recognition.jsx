import React, { useState, useEffect,useCallback } from "react";
import axios from "axios";
import MovieCard from "../../components/home/MovieCard";
import { Snackbar, Button} from '@mui/material';
import "./Recognition.css";


const SearchButton = {
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  fontWeight: 800,
  fontFamily: 'Inter',
  padding: '10px 60px',
  border: 'none',
  borderRadius: '5px',
  lineHeight: 1.5,
  backgroundColor: '#ff0000',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#000',
  },
};

const Recognition = (props) => {
  const [phrase, setPhrase] = useState("");
  const [results, setResults] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [error, setError] = useState('');

  const handlePhraseChange = (e) => {
    setPhrase(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:4040/reco", {
        phrase,
        userId: props.userId,
      });

      if (response.data.length > 0) {
        const movies = response.data;
        const moviesWithDetails = await fetchMovieDetails(movies);
        setResults(moviesWithDetails);
      } else {
        setError("No results found.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseSnackbar = () => {
    setError('');
  };

  const fetchMovieDetails = useCallback(async (movies) => {
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

              return { ...movie, posterUrl: imageUrl, title, description, genreIds, genres: genreNames, popularity };
            }
          }

          return { ...movie, posterUrl: null, description: "", genreIds: [], genres: [], popularity: 0 };
        })
      );

      const sortedMovies = moviesWithDetails.filter(movie => movie.popularity > 0).sort((a, b) => b.popularity - a.popularity);
  
      return sortedMovies;

      // return moviesWithDetails;
    } catch (error) {
      console.error(error);
    }
    return [];
  });

  const fetchGenreNames = async (genreIds) => {
    const API_KEY = "8b853ea22b2da094a00861a8d60da1e6";
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );

      const genreNames = genreIds.map((genreId) => {
        const genre = response.data.genres.find((genre) => genre.id === genreId);
        return genre ? genre.name : "";
      });

      return genreNames;
    } catch (error) {
      console.error(error);
    }
    return [];
  };
  

  useEffect(() => {
    if (results.length > 0) {
      const genreIds = results.flatMap((movie) => movie.genreIds);
      const uniqueGenreIds = [...new Set(genreIds)];
  
      const fetchRecommendedMovies = async () => {
        try {
          const API_KEY = "8b853ea22b2da094a00861a8d60da1e6";
          const recommendedMovies = [];
  
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
  
      fetchRecommendedMovies();
    }
  }, [fetchMovieDetails, results]);
  

  return (
    <div>
      <div className="centered-top">
      <input type="text" value={phrase} onChange={handlePhraseChange} />
      <Button sx={SearchButton} onClick={handleSearch}>Search</Button>
      <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={error}
          action={
            <Button color="secondary" size="small" onClick={handleCloseSnackbar}>Close</Button>
          }
          />
      </div>

      <div className="search-container">
      <ul>
        {results.map((movie, index) => (
          <li key={index}>
            <h3>{movie.title}</h3>
            {/* <p>{movie.popularity}</p> */}
            <MovieCard
              poster={movie.posterUrl}
              title={movie.title}
              overview={movie.description}
            />
            <p>Genres: {movie.genres.join(", ")}</p>
          </li>
        ))}
      </ul>
  
      {recommendedMovies.length > 1 && (
        <div>
          <h2>Recommended Movies</h2>
          <ul>
            {recommendedMovies[1].movies.map((movie, movieIndex) => (
              <li key={movieIndex}>
                <h3>{movie.title}</h3>
                <MovieCard poster={movie.posterUrl} title={movie.title} overview={movie.description} />
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
  
};

export default Recognition;
