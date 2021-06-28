import { React, useEffect, useState } from 'react';

import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import apiMovies from '../../utils/MoviesApi';
import apiMain from '../../utils/MainApi';
import { useAppContext } from '../../utils/AppContext';

function MoviesCardList() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const { savedMovies, setSavedMovies } = useAppContext([]);
  // const [getSavedCards, setGetSavedCards] = useState(localStorage.getItem('savedMovies'));

  const savedMoviesRoute = ['/saved-movies'].includes(location.pathname);

  useEffect(() => {
    apiMovies.getInitialMovies()
      .then((cardsFromApi) => {
        const renderCards = cardsFromApi.map((card) => ({
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

        setMovies([...renderCards]);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   apiMain.getMovies()
  //     .then((cardsFromApi) => {
  //       setSavedMovies([...cardsFromApi]);
  //     })
  //     .catch((err) => console.log(err));
  // }, [setSavedMovies]);

  const handleMoreButton = () => {
  };

  return (
    <article className="movies-card-list">
      <ul className="movies-card-list__ul">
        {!savedMoviesRoute ? (movies.map((movie) => (
          <MoviesCard
            key={movie.id}
            card={movie}
          />
        ))) : (savedMovies.map((movie) => (
          <MoviesCard
            key={movie.id}
            card={movie}
          />
        )))}
      </ul>

      <div className="movies-card-list__button-wrapper">
        <button
          type="button"
          className="movies-card-list__button"
          onClick={handleMoreButton}
        >
          Ещё
        </button>
      </div>
    </article>
  );
}

export default MoviesCardList;
