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
  } = useAppContext();
  // const [isUpdateSavedMovies, setIsUpdateSavedMovies] = useState(false);
  const [isMoreButton, setIsMoreButton] = useState(true);
  const [initialСardsCount, setInitialСardsCount] = useState(0);
  const [cardsCount, setCardsCount] = useState(3); // начальное количество карт на странице = 3

  const savedMoviesRoute = ['/saved-movies'].includes(location.pathname);

  useEffect(() => {
    console.log(1);

    apiMain.getMovies()
      .then((res) => {
        setSavedMovies(res.movies);
      })
      .catch((err) => console.log(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log(2);

    setIsLoadingMovies(true);

    apiMovies.getInitialMovies()
      .then((cardsFromApi) => {
        const stringCardsFromApi = JSON.stringify(cardsFromApi);
        localStorage.setItem('movies', stringCardsFromApi);

        const requiredAmountCards = cardsFromApi.slice(initialСardsCount, cardsCount);

        const renderedCardFromApi = requiredAmountCards.map((card) => ({
          id: card.id,
          nameRU: card.nameRU,
          nameEN: card.nameEN,
          director: card.director,
          country: card.country,
          year: card.year,
          duration: card.duration,
          description: card.description,
          trailer: card.trailerLink,
          image: `https://api.nomoreparties.co${card.image.url}`,
          thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
        }));

        setMovies((prevMovies) => [...prevMovies, ...renderedCardFromApi]);

        if (movies.length === cardsFromApi.length) {
          setIsMoreButton(false);
        }
      })
      .then(() => {
        setIsLoadingMovies(false);
      })
      .catch((err) => console.log(err));
  }, [cardsCount, initialСardsCount]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleMoreButton(e) {
    e.preventDefault();
    setInitialСardsCount(initialСardsCount + 3);
    setCardsCount(cardsCount + 3);
  }

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

  function renderMoreButton() {
    if (movies.length !== 0 && isMoreButton && !savedMoviesRoute) {
      if (isLoadingMovies) {
        return (
          <button
            type="button"
            className="movies-card-list__button movies-card-list__button_disabled"
            onClick={handleMoreButton}
            disabled
          >
            Ещё
          </button>
        );
      }
      return (
        <button
          type="button"
          className="movies-card-list__button"
          onClick={handleMoreButton}
        >
          Ещё
        </button>
      );
    }
    return null;
  }

  return (
    <article className="movies-card-list">
      <ul className="movies-card-list__ul">
        {renderCards()}
      </ul>

      <div className="movies-card-list__button-wrapper">
        {renderMoreButton()}
      </div>
    </article>
  );
}

export default MoviesCardList;
