import {
  React, useRef, useState, useEffect,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAppContext } from '../../utils/AppContext';
import apiMain from '../../utils/MainApi';

import { HeaderLogo } from '../../utils/utils';

function Login() {
  const {
    isLogged, setIsLogged, currentUser, setCurrentUser,
  } = useAppContext();
  const history = useHistory();
  const formRef = useRef();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [buttonError, setButtonError] = useState('');
  const [isInputEmailValid, setIsInputEmailValid] = useState(false);
  const [isInputPasswordValid, setIsInputPasswordValid] = useState(false);
  const [inputEmailError, setInputEmailError] = useState('');
  const [inputPasswordError, setInputPasswordError] = useState('');

  useEffect(() => {
    if (!formRef.current.checkValidity()) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [isInputEmailValid, isInputPasswordValid]);

  function handleChange(e) {
    const { name, validity } = e.target;
    setIsButtonDisabled(false);

    if (name === 'login-input-email') {
      if (!validity.valid) {
        setIsInputEmailValid(false);
        setInputEmailError(inputEmailRef.current.validationMessage);
      } else {
        setIsInputEmailValid(true);
        setInputEmailError('');
      }
    } else if (name === 'login-input-password') {
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
      .login({
        email: inputEmailRef.current.value,
        password: inputPasswordRef.current.value,
      })
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
        return res;
      })
      .then(() => {
        apiMain.updateHeaders();
      })
      .then(() => {
        apiMain.getMe()
          .then((data) => {
            setCurrentUser(data.user);
          })
          .then(() => {
            setIsLogged(true);
            history.push('/movies');
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
      });
  }

  return (
    <main className="register">
      <Link
        to="/"
        className="register__logo-wrapper"
      >
        <img
          src={HeaderLogo}
          alt="logo"
          className="register__logo-link"
        />
      </Link>

      <h1 className="register__title">
        Рады видеть!
      </h1>

      <form
        className="register__form"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <p className="register__input-name">E-mail</p>
        <input
          type="email"
          required
          autoComplete="on"
          className="register__input"
          name="login-input-email"
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
          name="login-input-password"
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
          {!isLoading ? 'Авторизоваться' : 'Авторизация...'}
        </button>
        <span className="register__input-error register__input-error_button">
          {buttonError && `${buttonError}`}
        </span>
      </form>

      <div className="register__container">
        <p className="register__subtitle">
          Ещё не зарегистрированы?
        </p>

        <Link to="/signup" className="register__link">
          Регистрация
        </Link>
      </div>
    </main>
  );
}

export default Login;
