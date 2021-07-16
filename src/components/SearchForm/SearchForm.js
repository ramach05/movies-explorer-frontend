import {
  React, useRef, useState, useEffect,
} from 'react';
import { useLocation } from 'react-router-dom';

import './SearchForm.css';
import { useAppContext } from '../../utils/AppContext';

function SearchForm() {
  const {
    movies, savedMovies, setFilteredMovies, setIsNoCards, setIsInitialMoreButton, setIsMoreButton,
  } = useAppContext([]);
  const [inputValue, setInputValue] = useState('');
  const formRef = useRef();
  const inputRef = useRef();
  const checkboxRef = useRef();

  const location = useLocation();
  const savedMoviesRoute = ['/saved-movies'].includes(location.pathname);

  const moviesFromLocalStorage = JSON.parse(localStorage.getItem('movies'));

  function filterCards(cards) {
    const filteredCards = cards.filter((card) => card.nameRU.toLowerCase()
      .includes(inputRef.current.value.toLowerCase()));

    setIsInitialMoreButton(false);

    if (!checkboxRef.current.checked) {
      setFilteredMovies(filteredCards);

      if (filteredCards.length === 0) {
        setIsNoCards(true);
      } else {
        setIsNoCards(false);

        if (inputRef.current.value === '') {
          setIsInitialMoreButton(true);
        }
      }
    } else {
      const filteredCardsByTime = filteredCards.filter((card) => card.duration <= 40);
      setFilteredMovies(filteredCardsByTime);

      if (filteredCardsByTime.length === 0) {
        setIsNoCards(true);
      } else {
        setIsNoCards(false);
      }
    }
  }

  function handleChangeCheckboxButton() {
    if (!checkboxRef.current.checked) {
      setFilteredMovies(false);

      if (!savedMoviesRoute) {
        const localStorageRenderedMovies = JSON.parse(localStorage.getItem('renderedMovies'));

        filterCards(localStorageRenderedMovies);
      } else {
        filterCards(savedMovies);
      }
    } else if (!savedMoviesRoute) {
      setIsMoreButton(false);
      filterCards(moviesFromLocalStorage);
    } else {
      filterCards(savedMovies);
    }
  }

  function handleSubmitSearchForm(e) {
    e.preventDefault();

    if (inputValue !== '') {
      inputRef.current.placeholder = 'Фильм';

      if (!savedMoviesRoute) {
        filterCards(moviesFromLocalStorage);
      } else {
        filterCards(savedMovies);
      }
    } else if (inputValue === '') {
      setIsNoCards(false);
      inputRef.current.placeholder = 'Нужно ввести ключевое слово';

      if (!savedMoviesRoute) {
        const localStorageRenderedMovies = JSON.parse(localStorage.getItem('renderedMovies'));

        filterCards(localStorageRenderedMovies);
      } else {
        filterCards(savedMovies);
      }
    }
  }

  function handleChangeInput(e) {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    setFilteredMovies([]);
    setIsInitialMoreButton(true);
    setIsNoCards(false);
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form className="search-form" ref={formRef}>
      <div className="search-form__container-search">
        <input
          type="text"
          required
          className="search-form__input"
          placeholder="Фильм"
          name="search-form-input"
          onChange={handleChangeInput}
          value={inputValue}
          ref={inputRef}
        />

        <button
          type="submit"
          className="search-form__input__button"
          onClick={handleSubmitSearchForm}
        >
        </button>
      </div>

      <label htmlFor="search-form-checkbox" className="search-form__checkbox">
        <input
          type="checkbox"
          id="search-form-checkbox"
          name="search-form-checkbox"
          ref={checkboxRef}
          onChange={handleChangeCheckboxButton}
        />
        <span className="search-form__checkbox-switch">
        </span>
        <span className="search-form__checkbox-text">Короткометражки</span>
      </label>
    </form>
  );
}

export default SearchForm;
