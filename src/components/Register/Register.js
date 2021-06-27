import {
  React, useState, useRef, useEffect,
} from 'react';
import { Link } from 'react-router-dom';

import './Register.css';
import { HeaderLogo } from '../../utils/utils';

function Register({ isLogged }) {
  const formRef = useRef();
  const inputPasswordRef = useRef();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isInputNameValid, setIsInputNameValid] = useState(false);
  const [isInputEmailValid, setIsInputEmailValid] = useState(false);
  const [isInputPasswordValid, setIsInputPasswordValid] = useState(false);
  const [isInputNameError, setIsInputNameError] = useState(false);
  const [isInputEmailError, setIsInputEmailError] = useState(false);
  const [isInputPasswordError, setIsInputPasswordError] = useState(false);

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
        setIsInputNameError(true);
      } else {
        setIsInputNameValid(true);
        setIsInputNameError(false);
      }
    } else if (name === 'register-input-email') {
      if (!validity.valid) {
        setIsInputEmailValid(false);
        setIsInputEmailError(true);
      } else {
        setIsInputEmailValid(true);
        setIsInputEmailError(false);
      }
    } else if (name === 'register-input-password') {
      if (!validity.valid) {
        setIsInputPasswordValid(false);
        setIsInputPasswordError(true);
        console.log(isInputPasswordError);
        console.log('inputPasswordRef.current.validationMessage :>> ', inputPasswordRef.current.validationMessage);
      } else {
        setIsInputPasswordValid(true);
        setIsInputPasswordError(false);
      }
    } else {
      console.log('else42');
    }
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

      <form className="register__form" ref={formRef}>
        <p className="register__input-name">Имя</p>
        <input
          type="text"
          required
          className="register__input"
          name="register-input-name"
          minLength="2"
          maxLength="30"
          pattern="^[a-zA-Zа-яА-ЯёЁ\s\-]+$"
          onChange={handleChange}
        />
        <span className="register__input-error">
          {!isInputNameError ? '' : formRef.current['register-input-name'].validationMessage}
        </span>

        <p className="register__input-name">E-mail</p>
        <input
          type="email"
          required
          autoComplete="on"
          className="register__input"
          name="register-input-email"
          maxLength="30"
          onChange={handleChange}
        />
        <span className="register__input-error">
          {!isInputEmailError ? '' : formRef.current['register-input-email'].validationMessage}
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
          {!isInputPasswordError ? '' : inputPasswordRef.current.validationMessage}
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
