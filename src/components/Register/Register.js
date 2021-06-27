import {
  React, useState, useRef, useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import { HeaderLogo } from '../../utils/utils';

import './Register.css';

function Register({ isLogged }) {
  const formRef = useRef();
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isInputNameValid, setIsInputNameValid] = useState(false);
  const [isInputEmailValid, setIsInputEmailValid] = useState(false);
  const [isInputPasswordValid, setIsInputPasswordValid] = useState(false);
  const [isInputNameError, setIsInputNameError] = useState('');
  const [isInputEmailError, setIsInputEmailError] = useState('');
  const [isInputPasswordError, setIsInputPasswordError] = useState('');

  useEffect(() => {
    if (!isInputNameValid || !isInputEmailValid || !isInputPasswordValid) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [isInputEmailValid, isInputNameValid, isInputPasswordValid]);

  function handleChange(e) {
    const { name, validity } = e.target;
    if (name === 'register-input-name') {
      if (!validity.valid) {
        setIsInputNameValid(false);
        setIsInputNameError(inputNameRef.current.validationMessage);
      } else {
        setIsInputNameValid(true);
        setIsInputNameError('');
      }
    } else if (name === 'register-input-email') {
      if (!validity.valid) {
        setIsInputEmailValid(false);
        setIsInputEmailError(inputEmailRef.current.validationMessage);
      } else {
        setIsInputEmailValid(true);
        setIsInputEmailError('');
      }
    } else if (name === 'register-input-password') {
      if (!validity.valid) {
        setIsInputPasswordValid(false);
        setIsInputPasswordError(inputPasswordRef.current.validationMessage);
      } else {
        setIsInputPasswordValid(true);
        setIsInputPasswordError('');
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    formRef.current.reset();
    setIsInputNameValid(false);
    setIsInputEmailValid(false);
    setIsInputPasswordValid(false);
  }

  return (
    <main className="register">
      {isLogged ? (
        <Link
          to="/"
          className="register__logo__wrapper"
        >
          <img
            src={HeaderLogo}
            alt="logo"
            className="register__logo-hover"
          />
        </Link>
      ) : (
        <img
          src={HeaderLogo}
          alt="logo"
          className="register__logo__wrapper"
        />
      )}

      <h1 className="register__title">
        Добро пожаловать!
      </h1>

      <form
        className="register__form"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <p className="register__input-name">Имя</p>
        <input
          type="text"
          required
          className="register__input"
          name="register-input-name"
          minLength="2"
          maxLength="30"
          pattern="^[a-zA-Zа-яА-ЯёЁ\s\-]+$"
          ref={inputNameRef}
          onChange={handleChange}
        />
        <span className="register__input-error">
          {isInputNameError && `${isInputNameError}`}
        </span>

        <p className="register__input-name">E-mail</p>
        <input
          type="email"
          required
          autoComplete="on"
          className="register__input"
          name="register-input-email"
          maxLength="30"
          ref={inputEmailRef}
          onChange={handleChange}
        />
        <span className="register__input-error">
          {isInputEmailError && `${isInputEmailError}`}
        </span>

        <p className="register__input-name">Пароль</p>
        <input
          type="password"
          required
          autoComplete="on"
          className="register__input"
          name="register-input-password"
          minLength="8"
          maxLength="30"
          ref={inputPasswordRef}
          onChange={handleChange}
        />
        <span className="register__input-error">
          {isInputPasswordError && `${isInputPasswordError}`}
        </span>

        <button
          type="submit"
          className={!isButtonDisabled ? 'register__button-submit' : 'register__button-submit register__button-submit_disabled'}
          disabled={isButtonDisabled}
        >
          Зарегистрироваться
        </button>
      </form>

      <div className="register__container">
        <p className="register__subtitle">
          Уже зарегистрированы?
        </p>

        <Link
          to="/signin"
          className="register__link"
        >
          Войти
        </Link>

      </div>
    </main>
  );
}

export default Register;
