import {
  React, useState, useRef, useEffect,
} from 'react';

import './Profile.css';
import { useAppContext } from '../../utils/AppContext';

function Profile() {
  const { currentUser, setCurrentUser } = useAppContext();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [inputValue, setInputValue] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [inputValid, setInputValid] = useState({
    name: false,
    email: false,
  });
  const formRef = useRef();

  useEffect(() => {
    if (!formRef.current.checkValidity()) {
      console.log('not valid');
      setIsButtonDisabled(true);
    } else {
      console.log('valid');
      setIsButtonDisabled(false);
    }
  }, [inputValid]);

  function handleChange(e) {
    const { name, validity, value } = e.target;
    if (name === 'profile-input-name') {
      setInputValue({
        ...inputValue,
        name: value,
      });
      if (!validity.valid) {
        setInputValid({
          ...inputValid,
          name: false,
        });
      } else {
        setInputValid({
          ...inputValid,
          name: true,
        });
      }
    } else if (name === 'profile-input-email') {
      setInputValue({
        ...inputValue,
        email: value,
      });
      if (!validity.valid) {
        setInputValid({
          ...inputValid,
          email: false,
        });
      } else {
        setInputValid({
          ...inputValid,
          email: true,
        });
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submit');
    // setCurrentUser
  }

  function handleSingOut(e) {
    e.preventDefault();
    console.log('SingOut');
  }

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, Роман!</h1>

      <form
        className="profile__form"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <ul className="profile__ul">
          <li className="profile__li">
            <input
              type="text"
              value={inputValue.name}
              id="profile-input-name"
              name="profile-input-name"
              className="profile__input"
              minLength="2"
              maxLength="30"
              pattern="^[a-zA-Zа-яА-ЯёЁ\s\-]+$"
              onChange={handleChange}
            />
            <label htmlFor="profile-input-name" className="profile__input__label">Имя</label>
          </li>
          <li className="profile__li">
            <input
              type="email"
              value={inputValue.email}
              id="profile-input-email"
              name="profile-input-email"
              className="profile__input"
              maxLength="30"
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              onChange={handleChange}
            />
            <label htmlFor="profile-input-email" className="profile__input__label">E-mail</label>
          </li>
        </ul>

        <button
          type="submit"
          className={
            !isButtonDisabled
              ? 'profile__form-submit'
              : 'profile__form-submit profile__form-submit_disabled'
          }
          disabled={isButtonDisabled}
        >
          Редактировать
        </button>
      </form>

      <button
        type="button"
        className="profile__exit-button"
        onClick={handleSingOut}
      >
        Выйти из аккаунта
      </button>
    </main>
  );
}

export default Profile;
