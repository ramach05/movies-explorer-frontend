import { React } from 'react';

import './SearchForm.css';

function SearchForm() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="search-form">
      <div className="search-form__container-search">
        <input
          type="text"
          className="search-form__input"
          placeholder="Фильм"
        />
        <button
          type="submit"
          className="search-form__input__button"
          onClick={handleSubmit}
        >
        </button>
      </div>

      <label htmlFor="search-form-checkbox" className="search-form__checkbox">
        <input type="checkbox" id="search-form-checkbox" />
        <span className="search-form__checkbox-switch">
        </span>
        <span className="search-form__checkbox-text">Короткометражки</span>
      </label>
    </form>
  );
}

export default SearchForm;
