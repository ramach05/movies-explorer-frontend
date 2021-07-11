import {
  React, useState, useRef, useEffect,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAppContext } from '../../utils/AppContext';
import apiMain from '../../utils/MainApi';
import { HeaderLogo } from '../../utils/utils';

import './Register.css';

function Register() {
  const { isLogged, setIsLogged } = useAppContext();
  const history = useHistory();
  const formRef = useRef();
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [buttonError, setButtonError] = useState('');
  const [isInputNameValid, setIsInputNameValid] = useState(false);
  const [isInputEmailValid, setIsInputEmailValid] = useState(false);
  const [isInputPasswordValid, setIsInputPasswordValid] = useState(false);
  const [inputNameError, setInputNameError] = useState('');
  const [inputEmailError, setInputEmailError] = useState('');
  const [inputPasswordError, setInputPasswordError] = useState('');

  useEffect(() => {
    if (!formRef.current.checkValidity()) {
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
        setInputNameError(inputNameRef.current.validationMessage);
      } else {
        setIsInputNameValid(true);
        setInputNameError('');
      }
    } else if (name === 'register-input-email') {
      if (!validity.valid) {
        setIsInputEmailValid(false);
        setInputEmailError(inputEmailRef.current.validationMessage);
      } else {
        setIsInputEmailValid(true);
        setInputEmailError('');
      }
    } else if (name === 'register-input-password') {
      if (!validity.valid) {
        setIsInputPasswordValid(false);
        setInputPasswordError(inputPasswordRef.current.validationMessage);
      } else {
        setIsInputPasswordValid(true);
        setInputPasswordError('');
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsButtonDisabled(true);
    setIsLoading(true);

    apiMain
      .createUser({
        name: inputNameRef.current.value,
        email: inputEmailRef.current.value,
        password: inputPasswordRef.current.value,
      })
      .then((res) => {
        apiMain
          .login({
            email: res.email,
            password: inputPasswordRef.current.value,
          })
          .then((data) => {
            if (data.token) {
              localStorage.setItem('token', data.token);
              setIsLogged(true);
              history.push('/movies');
            }
          })
          .catch((err) => {
            setButtonError(err);
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setButtonError(err);
        setIsLoading(false);
        setIsButtonDisabled(false);
      });
  }

  return (
    <main className="register">
      <Link to="/" className="register__logo-wrapper">
        <img src={HeaderLogo} alt="logo" className="register__logo-link" />
      </Link>

      <h1 className="register__title">Добро пожаловать!</h1>

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
          {inputNameError && `${inputNameError}`}
        </span>

        <p className="register__input-name">E-mail</p>
        <input
          type="email"
          required
          autoComplete="on"
          className="register__input"
          name="register-input-email"
          maxLength="30"
          pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
          ref={inputEmailRef}
          onChange={handleChange}
        />
        <span className="register__input-error">
          {inputEmailError && `${inputEmailError}`}
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
          {inputPasswordError && `${inputPasswordError}`}
        </span>

        <button
          type="submit"
          className={
            !isButtonDisabled
              ? 'register__button-submit'
              : 'register__button-submit register__button-submit_disabled'
          }
          disabled={isButtonDisabled}
        >
          {!isLoading ? 'Зарегистрироваться' : 'Регистрация...'}
        </button>
        <span className="register__input-error register__input-error_button">
          {buttonError && `${buttonError}`}
        </span>
      </form>

      <div className="register__container">
        <p className="register__subtitle">Уже зарегистрированы?</p>

        <Link to="/signin" className="register__link">
          Войти
        </Link>
      </div>
    </main>
  );
}

export default Register;
