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
    isNoCards,
    isInitialMoreButton,
  } = useAppContext();
  const [isMoreButton, setIsMoreButton] = useState(true);
  const [isHandleMoreButton, setIsHandleMoreButton] = useState(0);
  const [initialСardsCount, setInitialСardsCount] = useState(0);
  const [cardsCount, setCardsCount] = useState(4); // начальное количество карт на странице = 3

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

  function renderRequiredAmountCards(requiredAmountCards) {
    const result = requiredAmountCards.map((card) => ({
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

    return result;
  }

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
    } else if (localStorage.renderedMovies) {
      if (isHandleMoreButton === 0) {
        const requiredAmountCards = JSON.parse(localStorage.getItem('renderedMovies'));
        const renderedMovies = renderRequiredAmountCards([...requiredAmountCards]);

        setInitialСardsCount(requiredAmountCards.length - 4);
        setCardsCount(requiredAmountCards.length);

        setMovies((prevMovies) => [...prevMovies, ...renderedMovies,
        ]);
      } else {
        const renderedMovies = JSON.parse(localStorage.getItem('renderedMovies'));
        const cardsFromLocalStorage = JSON.parse(localStorage.getItem('movies'));
        const requiredAmountCards = cardsFromLocalStorage.slice(initialСardsCount, cardsCount);
        const listRequiredAmountCards = renderRequiredAmountCards([...requiredAmountCards]);

        localStorage.setItem('renderedMovies', JSON.stringify([...renderedMovies, ...requiredAmountCards]));

        setMovies((prev) => [...prev, ...listRequiredAmountCards]);

        if (cardsFromLocalStorage.length === movies.length) {
          setIsMoreButton(false);
        }
      }
    } else {
      const cardsFromLocalStorage = JSON.parse(localStorage.getItem('movies'));
      const requiredAmountCards = cardsFromLocalStorage.slice(initialСardsCount, cardsCount);
      const listRequiredAmountCards = renderRequiredAmountCards([...requiredAmountCards]);

      localStorage.setItem('renderedMovies', JSON.stringify(requiredAmountCards));

      setMovies(listRequiredAmountCards);
    }
  }, [isLoadingMovies, isHandleMoreButton]);// eslint-disable-line react-hooks/exhaustive-deps

  function handleMoreButton(e) {
    e.preventDefault();
    setInitialСardsCount((prev) => prev + 4);
    setCardsCount((prev) => (prev + 4));
    setIsHandleMoreButton((prev) => prev + 1);
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
    if (movies.length !== 0
      && !filteredMovies && isMoreButton && !savedMoviesRoute && !isLoadingMovies) {
      return (
        <button
          type="button"
          className="movies-card-list__button"
          onClick={handleMoreButton}
        >
          Ещё
        </button>
      );
    } if (isInitialMoreButton && !savedMoviesRoute) {
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
