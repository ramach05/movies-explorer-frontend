import { React, useEffect, useState } from 'react';

import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import apiMovies from '../../utils/MoviesApi';
import apiMain from '../../utils/MainApi';
import { useAppContext } from '../../utils/AppContext';

function MoviesCardList() {
  const location = useLocation();
  const {
    isLoadingMovies,
    setIsLoadingMovies,
    movies,
    setMovies,
    savedMovies,
    setSavedMovies,
    filteredMovies,
    setFilteredMovies,
  } = useAppContext([]);
  // const [getSavedCards, setGetSavedCards] = useState(localStorage.getItem('savedMovies'));

  console.log('movies :>> ', movies);

  const savedMoviesRoute = ['/saved-movies'].includes(location.pathname);

  useEffect(() => {
    setIsLoadingMovies(true);

    apiMovies.getInitialMovies()
      .then((cardsFromApi) => {
        const renderedCards = cardsFromApi.map((card) => ({
          id: card.id,
          nameRU: card.nameRU,
          nameEN: card.nameEN,
          director: card.director,
          country: card.country,
          year: card.year,
          duration: card.duration,
          description: card.description,
          trailerLink: card.trailerLink,
          imageUrl: `https://api.nomoreparties.co${card.image.url}`,
        }));

        setMovies([...renderedCards]);
        setIsLoadingMovies(false);
      })
      .catch((err) => console.log(err));
  }, [setIsLoadingMovies, setMovies]);

  // useEffect(() => {
  //   apiMain.getMovies()
  //     .then((cardsFromApi) => {
  //       setSavedMovies([...cardsFromApi]);
  //     })
  //     .catch((err) => console.log(err));
  // }, [setSavedMovies]);

  const handleMoreButton = (e) => {
    e.preventDefault();
  };

  function renderCards() {
    if (!savedMoviesRoute) {
      if (filteredMovies) {
        return filteredMovies.map((movie) => (
          <MoviesCard
            key={movie.id}
            card={movie}
          />
        ));
      }
      return movies.map((movie) => (
        <MoviesCard
          key={movie.id}
          card={movie}
        />
      ));
    }
    return savedMovies.map((movie) => (
      <MoviesCard
        key={movie.id}
        card={movie}
      />
    ));
  }

  return (
    <article className="movies-card-list">
      <ul className="movies-card-list__ul">
        {renderCards()}
      </ul>

      <div className="movies-card-list__button-wrapper">
        {(movies.length !== 0) ? (
          <button
            type="button"
            className="movies-card-list__button"
            onClick={handleMoreButton}
          >
            Ещё
          </button>
        )
          : null}

      </div>
    </article>
  );
}

export default MoviesCardList;
