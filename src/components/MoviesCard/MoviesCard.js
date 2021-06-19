import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';
import Picture from '../../images/pic.jpg';

function MoviesCard() {
  const [cardLike, setCardLike] = useState(false);
  const location = useLocation();

  const savedMoviesRoute = ['/saved-movies'].includes(location.pathname);

  const handleCardLike = () => {
    setCardLike(!cardLike);
  };

  const handleCardDelete = () => {};

  return (
    <li className="movies-card">
      <div className="movies-card__pic-wrapper">
        <img
          src={Picture}
          alt="movies-card pic"
          className="movies-card__pic"
        />
      </div>

      <div className="movies-card__text">
        <p className="movies-card__text__title">33 слова о дизайне</p>
        <p className="movies-card__text__duration">1ч 42м</p>
      </div>

      {!savedMoviesRoute ? (
        <button
          type="button"
          aria-label="card like-button"
          className={!cardLike ? 'movies-card__like' : 'movies-card__like movies-card__like_active'}
          onClick={handleCardLike}
        >
        </button>
      ) : (
        <button
          type="button"
          aria-label="card delete-button"
          className="movies-card__like movies-card__delete"
          onClick={handleCardLike}
        >
        </button>
      )}

    </li>
  );
}

export default MoviesCard;
