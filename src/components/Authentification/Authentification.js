import { React } from 'react';
import { Link } from 'react-router-dom';

import './Authentification.css';
import { HeaderLogo } from '../../utils/utils';

function Authentification({
  isLoginRoute,
  isRegisterRoute,
  setIsLoginRoute,
  setIsRegisterRoute,
  setIsMainRoute,
  isLogged,
}) {
  const clg = () => {
    console.log(4242);
  };

  function handleAuthentificationLink() {
    if (isRegisterRoute) {
      setIsRegisterRoute(false);
      setIsLoginRoute(true);
    } else {
      setIsLoginRoute(false);
      setIsRegisterRoute(true);
    }
  }

  function handleHeaderLogo() {
    setIsMainRoute(true);
    setIsRegisterRoute(false);
    setIsLoginRoute(false);
  }

  return (
    <main className="authentification">
      {isLogged ? (
        <Link
          to="/"
          onClick={handleHeaderLogo}
          className="authentification__logo__wrapper"
        >
          <img
            src={HeaderLogo}
            alt="logo"
            className="authentification__logo-hover"
          />
        </Link>
      ) : (
        <img src={HeaderLogo} alt="logo" />
      )}

      <h1 className="authentification__title">
        {isRegisterRoute ? 'Добро пожаловать!' : 'Рады видеть!'}
      </h1>

      <form className="authentification__form" name="register-form">
        {isRegisterRoute ? (
          <>
            <p className="authentification__input-name">Имя</p>
            <input
              type="text"
              className="authentification__input"
              name="register-input-text"
            />
            <span className="authentification__input-error">
              Что-то пошло не так...
            </span>
          </>
        ) : null}

        <p className="authentification__input-name">E-mail</p>
        <input
          type="email"
          autoComplete="on"
          className="authentification__input"
          name="register-input-email"
        />
        <span className="authentification__input-error">
          Что-то пошло не так...
        </span>

        <p className="authentification__input-name">Пароль</p>
        <input
          type="password"
          autoComplete="on"
          className="authentification__input"
          name="register-input-password"
        />
        <span className="authentification__input-error">
          Что-то пошло не так...
        </span>

        <button type="submit" className="authentification__button-submit">
          {isRegisterRoute ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>

      <div className="authentification__container">
        <p className="authentification__subtitle">
          {isRegisterRoute
            ? 'Уже зарегистрированы?'
            : 'Ещё не зарегистрированы?'}
        </p>

        {isRegisterRoute ? (
          <Link
            to="/signin"
            className="authentification__link"
            onClick={handleAuthentificationLink}
          >
            Войти
          </Link>
        ) : (
          <Link
            to="/signup"
            className="authentification__link"
            onClick={handleAuthentificationLink}
          >
            Регистрация
          </Link>
        )}
      </div>
    </main>
  );
}

export default Authentification;
