import { React, useRef, useState } from 'react';
import { useAppContext } from '../../utils/AppContext';

import './SearchForm.css';

function SearchForm() {
  const {
    movies, setMovies, savedMovies,
    setSavedMovies, filteredMovies,
    setFilteredMovies,
  } = useAppContext([]);
  const [inputValue, setInputValue] = useState('');
  const formRef = useRef();
  const inputRef = useRef();
  const checkboxRef = useRef();

  function filterCards(cards) {
    const filteredCards = cards.filter((card) => card.nameRU.toLowerCase()
      .includes(inputRef.current.value.toLowerCase()));

    if (!checkboxRef.current.checked) {
      setFilteredMovies(filteredCards);
    } else {
      const filteredCardsByTime = filteredCards.filter((card) => card.duration <= 40);
      setFilteredMovies(filteredCardsByTime);
    }
  }

  function handleSubmitSearchForm(e) {
    e.preventDefault();
    if (inputValue !== '') {
      inputRef.current.placeholder = 'Фильм';
      filterCards(movies);
    } else if (inputValue === '') {
      inputRef.current.placeholder = 'Нужно ввести ключевое слово';

      if (!checkboxRef.current.checked) {
        setFilteredMovies(false);
      } else {
        filterCards(movies);
      }
    }
  }

  function handleChangeInput(e) {
    setInputValue(e.target.value);
  }

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
        />
        <span className="search-form__checkbox-switch">
        </span>
        <span className="search-form__checkbox-text">Короткометражки</span>
      </label>
    </form>
  );
}

export default SearchForm;
