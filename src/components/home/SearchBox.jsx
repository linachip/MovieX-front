import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const SearchBox = ({ setSearch }) => {
  const schema = yup.object().shape({
    searchInput: yup.string().trim().min(3).required(),
  }).required();

  const {
    register, handleSubmit, formState: { errors }, reset,
  } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setSearch(data.searchInput);
    reset();
  };

  return (
    <div className='form'>
    <form onSubmit={ handleSubmit(onSubmit) } className='form'>
        <div>
        <label className="label">Search Movie</label>
          <input
            {...register('searchInput')}
            data-testid="search"
            className='search_form'
            type="text"
            placeholder="Type to search..."
            required
          />
          {errors?.search && <h6 data-testid='error'>{errors?.search.message || 'Error'}</h6>}
          <button data-testid="btn" className="button" type="submit">Search</button>
        </div>
    </form>
  </div>
  );
};

SearchBox.propTypes = {
  setSearch: PropTypes.func,
};

export default SearchBox;

