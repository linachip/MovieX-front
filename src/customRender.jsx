import React from 'react';
import PropTypes from 'prop-types';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { movieApi } from '../store/sliceApi';

function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        [movieApi.reducerPath]: movieApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware),
    }),
    ...renderOptions
  } = {},
) {
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  Wrapper.propTypes = {
    children: PropTypes.shape().isRequired,
  };

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export default renderWithProviders;
