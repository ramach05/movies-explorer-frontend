import {
  React, useState, useRef, useEffect,
} from 'react';

import './Profile.css';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../../utils/AppContext';
import apiMain from '../../utils/MainApi';

function Profile() {
  const {
    setIsLogged, currentUser, setCurrentUser,
  } = useAppContext();
  const formRef = useRef();
  const history = useHistory();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isButtonUpdate, setIsButtonUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState('');

  const [inputValue, setInputValue] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [inputValid, setInputValid] = useState({
    name: false,
    email: false,
  });

  useEffect(() => {
    if (!formRef.current.checkValidity()) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [inputValid]);

  useEffect(() => {
    setIsButtonDisabled(true);
  }, []);

  function handleChange(e) {
    const { name, validity, value } = e.target;
    setIsButtonUpdate(false);

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
    setIsButtonDisabled(true);
    setIsButtonUpdate(true);
    setIsLoading(true);

    apiMain.updateUserProfile({
      name: inputValue.name,
      email: inputValue.email,
    })
      .then((res) => {
        setCurrentUser(res.updateUser);
        setErrorUpdate('');
      })
      .catch((err) => {
        console.log(err);
        setIsButtonUpdate(false);
        setErrorUpdate(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSingOut(e) {
    e.preventDefault();
    localStorage.clear();
    setIsLogged(false);
    history.push('/');
  }

  function renderErrorUpdate() {
    if (errorUpdate === 'ОШИБКА: 409') {
      return 'ОШИБКА: Почтовый ящик принадлежит другому юзеру';
    }
    return `${errorUpdate}`;
  }

  return (
    <main className="profile">
      <h1 className="profile__title">
        Привет,
        {' '}
        {currentUser.name}
        !
      </h1>

      <form
        className="profile__form"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <ul className="profile__ul">
          <li className="profile__li">
            <input
              type="text"
              required
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
              required
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

        <span className="register__input-error profile__input-error">
          {errorUpdate && renderErrorUpdate()}
        </span>

        <button
          type="submit"
          className={
            !isButtonDisabled
              ? 'profile__form-submit'
              : 'profile__form-submit profile__form-submit_disabled'
          }
          disabled={isButtonDisabled}
        >
          {!isButtonUpdate
            ? 'Редактировать'
            : !isLoading
              ? 'Сохранено!' : 'Сохранение...'}
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
