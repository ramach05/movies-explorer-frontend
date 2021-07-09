import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../utils/AppContext';
import apiMain from '../../utils/MainApi';

import './MoviesCard.css';

function MoviesCard({ card }) {
  // console.log('card :>> ', card);

  const { savedMovies, setSavedMovies } = useAppContext();
  const [cardLike, setCardLike] = useState(false);
  const location = useLocation();

  const savedMoviesRoute = ['/saved-movies'].includes(location.pathname);

  const {
    country, director, duration, year, description,
    image, trailer, thumbnail, id, nameRU, nameEN,
  } = card;

  const handleCardSave = (e) => {
    if (e.target.classList.value.includes('active')) {
      console.log('includes');

      setCardLike(false);
    } else {
      console.log('dont includes');

      setCardLike(true);

      apiMain.createMovie({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        thumbnail,
        movieId: id,
        nameRU,
        nameEN,
      })
        .then((res) => {
          console.log('res :>> ', res);
        })
        .catch((err) => {
          console.log(err);
          setCardLike(false);
        });

      // apiMain.deleteMovie();

      // localStorage.setItem('savedMovies', savedMovies);
    }
  };

  const handleCardDelete = () => {
    setCardLike(false);
    // apiMain.deleteMovie();
  };

  return (
    <li className="movies-card">
      <a
        href={trailer}
        target="_blank"
        rel="noreferrer"
        className="movies-card__pic-wrapper"
      >
        <img
          src={image}
          alt="movies-card pic"
          className="movies-card__pic"
        />
      </a>

      <div className="movies-card__text">
        <p className="movies-card__text__title">{nameRU}</p>
        <p className="movies-card__text__duration">{duration}</p>
      </div>

      {!savedMoviesRoute ? (
        <button
          type="button"
          aria-label="card like-button"
          className={!cardLike ? 'movies-card__like' : 'movies-card__like movies-card__like_active'}
          onClick={handleCardSave}
        >
        </button>
      ) : (
        <button
          type="button"
          aria-label="card delete-button"
          className="movies-card__like movies-card__delete"
          onClick={handleCardDelete}
        >
        </button>
      )}

    </li>
  );
}

export default MoviesCard;
