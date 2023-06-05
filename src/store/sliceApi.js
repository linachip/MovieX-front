import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { POPULAR, BASE_URL, SEARCH_URL } from '../utils';

export const movieApi = createApi({
  // This is a unique key that defines where the Redux store will store the cache
  reducerPath: 'movieApi', 
  // The baseQuery used by each endpoint to request data 
  // Here as its value, fetchBaseQuery, which allows to set the base URL to below endpoint
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4040/reco"}),
  // They query endpoints is used for reading data from the server
  endpoints: (builder) => ({
    // getPopularMovies: builder.query({
    //   query: () => POPULAR,
    // }),
    getSearchMovie: builder.query({
      query: () => ({
        url: "http://localhost:4040/reco"
      }),
    }),
  }),
});

export const { useLazyGetSearchMovieQuery } = movieApi;
