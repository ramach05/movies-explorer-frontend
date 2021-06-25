import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

function MoviesCard({ card }) {
  const [cardLike, setCardLike] = useState(false);
  const location = useLocation();

  const savedMoviesRoute = ['/saved-movies'].includes(location.pathname);

  const handleCardLike = () => {
    setCardLike(!cardLike);
  };

  const handleCardDelete = () => {};

  return (
    <li className="movies-card">
      <a
        href={card.trailerLink}
        target="_blank"
        rel="noreferrer"
        className="movies-card__pic-wrapper"
      >
        <img
          src={card.imageUrl}
          alt="movies-card pic"
          className="movies-card__pic"
        />
      </a>

      <div className="movies-card__text">
        <p className="movies-card__text__title">{card.nameRU}</p>
        <p className="movies-card__text__duration">{card.duration}</p>
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
          onClick={handleCardDelete}
        >
        </button>
      )}

    </li>
  );
}

export default MoviesCard;
