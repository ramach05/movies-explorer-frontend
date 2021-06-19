import { React } from 'react';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  const handleMoreButton = () => { };

  return (
    <article className="movies-card-list">
      <ul className="movies-card-list__ul">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
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
