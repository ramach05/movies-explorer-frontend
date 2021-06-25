import { React, useEffect, useState } from 'react';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { api } from '../../utils/MoviesApi';

function MoviesCardList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInitialCards()
      .then((cardsFromApi) => {
        const renderCards = cardsFromApi.map((item) => ({
          id: item.id,
          nameRU: item.nameRU,
          nameEN: item.nameEN,
          director: item.director,
          country: item.country,
          year: item.year,
          duration: item.duration,
          description: item.description,
          trailerLink: item.trailerLink,
          imageUrl: `https://api.nomoreparties.co${item.image.url}`,
        }));
        setCards([...renderCards]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleMoreButton = () => { };

  return (
    <article className="movies-card-list">
      <ul className="movies-card-list__ul">
        {cards.map((item) => (
          <MoviesCard
            key={item.id}
            card={item}
            // onCardClick={onCardClick}
            // onCardLike={onCardLike}
            // onConfirmCardDelete={onConfirmCardDelete}
          />
        ))}
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
