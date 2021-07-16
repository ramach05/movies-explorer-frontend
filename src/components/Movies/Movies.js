import { React } from 'react';

import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useAppContext } from '../../utils/AppContext';

function Movies() {
  const { isLoadingMovies } = useAppContext();

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList />

      {isLoadingMovies && <Preloader />}

    </main>
  );
}

export default Movies;
