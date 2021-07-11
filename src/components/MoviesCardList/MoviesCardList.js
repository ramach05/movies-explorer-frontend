import { React, useEffect, useState } from 'react';

import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import apiMovies from '../../utils/MoviesApi';
import apiMain from '../../utils/MainApi';
import { useAppContext } from '../../utils/AppContext';

function MoviesCardList() {
  const {
    isLoadingMovies,
    setIsLoadingMovies,
    movies,
    setMovies,
    savedMovies,
    setSavedMovies,
    filteredMovies,
    setFilteredMovies,
    isNoCards,
    setIsNoCards,
  } = useAppContext();
  const [isMoreButton, setIsMoreButton] = useState(true);
  const [initialСardsCount, setInitialСardsCount] = useState(0);
  const [cardsCount, setCardsCount] = useState(3); // начальное количество карт на странице = 3

  const location = useLocation();
  const savedMoviesRoute = ['/saved-movies'].includes(location.pathname);

  useEffect(() => {
    apiMain.getMovies()
      .then((res) => {
        setSavedMovies(res.movies);
      })
      .catch((err) => console.log(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setMovies([]);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!localStorage.movies) {
      setIsLoadingMovies(true);

      apiMovies.getInitialMovies()
        .then((cardsFromApi) => {
          localStorage.setItem('movies', JSON.stringify(cardsFromApi));
        })
        .then(() => {
          setIsLoadingMovies(false);
        })
        .catch((err) => console.log(err));
    } else {
      const cardsFromLocalStorage = JSON.parse(localStorage.getItem('movies'));

      const requiredAmountCards = cardsFromLocalStorage.slice(initialСardsCount, cardsCount);

      const renderedCardsFromLocalStorage = requiredAmountCards.map((card) => ({
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

      setMovies((prevMovies) => [...prevMovies, ...renderedCardsFromLocalStorage]);

      if (movies.length === cardsFromLocalStorage.length) {
        setIsMoreButton(false);
      }
    }
  }, [isLoadingMovies, cardsCount, initialСardsCount]); // eslint-disable-line react-hooks/exhaustive-deps

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
    if (filteredMovies) {
      return filteredMovies.map((movie) => (
        <MoviesCard
          key={movie._id}
          card={movie}
        />
      ));
    }
    return savedMovies.map((movie) => (
      <MoviesCard
        key={movie._id}
        card={movie}
      />
    ));
  }

  function renderMoreButton() {
    if (movies.length !== 0 && isMoreButton && !savedMoviesRoute && !filteredMovies) {
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
      { !isNoCards
        ? (
          <ul className="movies-card-list__ul">
            {renderCards()}
          </ul>
        )
        : <div className="movies-card__text__title">Ничего не найдено</div> }

      <div className="movies-card-list__button-wrapper">
        {renderMoreButton()}
      </div>
    </article>
  );
}

export default MoviesCardList;
