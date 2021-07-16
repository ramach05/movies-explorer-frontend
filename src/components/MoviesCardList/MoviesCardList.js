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
    isInitialMoreButton,
    setIsInitialMoreButton,
    isMoreButton,
    setIsMoreButton,
  } = useAppContext();

  const [isHandleMoreButton, setIsHandleMoreButton] = useState(0);

  const location = useLocation();
  const savedMoviesRoute = ['/saved-movies'].includes(location.pathname);

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
      image: card.image,
    }));

    return result;
  }

  function addFilteredMoviesToLocalStorageRenderedMovies(selectedFilteredMovies) {
    if (selectedFilteredMovies.length !== 0) {
      const initialLocalStorageRenderedMovies = JSON.parse(localStorage.getItem('renderedMovies'));

      selectedFilteredMovies.forEach((filteredMovie) => {
        const isSome = initialLocalStorageRenderedMovies
          .some((renderedMovie) => filteredMovie.id === renderedMovie.id);

        if (!isSome) {
          const localStorageRenderedMovies = JSON.parse(localStorage.getItem('renderedMovies'));

          localStorage.setItem('renderedMovies', JSON.stringify([...localStorageRenderedMovies, filteredMovie]));
        }
      });
    }
  }

  function handleMoreButton(e) {
    e.preventDefault();
    setIsHandleMoreButton((prev) => prev + 1);
    setIsInitialMoreButton(false);
    setFilteredMovies(false);
    setIsMoreButton(true);
  }

  function renderCards() {
    if (!savedMoviesRoute) {
      if (filteredMovies.length > 0) {
        addFilteredMoviesToLocalStorageRenderedMovies(filteredMovies);

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
    } if (filteredMovies && filteredMovies.length > 0) {
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
    if (movies.length > 0 && (filteredMovies.length > 0 || !filteredMovies)
      && isMoreButton && !savedMoviesRoute && !isLoadingMovies) {
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

  useEffect(() => {
    setMovies([]);
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

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

        setMovies((prevMovies) => [...prevMovies, ...renderedMovies]);
      } else {
        const renderedMovies = JSON.parse(localStorage.getItem('renderedMovies'));
        const moviesFromLocalStorage = JSON.parse(localStorage.getItem('movies'));

        const listRequiredAmountCards = [];

        moviesFromLocalStorage
          .map((movieFromLocalStorage) => {
            const isSome = renderedMovies
              .some((renderedMovie) => renderedMovie.id === movieFromLocalStorage.id);

            if (!isSome) {
              listRequiredAmountCards.push(movieFromLocalStorage);
              return true;
            }
            return false;
          });

        const requiredAmountCards = listRequiredAmountCards.slice(0, 4);

        localStorage.setItem('renderedMovies', JSON.stringify([...renderedMovies, ...requiredAmountCards]));

        setMovies([...renderedMovies, ...requiredAmountCards]);
      }
    } else {
      const cardsFromLocalStorage = JSON.parse(localStorage.getItem('movies'));
      const requiredAmountCards = cardsFromLocalStorage.slice(0, 4);
      const listRequiredAmountCards = renderRequiredAmountCards([...requiredAmountCards]);

      localStorage.setItem('renderedMovies', JSON.stringify(requiredAmountCards));

      setMovies(listRequiredAmountCards);
    }
  }, [isLoadingMovies, isHandleMoreButton]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (movies.length > 0) {
      const cardsFromLocalStorage = JSON.parse(localStorage.getItem('movies'));

      if (cardsFromLocalStorage && cardsFromLocalStorage.length > 0
        && movies.length >= cardsFromLocalStorage.length) {
        setIsMoreButton(false);
      }
    }
  }, [movies, setIsMoreButton]);

  useEffect(() => {
    if (savedMoviesRoute) {
      apiMain.getMovies()
        .then((res) => {
          setSavedMovies(res.movies);
        })
        .catch((err) => console.log(err));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
