import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../utils/AppContext';
import apiMain from '../../utils/MainApi';

import './MoviesCard.css';

function MoviesCard({ card }) {
  const {
    savedMovies, setSavedMovies, filteredMovies, setFilteredMovies,
  } = useAppContext();
  const [cardLike, setCardLike] = useState(false);
  const [correctDuration, setCorrectDuration] = useState('0');
  const location = useLocation();

  const savedMoviesRoute = ['/saved-movies'].includes(location.pathname);

  const {
    country, director, duration, year, description,
    image, trailerLink, id, nameRU, nameEN,
  } = card;

  let imageMovie;
  let thumbnail;
  const trailer = trailerLink || card.trailer;

  if (typeof image === 'string') {
    imageMovie = image;
    thumbnail = card.thumbnail;
  } else {
    imageMovie = `https://api.nomoreparties.co${image.url}`;
    thumbnail = `https://api.nomoreparties.co${image.formats.thumbnail.url}`;
  }

  function handleCardDelete() {
    if (savedMoviesRoute) {
      apiMain.deleteMovie(card._id)
        .then((res) => {
          console.log(res.movie);

          apiMain.getMovies()
            .then((result) => {
              setSavedMovies(result.movies);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      savedMovies.map((movie) => {
        if (card.id === movie.movieId) {
          apiMain.deleteMovie(movie._id)
            .then((res) => {
              console.log(res.movie);

              apiMain.getMovies()
                .then((result) => {
                  setSavedMovies(result.movies);
                  // setFilteredMovies([]);
                  setCardLike(false);
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => {
              console.log(err);
              setCardLike(true);
            });
        }
        return movie;
      });
    }
  }

  console.log('filteredMovies :>> ', filteredMovies);

  function handleCardSave(e) {
    if (e.target.classList.value.includes('active')) {
      handleCardDelete();
    } else {
      apiMain.createMovie({
        country: country || '-',
        director,
        duration,
        year,
        description,
        image: imageMovie,
        trailer: trailer || 'https://movies-explorer-roman.nomoredomains.icu/',
        thumbnail,
        movieId: id,
        nameRU,
        nameEN: nameEN || '-',
      })
        .then((res) => {
          console.log(res.movie);
          setCardLike(true);

          apiMain.getMovies()
            .then((result) => {
              setSavedMovies(result.movies);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
          setCardLike(false);
        });
    }
  }

  useEffect(() => {
    if (duration <= 60) {
      setCorrectDuration(`${duration}м`);
    } else {
      const durationOfMinutes = duration % 60;
      const durationOfHours = (duration - durationOfMinutes) / 60;
      setCorrectDuration(`${durationOfHours}ч ${durationOfMinutes}м`);
    }
  }, [duration]);

  useEffect(() => {
    if (savedMovies.some((movie) => movie.movieId === card.id)) {
      setCardLike(true);
    }
  }, [card.id, savedMovies]);

  return (
    <li className="movies-card">
      <a
        href={trailer}
        target="_blank"
        rel="noreferrer"
        className="movies-card__pic-wrapper"
      >
        <img
          src={imageMovie}
          alt="movies-card pic"
          className="movies-card__pic"
        />
      </a>

      <div className="movies-card__text">
        <p className="movies-card__text__title">{nameRU}</p>
        <p className="movies-card__text__duration">{correctDuration}</p>
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
