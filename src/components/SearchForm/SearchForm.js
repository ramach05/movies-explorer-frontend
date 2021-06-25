import { React, useRef, useState } from 'react';

import './SearchForm.css';

function SearchForm() {
  const [inputValue, setInputValue] = useState('');
  const formRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue !== '') {
      // formRef.current.reset();
      // setInputValue('');
      formRef.current['search-form-input'].placeholder = 'Фильм';
    } else {
      formRef.current['search-form-input'].placeholder = 'Нужно ввести ключевое слово';
    }
  }

  function handleChangeInput(e) {
    setInputValue(e.target.value);

    console.log('e.target :>> ', e.target);
    // console.log('inputRef.current.checked :>> ', inputRef.current.checked);
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
        />
        <button
          type="submit"
          className="search-form__input__button"
          onClick={handleSubmit}
        >
        </button>
      </div>

      <label htmlFor="search-form-checkbox" className="search-form__checkbox">
        <input
          type="checkbox"
          id="search-form-checkbox"
          name="search-form-checkbox"
          onChange={handleChangeInput}
        />
        <span className="search-form__checkbox-switch">
        </span>
        <span className="search-form__checkbox-text">Короткометражки</span>
      </label>
    </form>
  );
}

export default SearchForm;
